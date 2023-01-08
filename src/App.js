import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./Pages/About";
import Detections from "./Pages/Detections";
import Home from "./Pages/Home";
import Analytics from "./Pages/Analytics";
import History from "./Pages/History"
import MapLocations from "./Components/MapLocations";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="detections" element={<Detections />} />
        <Route path="about" element={<About />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="history" element={<History />} />
        <Route path="map" element={<MapLocations/>}/>
      </Routes>
    </BrowserRouter>

    // <Home/>
  );
}

export default App;
