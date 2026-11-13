import { useEffect } from "react";
import { useState } from "react";
import { fighterApi } from "../AxiosInstance.tsx";
import { useNavigate } from "react-router-dom";
import "/src/BoxingApp.css";

//This is the data object on the front-end for the fighter records
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
  //creating an array for the column headers of the fighter info table
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

  //setting a const variable to use the useNavigate method to control screen navigation
  const navigate = useNavigate();

  /*Here all of the variables and functions based on the UseState hook
  are initialized*/
  let [fighters, setFighters] = useState<Fighter[]>([]);
  let [selectedFighterKey, setSelectedFighterKey] = useState(-1);
  let [errorMessage, setErrorMessage] = useState<string>("");
  let [searchForm, setSearchForm] = useState<Fighter>({} as Fighter);

  //retrieved the fighter data upon loading the screen
  useEffect(() => {
    const fetchFighterRecords = async () => {
      let response = await fighterApi.get("");
      let fighterData = (await response.data) as Fighter[];
      setFighters(fighterData);
    };

    fetchFighterRecords();
  }, []);

  //This function handles the addition and updating of fighter data records
  const handleFighterAddUpdateClick = (submitType: string) => {
    if (submitType === "update" && selectedFighterKey === -1) {
      setErrorMessage("Please select a fighter to update.");
      return;
    }

    let fighterToUpdate =
      selectedFighterKey !== -1 && submitType === "update"
        ? fighters.find((fighter) => fighter.fighterID === selectedFighterKey)
        : null;

    navigate("/fighters/add", {
      state: { submitType: submitType, initial: fighterToUpdate },
    });
  };

  /*this function handles reaching out to the backend to retrieve the search data
  based on the criteria passed in the post method*/
  const handleSearch = async (searchForm: Fighter) => {
    console.log("Searching fighters with criteria:", searchForm);
    fighterApi.post("/search", searchForm).then(async (response) => {
      let fighterData = (await response.data) as Fighter[];
      setFighters(fighterData);
      setSelectedFighterKey(-1); // Clear the selected fighter after a new search
      console.log("Search results:", fighterData);
    });
  };

  //This handles the selection of a fighter record based on key
  const handleSelectFighter = (key: number) => {
    setSelectedFighterKey(key);
  };

  return (
    <>
      <div className={"topSectionBackground"}>
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
          {fighters.map((fighter) => (
            <tr
              key={fighter.fighterID}
              className={selectedFighterKey === fighter.fighterID ? "selected" : ""}
              onClick={() => handleSelectFighter(fighter.fighterID)}
            >
              <td>{fighter.fighterID}</td>
              <td>{fighter.first_name}</td>
              <td>{fighter.last_name}</td>
              <td>{fighter.height}</td>
              <td>{fighter.weight}</td>
              <td>{fighter.wins + fighter.losses + fighter.draws}</td>
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
      <div className="buttonFormLayout">
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
