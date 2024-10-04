import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import PublishSubscribe from "./views/publishSubscribe";
import RequestResponse from "./views/requestResponse";

function App() {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (isSimulationRunning) {
      const confirmExit = window.confirm(
        "A simulation is running. wait until it's finished"
      );
      if (confirmExit) return;
    }
    navigate(path);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "#333", fontFamily: "Arial, sans-serif" }}>
        Communication Models Simulation
      </h1>

      <div style={{ margin: "20px" }}>
        <button
          onClick={() => handleNavigation("/request-response")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Request-Response
        </button>

        <button
          onClick={() => handleNavigation("/publish-subscribe")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Publish-Subscribe
        </button>
      </div>

      <Routes>
        <Route
          path="/request-response"
          element={
            <RequestResponse setIsSimulationRunning={setIsSimulationRunning} />
          }
        />
        <Route
          path="/publish-subscribe"
          element={
            <PublishSubscribe setIsSimulationRunning={setIsSimulationRunning} />
          }
        />
      </Routes>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
