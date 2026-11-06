import type { Fighter } from "../FighterScreens/FighterManagementScreen.tsx";
import  { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fighterApi } from "../AxiosInstance.tsx";
import "/src/BoxingApp.css";

export interface SelectFightersFormProps {
    first_name: string;
    last_name: string;
}

export default function SelectFightersForm() {
    //Initializing an array of strings that will be used as headers for the table
    const colHeaders = [
        "",
        "First Name",
        "Last Name",
        "Height",
        "Weight",
        "Wins",
        "Losses",
        "Draws",
        "K.O's",
        "Knockout Percentage"
    ]

    //Passing the result of useNavigate into a function variable.
    const navigate = useNavigate();
    
    //initializes all state functions and variables that uses the state hook from react.
    let [searchForm, setSearchForm] = useState<SelectFightersFormProps>({} as SelectFightersFormProps);
    let [fighters, setFighters] = useState<Fighter[]>([]);
    let [errorMessage, setErrorMessage] = useState<string>("");
    let [selectedFightersIndex, setSelectedFightersIndex] = useState<number[]>([]);
    /*Commenting this code out for now for setting name of the selected fighters at the top
    will probably figure this out later.
    let [fighter1, setFighter1] = useState<string>("");
    let [fighter2, setFighter2] = useState<string>("");
    */

    //This is used to retrieve the data on initial rendering of screen
    useEffect(() => {
        const fetchFighterRecords = async() => {
            let response = await fighterApi.get("");
            let fighterData = (await response.data) as Fighter[];
            setFighters(fighterData);
        }

        fetchFighterRecords();
        console.log(fighters);
    }, []); 

    //Function that handles the how the selection of the two fighters works
    const handleSelectFighter = (index: number) => {

        //This handles the selecting of each fighter by their index
        setSelectedFightersIndex((prevSelected) => {
            const isAlreadySelected = prevSelected.includes(index);

            if (isAlreadySelected) {
                return prevSelected.filter((id) => index !== id);    
            }

            if (prevSelected.length >= 2) {
                return prevSelected;
            }

            return [...prevSelected, index];

        });

    };

    //handles the searching of fighters
    const handleSearch = async (searchForm: SelectFightersFormProps) => {
        fighterApi.post("/search", searchForm).then(async (response) => {
            let fighterData = response.data;
            setFighters(fighterData);
        });
    }

    const handleSelectArenaNavigation = () => {
        if (selectedFightersIndex.length < 2) {
            setErrorMessage("Please make sure you select two fighters");
            return;
        }

        let fighterArray : Fighter[] = [];
        let fighter1 = fighters[selectedFightersIndex[0]];
        let fighter2 = fighters[selectedFightersIndex[1]];
        fighterArray = [...fighterArray, fighter1, fighter2];
        navigate("/schedulefight/selectarena", {
            state: {selectedFighters: fighterArray},
        })
    }

    return (
    <>
      <div className={"topSectionBackground"}>
        <h2 id="pageHeader">Select Your Fighters</h2>
        {/*Commenting out the html code for showing the selected fighters names at the top
        <div id="selectFighterVsSection">
          <input
              value={fighter1} 
              placeholder="Fighter 1"
          />
          <label>vs</label>
          <input
              value={fighter2} 
              placeholder="Fighter 2"
          />
        </div>
          */}
        <div className={"searchBar"}>
          <div>
            <label>First Name:</label>
            <input
                type="text"
                onChange={(e) => setSearchForm({...searchForm, first_name: e.target.value}) }
            />
          </div>
         <div>
              <label>Last Name:</label>
              <input
                  type="text"
                  onChange={(e) => setSearchForm({...searchForm, last_name: e.target.value})}
              />
          </div>
          <div>
              <button onClick={() => {handleSearch(searchForm)}}>Search</button>
          </div>
        </div>
      </div>
      <table>
        <thead>
            <tr>
                {colHeaders.map((colName) => (
                    <th className={"column-name"} key={colName} scope="col">
                        {colName}
                    </th>
                ))}
            </tr>                
        </thead>
        <tbody>
            {fighters.map((fighter, index) => {
                const isChecked = selectedFightersIndex.includes(index);
                const isDisabled = selectedFightersIndex.length >= 2 && !isChecked;

                return (
                    <tr
                        key={fighter.fighterID}
                    >
                        <td>
                            <input 
                                type="checkbox"
                                checked = {isChecked}
                                disabled = {isDisabled}
                                onChange={() => handleSelectFighter(index)}
                            />
                        </td>
                        <td>{fighter.first_name}</td>
                        <td>{fighter.last_name}</td>
                        <td>{fighter.height}</td>
                        <td>{fighter.weight}</td>
                        <td>{fighter.wins}</td>
                        <td>{fighter.losses}</td>
                        <td>{fighter.draws}</td>
                        <td>{fighter.KOS}</td>
                        <td>{fighter.knockout_percentage}</td>
                    </tr>
                );
            })}
        </tbody>
      </table>
      {errorMessage && <div className={"error"}>{errorMessage}</div>}
      <div>
            <button onClick={() => handleSelectArenaNavigation()}>Select Arenas</button>
            <button onClick={() => navigate("/schedulefight")}>Back</button>
      </div>
    </>
  );
}