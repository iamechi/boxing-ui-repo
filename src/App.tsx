import { BrowserRouter, Routes, Route } from "react-router-dom";
import FightSchedulingConfirmationScreen from "./app-components/SchedulingFightScreens/FightSchedulingConfirmationScreen";
import DateAndTimeSelectionScreen from "./app-components/SchedulingFightScreens/DateAndTimeSelectionScreen";
import SelectArenaScreen from "./app-components/SchedulingFightScreens/SelectArenaScreen";
import HomeScreen from "./app-components/HomeScreen";
import FighterManagementScreen from "./app-components/FighterScreens/FighterManagementScreen";
import FighterInfoInputForm from "./app-components/FighterScreens/FighterInfoInputForm";
import ArenaManagementScreen from "./app-components/ArenaScreens/ArenaManagementScreen";
import ArenaInfoInputForm from "./app-components/ArenaScreens/ArenaInfoInputForm";
import Homepage from "./app-components/Homepage";
import UnderConstruction from "./app-components/UnderConstruction";
import ScheduledFightsListScreen from "./app-components/SchedulingFightScreens/ScheduledFightsListScreen";
import SelectFightersForm from "./app-components/SchedulingFightScreens/SelectFightersScreen";

function App() {
  return (
    /*Set up the BrowserRouter tag to enable routing throughout the entire application.
    It needs to be set in the App.tsx component so that it can be used by elements 
    nested inside of it. This gurantees that the routing context is available to 
    all components in the application.*/
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />}>
            <Route index element={<Homepage />} />
            {/*fighter management routes */}
            <Route path="fighters" element={<FighterManagementScreen />} />
            <Route path="fighters/add" element={<FighterInfoInputForm />} />
            <Route path="arenas" element={<ArenaManagementScreen />} />
            {/*arena management routes */}
            <Route path="arenas/add" element={<ArenaInfoInputForm />} />
            <Route path="schedulefight" element={<ScheduledFightsListScreen />} />
            {/*scheduling fight routes */}
            <Route path="schedulefight/selectfighters" element={<SelectFightersForm/> }/>
            <Route path="schedulefight/selectarena" element={<SelectArenaScreen />} />
            <Route path="schedulefight/datetimeselection" element={<DateAndTimeSelectionScreen />} />
            <Route path="schedulefight/confirm" element={<FightSchedulingConfirmationScreen />} />
            {/*routes for screens that are not in development or in active development*/}
            <Route path="calendar" element={<UnderConstruction />} />
            <Route path="financing" element={<UnderConstruction />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
