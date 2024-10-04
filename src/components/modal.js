import React from "react";

const AlertModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          maxWidth: "300px",
        }}
      >
        <h2 style={{ margin: "0 0 20px 0" }}>Simulation Running</h2>
        <p>Simulation is running. Wait until it's finished.</p>
        <button
          onClick={onClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
