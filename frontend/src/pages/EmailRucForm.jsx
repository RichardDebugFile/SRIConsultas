import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EmailRucForm() {
  const [email, setEmail] = useState("");
  const [ruc, setRuc] = useState("");
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const consultar = async () => {
    setLoading(true);
    setError("");
    setDatos(null);
    try {
      const response = await axios.get(`/api/contribuyente/${ruc}`);
      setDatos(response.data);
    } catch (err) {
      console.error(err);
      setError("No se pudo encontrar al contribuyente o hubo un error.");
    } finally {
      setLoading(false);
    }
  };

  const continuar = () => {
    navigate("/vehiculo");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Consultar Contribuyente</h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="text"
        placeholder="Cédula o RUC"
        value={ruc}
        onChange={(e) => setRuc(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={consultar}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? "Consultando..." : "Consultar"}
      </button>

      {error && (
        <p className="text-red-600 mt-4 text-center font-semibold">{error}</p>
      )}

      {datos && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Información del Contribuyente</h3>
          <p><strong>RUC:</strong> {datos.ruc || "(no disponible)"}</p>
          <p><strong>Razón Social:</strong> {datos.razonSocial}</p>
          <p><strong>Tipo de Contribuyente:</strong> {datos.tipoContribuyente}</p>
          <p><strong>Estado:</strong> {datos.estado || "(no disponible)"}</p>

          <button
            onClick={continuar}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Continuar con Matrícula
          </button>
        </div>
      )}
    </div>
  );
}
