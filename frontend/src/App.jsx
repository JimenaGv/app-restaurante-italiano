import { useEffect, useState } from "react";
import axios from "axios";

export const App = () => {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/hola")
      .then((res) => setMensaje(res.data.mensaje))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Comunicación Backend ↔ Frontend</h1>
      <p>{mensaje}</p>
    </div>
  );
};