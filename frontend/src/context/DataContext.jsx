import React, { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [contribuyente, setContribuyente] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);
  const [licencia, setLicencia] = useState(null);

  return (
    <DataContext.Provider
      value={{
        contribuyente,
        setContribuyente,
        vehiculo,
        setVehiculo,
        licencia,
        setLicencia,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}