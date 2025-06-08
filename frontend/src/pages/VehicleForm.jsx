import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { consultarVehiculo } from "../api.js";
import { DataContext } from "../context/DataContext.jsx";

export default function VehicleForm() {
  const { setVehiculo } = useContext(DataContext);
  const [placa, setPlaca] = useState("");
  const [vehiculoData, setVehiculoData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const buscarVehiculo = async (e) => {
    e.preventDefault();
    if (!placa.trim()) {
      setError("Por favor ingrese una placa");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await consultarVehiculo(placa);
      if (!data || !data.placa) {
        setError("No se encontraron datos para esta placa");
        setVehiculoData(null);
      } else {
        setVehiculoData(data);
        setVehiculo(data);
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al consultar vehículo");
      setVehiculoData(null);
    } finally {
      setLoading(false);
    }
  };

  const continuarALicencia = () => {
    navigate("/licencia");
  };

  const limpiarFormulario = () => {
    setPlaca("");
    setVehiculoData(null);
    setError("");
  };

  return (
    <div className="bg-white shadow p-6 rounded-xl w-full max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Consulta de Vehículo
      </h1>

      <form onSubmit={buscarVehiculo} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Placa o CAMPV</span>
          <input
            type="text"
            className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={placa}
            required
            placeholder="Ej: PDM6368"
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
          />
        </label>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-medium transition-colors"
        >
          {loading ? "Consultando..." : "Buscar Vehículo"}
        </button>
      </form>

      {vehiculoData && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Datos del Vehículo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Placa:</span>
                <p className="text-gray-900 font-semibold">{vehiculoData.placa || "N/A"}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-600">Marca:</span>
                <p className="text-gray-900">{vehiculoData.marca || "N/A"}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-600">Modelo:</span>
                <p className="text-gray-900">{vehiculoData.modelo || "N/A"}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Clase:</span>
                <p className="text-gray-900">{vehiculoData.clase || "N/A"}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-600">Año:</span>
                <p className="text-gray-900">{vehiculoData.anio || "N/A"}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-600">Estado:</span>
                <p className="text-gray-900">{vehiculoData.estado || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={continuarALicencia}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Continuar a Licencia
            </button>

            <button
              onClick={limpiarFormulario}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Nueva Consulta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}