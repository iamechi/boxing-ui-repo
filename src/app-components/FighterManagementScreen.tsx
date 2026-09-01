import { useEffect } from "react";
import { useState } from "react";
import api from "./AxiosInstance.tsx";
import { useNavigate } from "react-router-dom";
import "/src/BoxingApp.css";

export interface Fighter {
  fighterID: number;
  first_name: string;
  last_name: string;
  height: number;
  weight: number;
  fights: number;
  wins: number;
  losses: number;
  draws: number;
  KOS: number;
  current_state_residence: string;
  current_city_residence: string;
  years_of_boxing: number;
  knockout_percentage: number;
  photo_attachment: string;
}

function FighterManagementScreen() {
  const colHeaders = [
    "Fighter ID",
    "First Name",
    "Last Name",
    "Height",
    "Weight",
    "Fights",
    "Wins",
    "Losses",
    "Draws",
    "K.O's",
    "State",
    "City",
    "Years of Experience",
    "Knockout Percentage",
  ];

  const navigate = useNavigate();

  let [fighters, setFighters] = useState<Fighter[]>([]);
  let [selectedFighterIndex, setSelectedFighterIndex] = useState(-1);
  let [errorMessage, setErrorMessage] = useState<string>("");
  let [searchForm, setSearchForm] = useState<Fighter>({} as Fighter);

  useEffect(() => {
    const fetchFighterRecords = async () => {
      let response = await api.get("/fighters");
      let fighterData = (await response.data) as Fighter[];
      setFighters(fighterData);
      console.log("Fetched fighters:", fighterData);
    };

    fetchFighterRecords();
  }, []);

  const handleFighterAddUpdateClick = (submitType: string) => {
    if (submitType === "update" && selectedFighterIndex === -1) {
      setErrorMessage("Please select a fighter to update.");
      return;
    }

    let fighterToUpdate =
      selectedFighterIndex !== -1 && submitType === "update"
        ? fighters[selectedFighterIndex]
        : null;
    console.log("Fighter to update:", fighterToUpdate);
    navigate("/fighters/add", {
      state: { submitType: submitType, initial: fighterToUpdate },
    });
  };

  const handleSearch = async (searchForm: Fighter) => {
    api.post("/fighters/search", searchForm).then(async (response) => {
      let fighterData = (await response.data) as Fighter[];
      setFighters(fighterData);
      console.log("Search results:", fighterData);
    });
  };
  const handleSelectFighter = (index: number) => {
    setSelectedFighterIndex(index);
  };

  return (
    <>
      <h2 id="pageHeader">Fighter List</h2>
      <div className={"searchBar"}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            onChange={(e) =>
              setSearchForm({ ...searchForm, first_name: e.target.value })
            }
            placeholder="Search first name..."
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            onChange={(e) =>
              setSearchForm({ ...searchForm, last_name: e.target.value })
            }
            placeholder="Search last name..."
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            onChange={(e) =>
              setSearchForm({
                ...searchForm,
                current_state_residence: e.target.value,
              })
            }
            placeholder="Search state..."
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
          {fighters.map((fighter, index) => (
            <tr
              key={fighter.fighterID}
              className={
                selectedFighterIndex === index ? "fighterSelected" : ""
              }
              onClick={() => handleSelectFighter(index)}
            >
              <td>{fighter.fighterID}</td>
              <td>{fighter.first_name}</td>
              <td>{fighter.last_name}</td>
              <td>{fighter.height}</td>
              <td>{fighter.weight}</td>
              <td>{fighter.fights}</td>
              <td>{fighter.wins}</td>
              <td>{fighter.losses}</td>
              <td>{fighter.draws}</td>
              <td>{fighter.KOS}</td>
              <td>{fighter.current_state_residence}</td>
              <td>{fighter.current_city_residence}</td>
              <td>{fighter.years_of_boxing}</td>
              <td>{fighter.knockout_percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => handleFighterAddUpdateClick("add")}>
          Add Fighter
        </button>
        <button onClick={() => handleFighterAddUpdateClick("update")}>
          Update Fighter
        </button>
      </div>
      <div>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </div>
    </>
  );
}

export default FighterManagementScreen;
