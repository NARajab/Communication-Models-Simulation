import React, { useRef, useState, useEffect } from "react";
import publisher from "../images/publisher.png";
import subscriber1 from "../images/1.png";
import subscriber2 from "../images/2.png";
import messageImage from "../images/message.png";
import routerImage from "../images/brocker.png";

/**
 * Komponen PublishSubscribe
 *
 * Komponen ini mensimulasikan model komunikasi Publish-Subscribe dalam sistem terdistribusi.
 * Dalam simulasi ini, pengguna dapat menerbitkan pesan dari penerbit (Publisher) ke beberapa
 * pelanggan (Subscribers) melalui router.
 *
 * Fitur utama:
 * - Menggambar elemen visual (Publisher, Router, Subscriber) pada canvas.
 * - Menampilkan proses penerbitan pesan dari Publisher ke Router dan meneruskan pesan
 *   ke Subscribers dengan animasi.
 * - Menampilkan pesan yang diterima oleh Subscribers.
 *
 * Props:
 * - setIsSimulationRunning: Fungsi untuk mengubah status simulasi (berjalan/berhenti).
 */

// Komponen utama untuk simulasi Publish-Subscribe
function PublishSubscribe({ setIsSimulationRunning }) {
  // Ref untuk elemen canvas
  const canvasRef = useRef(null);

  // State untuk pesan yang diterima dan status pemuatan gambar
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // State untuk objek gambar
  const [publisherImage] = useState(new Image());
  const [subscriber1Image] = useState(new Image());
  const [subscriber2Image] = useState(new Image());
  const [messageImg] = useState(new Image());
  const [routerImageObj] = useState(new Image());

  // Memuat gambar dan memperbarui status pemuatan
  useEffect(() => {
    // Mengatur sumber gambar
    publisherImage.src = publisher;
    subscriber1Image.src = subscriber1;
    subscriber2Image.src = subscriber2;
    messageImg.src = messageImage;
    routerImageObj.src = routerImage;

    // Mengatur imagesLoaded menjadi true saat semua gambar sudah dimuat
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

  // Fungsi untuk menggambar komponen sistem di canvas
  const drawSystem = (ctx) => {
    // Menghapus canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Menggambar Publisher
    if (imagesLoaded) {
      ctx.drawImage(publisherImage, 50, 50, 120, 50);
    }
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Publisher", 50, 120);

    // Menggambar Router
    if (imagesLoaded) {
      ctx.drawImage(routerImageObj, 250, 60, 80, 80);
    }
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Router", 263, 150);

    // Menggambar Subscribers
    if (imagesLoaded) {
      ctx.drawImage(subscriber1Image, 450, 30, 120, 50);
      ctx.drawImage(subscriber2Image, 450, 110, 120, 50);
    }
    ctx.fillStyle = "black";
    ctx.font = "bold 14px Arial";
    ctx.fillText("Subscriber 1", 460, 100);
    ctx.fillText("Subscriber 2", 460, 180);

    // Opsional: Menggambar koneksi antara komponen
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(120, 99); // Menghubungkan Publisher ke Router
    ctx.lineTo(245, 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(330, 100); // Router ke Subscriber 1
    ctx.lineTo(450, 55);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(330, 100); // Router ke Subscriber 2
    ctx.lineTo(450, 135);
    ctx.stroke();
  };

  // Fungsi untuk mensimulasikan penerbitan pesan dari Publisher ke Router
  const publishMessage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Mengatur status simulasi menjadi berjalan
    setIsSimulationRunning(true);

    // Menggambar komponen sistem
    drawSystem(ctx);

    let messageX = 120; // Posisi awal pesan
    let messageY = 75;

    // Menganimasi pesan dari Publisher ke Router
    const animatePublisherToRouter = setInterval(() => {
      drawSystem(ctx);

      if (imagesLoaded) {
        // Menggambar gambar pesan
        ctx.drawImage(messageImg, messageX, messageY, 30, 30);
      }

      messageX += 5; // Memindahkan pesan ke kanan

      // Memeriksa apakah pesan telah sampai ke Router
      if (messageX >= 250) {
        clearInterval(animatePublisherToRouter); // Menghentikan animasi
        forwardToSubscribers(ctx); // Meneruskan pesan ke Subscribers
      }
    }, 30);
  };

  // Fungsi untuk meneruskan pesan ke Subscribers
  const forwardToSubscribers = (ctx) => {
    let messageX1 = 300; // Reset posisi ke Router untuk Subscriber 1
    let messageY1 = 75;

    // Posisi Subscriber 1
    const subscriber1Position = { x: 450, y: 55 };
    const angleToSubscriber1 = Math.atan2(
      subscriber1Position.y - messageY1,
      subscriber1Position.x - messageX1
    );

    const speed = 7; // Kecepatan pesan

    // Menganimasi pesan ke Subscriber 1
    const interval1 = setInterval(() => {
      drawSystem(ctx);

      if (imagesLoaded) {
        ctx.drawImage(messageImg, messageX1, messageY1, 30, 30);
      }

      messageX1 += speed * Math.cos(angleToSubscriber1);
      messageY1 += speed * Math.sin(angleToSubscriber1);

      // Memeriksa apakah pesan telah sampai ke Subscriber 1
      if (
        Math.abs(messageX1 - subscriber1Position.x) < 5 &&
        Math.abs(messageY1 - subscriber1Position.y) < 5
      ) {
        clearInterval(interval1); // Menghentikan animasi
        setReceivedMessages((prev) => [...prev, "Subscriber 1 menerima pesan"]);

        // Sekarang kirim pesan yang tersisa ke Subscriber 2
        let messageX2 = 300; // Reset posisi ke Router
        let messageY2 = 75;
        const subscriber2Position = { x: 450, y: 135 };
        const angleToSubscriber2 = Math.atan2(
          subscriber2Position.y - messageY2,
          subscriber2Position.x - messageX2
        );

        // Menganimasi pesan ke Subscriber 2
        const interval2 = setInterval(() => {
          drawSystem(ctx);

          if (imagesLoaded) {
            ctx.drawImage(messageImg, messageX2, messageY2, 30, 30);
          }

          messageX2 += speed * Math.cos(angleToSubscriber2);
          messageY2 += speed * Math.sin(angleToSubscriber2);

          // Memeriksa apakah pesan telah sampai ke Subscriber 2
          if (
            Math.abs(messageX2 - subscriber2Position.x) < 5 &&
            Math.abs(messageY2 - subscriber2Position.y) < 5
          ) {
            clearInterval(interval2); // Menghentikan animasi
            setReceivedMessages((prev) => [
              ...prev,
              "Subscriber 2 menerima pesan",
            ]);

            // Mengakhiri simulasi setelah pesan terkirim
            setIsSimulationRunning(false);
          }
        }, 50);
      }
    }, 50);
  };

  // Render canvas dan tombol
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
        Terbitkan Pesan
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
          <p>Belum ada pesan yang diterima.</p>
        )}
      </div>
    </div>
  );
}

export default PublishSubscribe;
