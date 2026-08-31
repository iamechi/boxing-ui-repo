import { Fragment, use } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./app-components/HomeScreen";
import FighterManagementScreen from "./app-components/FighterManagementScreen";
import FighterInfoInputForm from "./app-components/FighterInfoInputForm";
import Homepage from "./app-components/Homepage";
import Menu from "./app-components/Menu";
import Title from "./app-components/Title";

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
            <Route path="home" element={<Homepage />} />
            <Route path="areas" element={<></>} />
            <Route path="fighters" element={<FighterManagementScreen />} />
            <Route path="fighters/add" element={<FighterInfoInputForm />} />
            <Route path="schedulefight" element={<></>} />
            <Route path="calendar" element={<></>} />
            <Route path="financing" element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
