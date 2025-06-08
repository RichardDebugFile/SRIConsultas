import { useState } from 'react';
import axios from 'axios';

function Contribuyente() {
  const [ruc, setRuc] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [datos, setDatos] = useState(null);

  const consultar = async () => {
    setLoading(true);
    setError('');
    setDatos(null);
    try {
      const response = await axios.get(`http://localhost:8080/api/contribuyente/${ruc}`);
      setDatos(response.data);
    } catch (err) {
      setError('No se pudo encontrar al contribuyente o ocurrió un error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-xl bg-white rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Consulta de Contribuyente</h1>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="RUC o cédula"
          className="w-full border p-2 rounded"
          value={ruc}
          onChange={e => setRuc(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          onClick={consultar}
          disabled={loading}
        >
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
      </div>

      {error && (
        <p className="mt-4 text-red-600 text-center">{error}</p>
      )}

      {datos && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Información del Contribuyente</h2>
          <p><strong>RUC:</strong> {datos.ruc || '(no disponible)'}</p>
          <p><strong>Razón Social:</strong> {datos.razonSocial}</p>
          <p><strong>Tipo de Contribuyente:</strong> {datos.tipoContribuyente}</p>
          <p><strong>Estado:</strong> {datos.estado || '(no disponible)'}</p>
        </div>
      )}
    </div>
  );
}

export default Contribuyente;
