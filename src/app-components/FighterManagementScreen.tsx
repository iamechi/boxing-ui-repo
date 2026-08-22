import { Fragment } from "react";
import Title from "./Title";
import NavBar from "./NavigationBar.tsx";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AxiosInstance from "./AxiosInstance.tsx";

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
  const api = AxiosInstance;

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
    "Country",
    "Years of Experience",
    "Knockout Percentage",
  ];

  let [fighters, setFighters] = useState<Fighter[]>([]);
  useEffect(() => {
    const fetchFighterRecords = async () => {
      let response = await api.get("/fighters");
      let fighterData = (await response.data) as Fighter[];
      setFighters(fighterData);
    };

    fetchFighterRecords();
  }, []);

  const navigate = useNavigate();

  const handleClick = (submitType: string) => {
    var path = "/fighters/add";

    if (submitType === "update") {
      path = "/fighters/update";
    }

    const addFighterSubmitHandler = async (fighter: Fighter) => {
      // Send a POST request to the backend API to add the new fighter
      await api
        .post(path, fighter)
        .then((response) => {
          // Handle successful response, e.g., show a success message or navigate to another page
          console.log("Fighter added successfully:", response.data);
          // Optionally, you can refresh the fighter list or navigate to the fighter management screen
          navigate("/fighters");
        })
        .catch((error) => {
          // Handle error response, e.g., show an error message
          console.error("Error adding fighter:", error);
        });
    };

    navigate("/fighters/add", { state: { onSubmit: addFighterSubmitHandler } });
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
