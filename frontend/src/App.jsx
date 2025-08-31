import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProfile } from "./pages/Perfil";
import { Home } from "./pages/Home";


export const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para perfil */}
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </Router>
  );
};
