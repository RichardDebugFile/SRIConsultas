import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { consultarLicencia } from "../api.js";
import { DataContext } from "../context/DataContext.jsx";

export default function LicenseForm() {
  const { setLicencia } = useContext(DataContext);
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await consultarLicencia(cedula);
      setLicencia(data);
      navigate("/resumen");
    } catch (err) {
      setError(err.response?.data?.message || "Error al consultar ANT");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white shadow p-6 rounded-xl w-full max-w-md space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">
        Puntos de Licencia
      </h1>

      <label className="block">
        <span className="text-sm font-medium">Cédula</span>
        <input
          type="text"
          className="mt-1 w-full border rounded p-2"
          value={cedula}
          required
          onChange={(e) => setCedula(e.target.value)}
        />
      </label>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Consultar
      </button>
    </form>
  );
}