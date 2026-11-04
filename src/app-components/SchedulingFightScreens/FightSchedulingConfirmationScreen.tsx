import { useLocation, useNavigate } from "react-router-dom";
import { scheduleApi } from "../AxiosInstance";
import { useState } from "react";

export interface ScheduledFightData {
    arena_id: number;
    fighter_id_1: number;
    fighter_id_2: number;
    winner_id: number | null;
    event_status: string;
    date: string;
    time: string;
}

export default function FightSchedulingConfirmationScreen() {
    const location = useLocation();
    const navigate = useNavigate();

    const { selectedFighters, selectedArena, dateTimeSelectionForm } = location.state;
    
    let[errorMessage, setErrorMessage] = useState("");

    const scheduleFightHandler = async (data: ScheduledFightData) => {
        // Add the logic to schedule the fight here
        scheduleApi
        .post("/save", data)
        .then(response => {
            console.log("Fight scheduled successfully:", response.data);
            navigate("/schedulefight");
        })
        .catch(error => {
            //setting error message for when validation on the backend fails
            console.error("Error scheduling fight:", error);
            setErrorMessage("Error scheduling fight: " +error.response.data);
        });
    };

    const setScheduledFightData = () => {
        const data: ScheduledFightData = {
            arena_id: selectedArena.arena_id,
            fighter_id_1: selectedFighters[0].fighterID,
            fighter_id_2: selectedFighters[1].fighterID,
            winner_id: null, // Assuming the winner is not known at scheduling time
            event_status: "scheduled",
            date: dateTimeSelectionForm.date,
            time: dateTimeSelectionForm.time
        };
        scheduleFightHandler(data);
    };

    return (
        <>
            <h2>Fight Scheduling Confirmation</h2>
            <div id="fighterScreenConfirmation">
                <div id="fighterVsSection">
                    <p>{selectedFighters[0].first_name + " " + selectedFighters[0].last_name}</p>
                    <p>vs</p>
                    <p>{selectedFighters[1].first_name + " " + selectedFighters[1].last_name}</p>
                </div>
                <div>
                    <p>at</p>
                </div>
                <div id="boxerArenaInformationSection">
                    <p>{selectedArena.name}</p>
                    <p>{selectedArena.address}</p>
                    <p>{selectedArena.city + ", " + selectedArena.state}</p>
                </div>
                <div>
                    <p>on</p>
                </div>
                <div>
                    <p>{dateTimeSelectionForm.date + " " + dateTimeSelectionForm.time}</p>
                </div>
                <p>Are you sure you want to schedule this fight?</p>
                <div id="fighterScreenConfirmationButtons">
                    <button onClick={() => navigate(-1)}>Cancel</button>
                    <button onClick={() => {
                        // Add the logic to schedule the fight here
                        setScheduledFightData();
                    }}>Confirm</button>
                </div>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        </>
    );
}