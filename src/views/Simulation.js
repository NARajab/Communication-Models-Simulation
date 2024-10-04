import React, { useState } from "react";
import RequestResponse from "../components/requestResponse";
import PublishSubscribe from "../components/publishSubscribe";

/**
 * Komponen Simulation
 * Komponen ini menampilkan simulasi dua model komunikasi dalam sistem terdistribusi:
 * 1. Model Request-Response
 * 2. Model Publish-Subscribe
 */

function Simulation() {
  // eslint-disable-next-line no-unused-vars
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  return (
    <div>
      <h1
        style={{
          color: "#333",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Communication Models Simulation
      </h1>

      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div style={{ margin: "0 20px" }}>
          {" "}
          <h2
            style={{
              color: "#333",
              fontFamily: "Arial, sans-serif",
              fontSize: "24px",
            }}
          >
            Request-Response Model
          </h2>
          <RequestResponse setIsSimulationRunning={setIsSimulationRunning} />
        </div>
        <div style={{ margin: "0 20px" }}>
          {" "}
          <h2
            style={{
              color: "#333",
              fontFamily: "Arial, sans-serif",
              fontSize: "24px",
            }}
          >
            Publish-Subscribe Model
          </h2>
          <PublishSubscribe setIsSimulationRunning={setIsSimulationRunning} />
        </div>
      </div>
    </div>
  );
}

export default Simulation;
