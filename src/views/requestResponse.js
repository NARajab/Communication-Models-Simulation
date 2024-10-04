import React, { useRef, useState, useEffect } from "react";
import client from "../images/client.png";
import internet from "../images/internet.png";
import server from "../images/server.png";

function RequestResponse({ setIsSimulationRunning }) {
  const canvasRef = useRef(null);
  const [responseTime, setResponseTime] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const clientImage = new Image();
  const serverImage = new Image();
  const internetImage = new Image();

  clientImage.src = client;
  serverImage.src = server;
  internetImage.src = internet;

  useEffect(() => {
    clientImage.onload = () => setImageLoaded(true);
    serverImage.onload = () => setImageLoaded(true);
    internetImage.onload = () => setImageLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawClientServerInternet = (ctx) => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (imageLoaded) {
      ctx.drawImage(clientImage, 50, 80, 100, 50);

      ctx.drawImage(internetImage, 200, 60, 80, 80);

      ctx.drawImage(serverImage, 350, 80, 100, 50);
    } else {
      ctx.fillStyle = "black";
      ctx.font = "bold 16px Arial";
      ctx.fillText("Loading images...", 180, 100);
    }

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 105);
    ctx.lineTo(200, 105);
    ctx.stroke();
    ctx.moveTo(280, 105);
    ctx.lineTo(350, 105);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(190, 95);
    ctx.lineTo(190, 105);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(350, 100);
    ctx.lineTo(340, 95);
    ctx.lineTo(340, 105);
    ctx.fill();
  };

  const sendRequest = () => {
    setIsSimulationRunning(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawClientServerInternet(ctx);

    const startTime = new Date().getTime();
    ctx.fillStyle = "#0000ff";
    ctx.font = "16px Arial";
    ctx.fillText("Sending request...", 10, 30);

    let requestX = 150;
    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, 60);
      ctx.fillStyle = "#0000ff";
      ctx.font = "16px Arial";
      ctx.fillText("Sending request...", 10, 30);

      drawClientServerInternet(ctx);

      ctx.fillStyle = "blue";
      ctx.fillRect(requestX, 100, 20, 10);
      requestX += 5;

      if (requestX >= 350) {
        clearInterval(interval);

        setTimeout(() => {
          const endTime = new Date().getTime();
          const delay = (endTime - startTime) / 1000;
          setResponseTime(delay);

          let responseX = 350;
          const responseInterval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, 60);
            ctx.fillStyle = "#008000";
            ctx.font = "16px Arial";
            ctx.fillText("Response received!", 10, 30);

            drawClientServerInternet(ctx);

            ctx.fillStyle = "green";
            ctx.fillRect(responseX, 100, 20, 10);
            responseX -= 5;

            if (responseX <= 150) {
              clearInterval(responseInterval);
            }
          }, 30);
        }, 2000);
      }
    }, 30);
    setTimeout(() => {
      setResponseTime(2.5); // Contoh response time
      setIsSimulationRunning(false); // Set simulation running to false ketika selesai
    }, 3000);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#333", fontSize: "24px" }}>
        Request-Response Simulation
      </h1>

      <canvas
        ref={canvasRef}
        width={500}
        height={200}
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          marginBottom: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <button
        onClick={sendRequest}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Send Request
      </button>

      {responseTime && (
        <p
          style={{
            fontSize: "18px",
            color: "#28a745",
            marginTop: "20px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Response Time: {responseTime.toFixed(2)} seconds
        </p>
      )}
    </div>
  );
}

export default RequestResponse;
