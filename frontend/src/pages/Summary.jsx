import { useContext } from "react";
import { DataContext } from "../context/DataContext.jsx";

export default function Summary() {
  const { contribuyente, vehiculo, licencia } = useContext(DataContext);

  return (
    <div className="bg-white shadow p-6 rounded-xl w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Resumen</h1>
      <div className="space-y-4">
        {contribuyente && (
          <section>
            <h2 className="font-semibold">Contribuyente</h2>
            <pre className="bg-slate-50 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(contribuyente, null, 2)}
            </pre>
          </section>
        )}
        {vehiculo && (
          <section>
            <h2 className="font-semibold">Vehículo</h2>
            <pre className="bg-slate-50 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(vehiculo, null, 2)}
            </pre>
          </section>
        )}
        {licencia && (
          <section>
            <h2 className="font-semibold">Licencia</h2>
            <pre className="bg-slate-50 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(licencia, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </div>
  );
}