import React from "react";
import { AppProvider } from "./context/AppContext";
import DashboardLayout from "./components/DashboardLayout";

const App = () => {
  return (
    <AppProvider>
      <DashboardLayout />
    </AppProvider>
  );
};

export default App;
