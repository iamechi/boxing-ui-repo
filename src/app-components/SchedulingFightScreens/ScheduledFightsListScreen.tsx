import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { scheduleApi } from "../AxiosInstance.tsx";
import "/src/BoxingApp.css";

export interface ScheduledFight {
  event_id: number;
  fighter_1: string;
  fighter_2: string;
  arena: string;
  address: string;
  date: string;
  time: string;
  event_status: string;
  winner: String | null;
}

export interface ScheduledFightSearchForm {
  city: string;
  state: string;
  country: string;
  date: string;
}

export default function ScheduledFightsListScreen() {
  //Creating an array for the column headers of the scheduled fights info table
  const colHeaders = [
    "Fighter 1",
    "Fighter 2",
    "Arena",
    "Address",
    "Date",
    "Time",
    "Status",
    "Winner",
  ];

  //Setting variable that will use the useNavigate method to control screen navigation
  const navigate = useNavigate();

  //initializing all of the variables and functions that use the UseState hook
  const [scheduledFights, setScheduledFights] = useState<ScheduledFight[]>([]);
  //const [fightIndex, setFightIndex] = useState(-1);
  const [searchForm, setSearchForm] = useState<ScheduledFightSearchForm>(
    {} as ScheduledFightSearchForm,
  );
  //const [errorMessage, setErrorMessage] = useState<string>("");

  //useEffect hook to retrieve the scheduled fights data upon loading the screen
  useEffect(() => {
    const fetchScheduledFights = async () => {
      let response = await scheduleApi.get("");
      let fightData = (await response.data) as ScheduledFight[];
      setScheduledFights(fightData);
    };
    fetchScheduledFights();
  }, []);

  //This function handles the searching of scheduled fights based on the search form data
  const handleSearchScheduledFights = async () => {
    scheduleApi
      .post("/search", searchForm)
      .then(async (response) => {
        let fightData = (await response.data) as ScheduledFight[];
        setScheduledFights(fightData);
        console.log("Search results:", fightData);
      });
  };

  //This handles the selection of a scheduled fight record based on index
  /*This method is commented out for now since the updating functionality for the scheduled fights
  has not been set up yet.
  const handleSelectScheduledFight = (index: number) => {
    setFightIndex(index);
  };
 */

  //This handles the scheduling of a fight based on the submitType value, which can be either "add" or "update"
  const handleSchedulingFightClick = (submitType: string) => {
    if (submitType === "add") {
      navigate("/schedulefight/selectfighters");
    }
  };

  return (
    <>
      <div className={"topSectionBackground"}>
        <h2 id="pageHeader">Scheduled Fights</h2>
        <div className={"searchBar"}>
          <div>
            <label>City:</label>
            <input
              type="text"
              value={searchForm.city}
              onChange={(e) =>
                setSearchForm({ ...searchForm, city: e.target.value })
              }
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type="text"
              value={searchForm.state}
              onChange={(e) =>
                setSearchForm({ ...searchForm, state: e.target.value })
              }
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              value={searchForm.country}
              onChange={(e) =>
                setSearchForm({ ...searchForm, country: e.target.value })
              }
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={searchForm.date}
              onChange={(e) =>
                setSearchForm({ ...searchForm, date: e.target.value })
              }
            />
          </div>
          <button onClick={() => handleSearchScheduledFights()}>Search</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {colHeaders.map((header, index) => (
              <th className="column-name" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduledFights.map((fight, index) => (
            <tr
              key={index}
              //className={fightIndex === index ? "selected" : ""}
              //onClick={() => handleSelectScheduledFight(index)}
            >
              <td>{fight.fighter_1}</td>
              <td>{fight.fighter_2}</td>
              <td>{fight.arena}</td>
              <td>{fight.address}</td>
              <td>{fight.date}</td>
              <td>{fight.time}</td>
              <td>{fight.event_status}</td>
              <td>{fight.winner !== null ? fight.winner : "TBD"}</td>
            </tr>
          ))}
        </tbody>
        <div>
          <button onClick={() => handleSchedulingFightClick("add")}>
            Schedule Fight
          </button>
        </div>
      </table>
    </>
  );
}
