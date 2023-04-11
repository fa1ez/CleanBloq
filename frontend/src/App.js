import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./Pages/About";
import Detections from "./Pages/Detections";
import Home from "./Pages/Home"
import History from "./Pages/History";
import Analytics from "./Pages/Analytics";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="detections" element={<Detections />} />
        <Route path="about" element={<About />} />
        <Route path="history" element={<History />} />
        <Route path="analytics" element={<Analytics />} />

      </Routes>
    </BrowserRouter>

    // <Home/>
  );
}

export default App;
