import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { arenaApi } from "../AxiosInstance.tsx";
import "/src/BoxingApp.css";

//front-end data object for the arena records
export interface Arena {
  arena_id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  revenue_split: number;
  seats: number;
  address: string;
  open: boolean;
  safety_compliant: boolean;
}

function ArenaManagementScreen() {
  const colHeaders = [
    "Arena ID",
    "Arena Name",
    "City",
    "State",
    "Country",
    "Revenue Split",
    "Seats",
    "Address",
    "Open Status",
    "Safety Compliant",
  ];

  //setting a const variable to use the useNavigate method to control screen navigation
  const navigate = useNavigate();

  /*All of the variables and functions that use the UseState hook are initialized here*/
  let [arenas, setArenas] = useState<Arena[]>([]);
  let [selectedArenaIndex, setSelectedArenaIndex] = useState(-1);
  let [errorMessage, setErrorMessage] = useState<string>("");
  let [searchForm, setSearchForm] = useState<Arena>({} as Arena);

  //retrieved the arena data upon loading the screen
  useEffect(() => {
    const fetchArenaRecords = async () => {
      let response = await arenaApi.get("/arenas");
      let arenaData = (await response.data) as Arena[];
      console.log("Arena data fetched:", arenaData); // Log the fetched data for debugging
      setArenas(arenaData);
    };
    fetchArenaRecords();
  }, []);

  //This function handles the updating and adding of arena records.
  const handleAddOrUpdateArena = async (submitType: string) => {
    if (submitType === "update" && selectedArenaIndex === -1) {
      setErrorMessage("Please select an arena to update.");
      return;
    }

    let arenaToSubmit =
      selectedArenaIndex !== -1 && submitType === "update"
        ? arenas[selectedArenaIndex]
        : ({} as Arena);

    navigate("/arenas/add", {
      state: { submitType: submitType, initial: arenaToSubmit },
    });
  };
  //This function sends a post request with the search criteria to the backend to retrieve the arena records*/
  const handleSearch = async (searchForm: Arena) => {
    arenaApi.post("/arenas/search", searchForm).then(async (response) => {
      let arenaData = (await response.data) as Arena[];
      setArenas(arenaData);
      console.log("Search results:", arenaData);
    });
  };

  //This handles the selection functionality of an arena record
  const handleSelectArena = (index: number) => {
    setSelectedArenaIndex(index);
  };

  return (
    <>
      <h2 id="pageHeader">Arena List</h2>
      <div className={"searchBar"}>
        <div>
          <label>Arena Name:</label>
          <input
            type="text"
            value={searchForm.name || ""}
            onChange={(e) =>
              setSearchForm({ ...searchForm, name: e.target.value })
            }
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={searchForm.city || ""}
            onChange={(e) =>
              setSearchForm({ ...searchForm, city: e.target.value })
            }
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            value={searchForm.state || ""}
            onChange={(e) =>
              setSearchForm({ ...searchForm, state: e.target.value })
            }
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={searchForm.country || ""}
            onChange={(e) =>
              setSearchForm({ ...searchForm, country: e.target.value })
            }
          />
        </div>
        <button onClick={() => handleSearch(searchForm)}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            {colHeaders.map((colName) => (
              <th className="column-name" key={colName} scope="col">
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {arenas.map((arena, index) => (
            <tr
              key={arena.arena_id}
              onClick={() => handleSelectArena(index)}
              className={selectedArenaIndex === index ? "selected" : ""}
            >
              <td>{arena.arena_id}</td>
              <td>{arena.name}</td>
              <td>{arena.city}</td>
              <td>{arena.state}</td>
              <td>{arena.country}</td>
              <td>{arena.revenue_split}</td>
              <td>{arena.seats}</td>
              <td>{arena.address}</td>
              <td>{arena.open ? "Open" : "Closed"}</td>
              <td>{arena.safety_compliant ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => handleAddOrUpdateArena("add")}>Add Arena</button>
        <button onClick={() => handleAddOrUpdateArena("update")}>
          Update Arena
        </button>
        <div>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
      </div>
    </>
  );
}

export default ArenaManagementScreen;
