import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PreviousAttempts from "./pages/PreviousAttempts";
import ScoreChart from "./pages/ScoreChart";
import AttemptDetails from "./pages/AttemptDetails";
import Flashcards from "./pages/Flashcards";



function AppRoutes() {
  const location = useLocation();
  const screen = location.state?.screen;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      
      <Route path="/auth" element={<AuthPage screen={screen} />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
  path="/previous-attempts"
  element={
    <PrivateRoute>
      <PreviousAttempts />
    </PrivateRoute>
  }
/>
<Route
  path="/attempt/:id"
  element={
    <PrivateRoute>
      <AttemptDetails />
    </PrivateRoute>
  }
/>
<Route
  path="/score-chart"
  element={
    <PrivateRoute>
      <ScoreChart />
    </PrivateRoute>
  }
/>

<Route
  path="/flashcards"
  element={
    <PrivateRoute>
      <Flashcards />
    </PrivateRoute>
  }
/>

 
    

      {/* Catch-all for unmatched routes */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
