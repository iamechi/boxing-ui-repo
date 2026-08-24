import { Fragment } from "react";
import Title from "./Title";
import NavBar from "./NavigationBar.tsx";
import { useEffect } from "react";
import { useState } from "react";
import api from "./AxiosInstance.tsx";
import { useNavigate } from "react-router-dom";

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
  useEffect(() => {
    const fetchFighterRecords = async () => {
      let response = await api.get("/fighters");
      let fighterData = (await response.data) as Fighter[];
      setFighters(fighterData);
    };

    fetchFighterRecords();
  }, []);

  const handleClick = (submitType: string) => {
    var path = "/fighters/add";

    if (submitType === "update") {
      path = "/fighters/update";
    }

    navigate("/fighters/add", { state: { submitType: submitType } });
  };

  return (
    <>
      <Title Title={"Fighter List"} />
      <table>
        <thead>
          <tr>
            {colHeaders.map((colName) => (
              <th scope="col">{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fighters.map((fighter) => (
            <tr>
              <td>{fighter.fighterID}</td>
              <td>{fighter.first_name}</td>
              <td>{fighter.last_name}</td>
              <td>{fighter.height}</td>
              <td>{fighter.weight}</td>
              <td>{fighter.fights}</td>
              <td>{fighter.wins}</td>
              <td>{fighter.losses}</td>
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
        <button onClick={() => handleClick("add")}>Add Fighter</button>
      </div>
    </>
  );
}

export default FighterManagementScreen;
