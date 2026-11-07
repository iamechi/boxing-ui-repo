import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export interface DateAndTimeSelectionScreenProps {
    date: string;
    time: string;
}

export default function DateAndTimeSelectionScreen() {
    //Initializing the navigate function from react-router-dom
    const navigate = useNavigate();
    const location = useLocation();

    //Extracting fighter and arena data from the location state
    const { selectedFighters, selectedArena } = location.state || {
        selectedFighters: null,
        selectedArena: null,
    };

    //Initializing functions and variables that use the state hook
    const [dateTimeSelectionForm, setDateTimeSelectionForm] = useState<DateAndTimeSelectionScreenProps>({ date: "", time: "" });
    const [errorMessage, setErrorMessage] = useState("");

    //Handling the confirmation of the date and time selection
    const handleNext = () => {
        if (!dateTimeSelectionForm.date || !dateTimeSelectionForm.time) {
            setErrorMessage("Please select both date and time.");
            return;
        }

        setErrorMessage("");
        navigate("/schedulefight/confirm", { state: { selectedFighters, selectedArena, dateTimeSelectionForm } });
    };

    return (
    <>
        <h2 id="pageHeader">Select Date and Time</h2>
        <div className={"form-container"}>
            <div>
                <label>Date:</label>
                <input 
                    type="date"
                    value={dateTimeSelectionForm.date}
                    onChange={(e) => setDateTimeSelectionForm({ ...dateTimeSelectionForm, date: e.target.value })}
                />
            </div>
            <div>
                <label>Time:</label>
                <input 
                    type="time"
                    value={dateTimeSelectionForm.time}
                    onChange={(e) => setDateTimeSelectionForm({ ...dateTimeSelectionForm, time: e.target.value })}
                />
            </div>
        </div>
        {errorMessage && <p className={"error"}>{errorMessage}</p>}
        <div className="buttonFormLayout">
            <button onClick={() => navigate("/schedulefight/selectarena")}>Back</button>
            <button onClick={() => handleNext()}>Next</button>
        </div>
    </>
    );
}