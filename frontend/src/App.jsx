import { Outlet } from "react-router-dom";
import { DataProvider } from "./context/DataContext.jsx";

export default function App() {
  return (
    <DataProvider>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Outlet />
      </div>
    </DataProvider>
  );
}