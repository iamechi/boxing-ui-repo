import React, { useState } from "react";
import type { Arena } from "./ArenaManagementScreen.tsx";
import { arenaApi } from "../AxiosInstance.tsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "/src/BoxingApp.css";

const defaultState: Arena = {
  arena_id: 0,
  name: "",
  city: "",
  state: "",
  country: "",
  revenue_split: 0,
  seats: 0,
  address: "",
  open: false,
  safety_compliant: false,
};

export default function ArenaInfoInputForm() {
  // Initialize form state with default values and any provided initial values
  // Use the useState hook to manage form state and errors
  //passes the default state but has the initial values override the default state if they are provided
  const navigate = useNavigate();
  const location = useLocation();

  const { submitType, initial } = location.state || {
    submitType: "add",
    initial: undefined,
  };

  const [form, setForm] = useState<Arena>({
    ...defaultState,
    ...(initial || {}),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  /*K extends keyof Arena means that K can only be a key of the Arena interface.
    This ensures that the update function can only be called with valid keys of the Arena object.
    This is the function that updates the values of the input form*/
  const update = <K extends keyof Arena>(key: K, value: Arena[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((e) => ({ ...e, [String(key)]: "" }));
  };

  // Validate the form fields and set error messages if necessary
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.name?.trim()) e.arena_name = "Arena name required";
    if (!form.city?.trim()) e.arena_city = "Arena city required";
    if (!form.state?.trim()) e.arena_state = "Arena state required";
    if (!form.country?.trim()) e.arena_country = "Arena country required";
    if (!form.address?.trim()) e.arena_address = "Arena address required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  //This sends a post request to the backend to add or update an arena record based on the submitType value
  const addArenaSubmitHandler = async (arena: Arena) => {
    var path = "arenas/add";

    if (submitType === "update") {
      path = "arenas/update";
    }

    await arenaApi
      .post(path, arena)
      .then((response) => {
        console.log("Response:", response);
        navigate("/arenas");
      })
      .catch((error) => {
        console.log("Error adding arena:", error.response.data);
        setErrorMessage("Error adding arena: " + error.response.data);
      });
  };

  //This function handles the form submission, validates the form, and calls the addArenaSubmitHandler function to send the data to the backend
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addArenaSubmitHandler(form);
    console.log("Form submitted:", form);
  };

  //Resets the form to the default state and clears any error messages
  const handleReset = () => {
    setForm(defaultState);
    setErrors({});
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{errorMessage && <div className="error">{errorMessage}</div>}</div>
      <div className={"form-container"}>
        <div className={"form-container-column"}>
          <label>
            Arena Name:
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </label>
          {errors.arena_name && (
            <div className="error">{errors.arena_name}</div>
          )}
          <label>
            Arena Country:
            <input
              type="text"
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
            />
          </label>
          {errors.arena_country && (
            <div className="error">{errors.arena_country}</div>
          )}
          <label>
            Arena Address:
            <input
              type="text"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </label>
          {errors.arena_address && (
            <div className="error">{errors.arena_address}</div>
          )}
        </div>
        <div className={"form-container-column"}>
          <label>
            Arena City:
            <input
              type="text"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </label>
          {errors.arena_city && (
            <div className="error">{errors.arena_city}</div>
          )}
          <label>
            Arena Revenue Split:
            <input
              type="number"
              value={form.revenue_split}
              onChange={(e) =>
                update("revenue_split", parseFloat(e.target.value))
              }
            />
          </label>
          <label>
            Arena Open:
            <input
              type="checkbox"
              checked={form.open}
              onChange={(e) => update("open", e.target.checked)}
            />
          </label>
        </div>
        <div className={"form-container-column"}>
          <label>
            Arena State:
            <input
              type="text"
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
            />
          </label>
          {errors.arena_state && (
            <div className="error">{errors.arena_state}</div>
          )}
          <label>
            Arena Seats:
            <input
              type="number"
              value={form.seats}
              onChange={(e) => update("seats", parseInt(e.target.value))}
            />
          </label>
          <label>
            Arena Safety Compliant:
            <input
              type="checkbox"
              checked={form.safety_compliant}
              onChange={(e) => update("safety_compliant", e.target.checked)}
            />
          </label>
        </div>
      </div>
      <div>
        <button type="button" onClick={() => navigate("/arenas")}>
          Cancel
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" onClick={handleSubmit}>
          Save Arena
        </button>
      </div>
    </form>
  );
}
