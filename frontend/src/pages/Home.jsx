import { Navbar } from "../components/Navbar";
import { NavbarProvider } from "../context/navbarContext";

export const Home = () => {
  return (
    <NavbarProvider>
      <div className="page">
        {/* Navbar */}
        <Navbar />
      </div>
    </NavbarProvider>
  );
};