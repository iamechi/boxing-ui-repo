import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./app-components/HomeScreen";
import FighterManagementScreen from "./app-components/FighterManagementScreen";
import Menu from "./app-components/Menu";
import Title from "./app-components/Title";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />}>
            <Route path="areas" element={<></>} />
            <Route path="fighters" element={<FighterManagementScreen />} />
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
