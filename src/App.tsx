import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import Str8upMapPage from "./pages/Str8upMapPage";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/str8up-map" element={<Str8upMapPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
