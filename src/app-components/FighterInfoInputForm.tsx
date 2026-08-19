import React, { useState } from "react";
import type { Fighter } from "./FighterManagementScreen";

// /c:/boxing-app-react-ui/src/app-components/FighterInfoInputForm.tsx

interface Props {
  initial?: Partial<Fighter>;
  onSubmit?: (fighter: Fighter) => void;
  onCancel?: () => void;
}

const defaultState: Fighter = {
  fighterID: 0,
  first_name: "",
  last_name: "",
  height: 0,
  weight: 0,
  fights: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  KOS: 0,
  current_state_residence: "",
  current_city_residence: "",
  years_of_boxing: 0,
  knockout_percentage: 0,
  photo_attachment: "",
};

export default function FighterInfoInputForm({
  initial,
  onSubmit,
  onCancel,
}: Props) {
  // Initialize form state with default values and any provided initial values
  // Use the useState hook to manage form state and errors
  //passes the default state but has the initial values override the default state if they are provided
  const [form, setForm] = useState<Fighter>({
    ...defaultState,
    ...(initial || {}),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  /*K extends keyof Fighter means that K can only be a key of the Fighter interface. 
  This ensures that the update function can only be called with valid keys of the Fighter object.*/
  const update = <K extends keyof Fighter>(key: K, value: Fighter[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((e) => ({ ...e, [String(key)]: "" }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.first_name?.trim()) e.first_name = "First name required";
    if (!form.last_name?.trim()) e.last_name = "Last name required";
    if (form.wins !== undefined && form.wins < 0)
      e.wins = "Wins cannot be negative";
    if (form.losses !== undefined && form.losses < 0)
      e.losses = "Losses cannot be negative";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;
    onSubmit?.(form);
  };

  const handleReset = () => {
    setForm({ ...defaultState });
    setErrors({});
    onCancel?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 640, display: "grid", gap: 8 }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <label>
            First name
            <input
              type="text"
              value={form.first_name}
              onChange={(e) => update("first_name", e.target.value)}
            />
          </label>
          {errors.first_name && (
            <div style={{ color: "red" }}>{errors.first_name}</div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <label>
            Last name
            <input
              type="text"
              value={form.last_name}
              onChange={(e) => update("last_name", e.target.value)}
            />
          </label>
          {errors.last_name && (
            <div style={{ color: "red" }}>{errors.last_name}</div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <label style={{ flex: 1 }}>
          Weight (kg)
          <input
            type="number"
            min={0}
            step="0.1"
            value={form.weight ?? ""}
            onChange={(e) =>
              update(
                "weight",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
          />
        </label>

        <label style={{ flex: 1 }}>
          Height (inches)
          <input
            type="number"
            min={0}
            value={form.height ?? ""}
            onChange={(e) =>
              update(
                "height",
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
          />
        </label>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <label style={{ flex: 1 }}>
          Wins
          <input
            type="number"
            min={0}
            value={form.wins ?? 0}
            onChange={(e) => update("wins", Number(e.target.value))}
          />
          {errors.wins && <div style={{ color: "red" }}>{errors.wins}</div>}
        </label>

        <label style={{ flex: 1 }}>
          Losses
          <input
            type="number"
            min={0}
            value={form.losses ?? 0}
            onChange={(e) => update("losses", Number(e.target.value))}
          />
          {errors.losses && <div style={{ color: "red" }}>{errors.losses}</div>}
        </label>

        <label style={{ flex: 1 }}>
          Draws
          <input
            type="number"
            min={0}
            value={form.draws ?? 0}
            onChange={(e) => update("draws", Number(e.target.value))}
          />
        </label>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <button type="submit">Save Fighter</button>
      </div>
    </form>
  );
}
