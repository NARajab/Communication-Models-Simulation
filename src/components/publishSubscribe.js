import React, { useRef, useState, useEffect } from "react";
import publisher from "../images/publisher.png";
import subscriber1 from "../images/1.png";
import subscriber2 from "../images/2.png";
import messageImage from "../images/message.png";
import routerImage from "../images/brocker.png";

function PublishSubscribe({ setIsSimulationRunning }) {
  const canvasRef = useRef(null);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [publisherImage] = useState(new Image());
  const [subscriber1Image] = useState(new Image());
  const [subscriber2Image] = useState(new Image());
  const [messageImg] = useState(new Image());
  const [routerImageObj] = useState(new Image());

  useEffect(() => {
    publisherImage.src = publisher;
    subscriber1Image.src = subscriber1;
    subscriber2Image.src = subscriber2;
    messageImg.src = messageImage;
    routerImageObj.src = routerImage;

    publisherImage.onload =
      subscriber1Image.onload =
      subscriber2Image.onload =
      messageImg.onload =
      routerImageObj.onload =
        () => {
          setImagesLoaded(true);
        };
  }, [
    publisherImage,
    subscriber1Image,
    subscriber2Image,
    messageImg,
    routerImageObj,
  ]);

  const drawSystem = (ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw Publisher
    if (imagesLoaded) {
      ctx.drawImage(publisherImage, 50, 50, 120, 50);
    }
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Publisher", 50, 120);

    // Draw Router (Network device)
    if (imagesLoaded) {
      ctx.drawImage(routerImageObj, 250, 60, 80, 80);
    }
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Router", 263, 150);

    // Draw Subscribers
    if (imagesLoaded) {
      ctx.drawImage(subscriber1Image, 450, 30, 120, 50);
      ctx.drawImage(subscriber2Image, 450, 110, 120, 50);
    }
    ctx.fillStyle = "black";
    ctx.font = "bold 14px Arial";
    ctx.fillText("Subscriber 1", 460, 100);
    ctx.fillText("Subscriber 2", 460, 180);

    // Optional: Draw connections
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(120, 99);
    ctx.lineTo(245, 100); // Connect Publisher to Router
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(330, 100); // Router to Subscriber 1
    ctx.lineTo(450, 55);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(330, 100); // Router to Subscriber 2
    ctx.lineTo(450, 135);
    ctx.stroke();
  };

  const publishMessage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    setIsSimulationRunning(true);

    drawSystem(ctx);

    let messageX = 120;
    let messageY = 75;

    const animatePublisherToRouter = setInterval(() => {
      drawSystem(ctx);

      if (imagesLoaded) {
        // Draw custom message image (like a packet moving)
        ctx.drawImage(messageImg, messageX, messageY, 30, 30);
      }

      messageX += 5;

      if (messageX >= 250) {
        clearInterval(animatePublisherToRouter);
        forwardToSubscribers(ctx);
      }
    }, 30);
  };

  const forwardToSubscribers = (ctx) => {
    let messageX1 = 300;
    let messageY1 = 75;

    // First, to Subscriber 1
    const subscriber1Position = { x: 450, y: 55 };
    const angleToSubscriber1 = Math.atan2(
      subscriber1Position.y - messageY1,
      subscriber1Position.x - messageX1
    );

    const speed = 7; // Adjust speed as necessary

    const interval1 = setInterval(() => {
      drawSystem(ctx);

      if (imagesLoaded) {
        ctx.drawImage(messageImg, messageX1, messageY1, 30, 30);
      }

      messageX1 += speed * Math.cos(angleToSubscriber1);
      messageY1 += speed * Math.sin(angleToSubscriber1);

      // Check if the message has reached Subscriber 1
      if (
        Math.abs(messageX1 - subscriber1Position.x) < 5 &&
        Math.abs(messageY1 - subscriber1Position.y) < 5
      ) {
        clearInterval(interval1);
        setReceivedMessages((prev) => [
          ...prev,
          "Subscriber 1 received message",
        ]);

        // Now send the remaining message to Subscriber 2
        let messageX2 = 300; // Reset position to Router
        let messageY2 = 75;
        const subscriber2Position = { x: 450, y: 135 };
        const angleToSubscriber2 = Math.atan2(
          subscriber2Position.y - messageY2,
          subscriber2Position.x - messageX2
        );

        const interval2 = setInterval(() => {
          drawSystem(ctx);

          if (imagesLoaded) {
            ctx.drawImage(messageImg, messageX2, messageY2, 30, 30);
          }

          messageX2 += speed * Math.cos(angleToSubscriber2);
          messageY2 += speed * Math.sin(angleToSubscriber2);

          // Check if the message has reached Subscriber 2
          if (
            Math.abs(messageX2 - subscriber2Position.x) < 5 &&
            Math.abs(messageY2 - subscriber2Position.y) < 5
          ) {
            clearInterval(interval2);
            setReceivedMessages((prev) => [
              ...prev,
              "Subscriber 2 received message",
            ]);

            // End the simulation after the messages are delivered
            setIsSimulationRunning(false);
          }
        }, 50);
      }
    }, 50);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <canvas
        ref={canvasRef}
        width={600}
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
        onClick={publishMessage}
        style={{
          padding: "10px 20px",
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
        Publish Message
      </button>

      <div
        style={{
          marginTop: "20px",
          fontSize: "18px",
          color: "#28a745",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {receivedMessages.length > 0 ? (
          receivedMessages.map((msg, index) => <p key={index}>{msg}</p>)
        ) : (
          <p>No messages received yet.</p>
        )}
      </div>
    </div>
  );
}

export default PublishSubscribe;
