import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import ChartsAndMaps from "./pages/ChartsAndMaps/ChartsAndMaps";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChartsAndMaps />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
