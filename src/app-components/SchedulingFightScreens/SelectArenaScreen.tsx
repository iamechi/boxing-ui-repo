import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { arenaApi } from "../AxiosInstance";
import type { Arena } from "../ArenaScreens/ArenaManagementScreen";
import "/src/BoxingApp.css";

export interface SearchArenaForm {
    name: string;
    address: string;
}

export default function SelectArenaScreen() {
    //Initializing the column headers for the arena table
    const colHeaders = [
        "",
        "Name",
        "Address",
        "Capacity"
    ];

    //Initializing navigation function
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.state);
    const { selectedFighters } = location.state || {};
    console.log(selectedFighters);
    //Initializing variables and functions that use the state hook from React
    let [searchForm, setSearchForm] = useState<SearchArenaForm>({} as SearchArenaForm);
    let [arenas, setArenas] = useState<Arena[]>([]);
    let [errorMessage, setErrorMessage] = useState<string>("");
    let [selectedArenaIndex, setSelectedArenaIndex] = useState<number | null>(null);

    //This is used to retrieve the data on initial rendering of screen
    useEffect(() => {
        const fetchArenaRecords = async() => {
            let response = await arenaApi.get("");
            let arenaData = (await response.data) as Arena[];
            setArenas(arenaData);
        }

        fetchArenaRecords();
        console.log(arenas);
    }, []);

    //This handles the search functionality for arenas
    const handleSearch = async () => {
        arenaApi.post("/search", searchForm).then(async (response) => {
            let arenaData = (await response.data) as Arena[];
            setArenas(arenaData);
        });
    }

    const handleChooseDateAndTime = () => {
        if (selectedArenaIndex === null) {
            setErrorMessage("Please select an arena.");
            return;
        }

        const selectedArena = arenas[selectedArenaIndex];
        navigate("/schedulefight/datetimeselection", { state: { selectedFighters, selectedArena } });
    };

    return (
        <>
            <h2 id="pageHeader">Select Your Arena</h2>
                {/* Render the arena table and search form here */}
            <div className="searchBar">
                {/* Render the arena table and search form here */}
                <div>
                    <label>Name:</label>
                    <input type="text" value={searchForm.name} onChange={(e) => setSearchForm({...searchForm, name: e.target.value})} />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={searchForm.address} onChange={(e) => setSearchForm({...searchForm, address: e.target.value})} />
                </div>
                <div>
                    <button onClick={() => handleSearch()}>Search</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        {colHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {arenas.map((arena, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                  type="checkbox"
                                  checked={selectedArenaIndex === index}
                                  onChange={() => setSelectedArenaIndex(index)}
                                />
                            </td>
                            <td>{arena.name}</td>
                            <td>{arena.address + " " + arena.city + ", " + arena.state}</td>
                            <td>{arena.seats}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div>
                <button onClick={() => handleChooseDateAndTime()}>
                    Choose Date & Time
                </button>
                <button onClick={() => navigate("/schedulefight/selectfighters")}>
                    Back
                </button>
            </div>
        </>
    );
};