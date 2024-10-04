import React, { useRef, useState, useEffect } from "react";
import client from "../images/client.png"; // Mengimpor gambar klien
import internet from "../images/internet.png"; // Mengimpor gambar internet
import server from "../images/server.png"; // Mengimpor gambar server

/**
 * Komponen RequestResponse
 *
 * Komponen ini mensimulasikan model komunikasi Request-Response dalam sistem terdistribusi.
 * Dalam simulasi ini, pengguna dapat mengirimkan permintaan dari klien ke server
 * melalui internet dan menerima respons dari server.
 *
 * Fitur utama:
 * - Menggambar elemen visual (klien, server, internet) pada canvas.
 * - Menampilkan proses pengiriman permintaan dan penerimaan respons dengan animasi.
 * - Menghitung dan menampilkan waktu respons.
 *
 * Props:
 * - setIsSimulationRunning: Fungsi untuk mengubah status simulasi (berjalan/berhenti).
 */

function RequestResponse({ setIsSimulationRunning }) {
  const canvasRef = useRef(null); // Referensi ke elemen canvas
  const [responseTime, setResponseTime] = useState(null); // State untuk menyimpan waktu respons
  const [imageLoaded, setImageLoaded] = useState(false); // State untuk mengecek apakah gambar telah dimuat

  // Membuat objek gambar untuk klien, server, dan internet
  const clientImage = new Image();
  const serverImage = new Image();
  const internetImage = new Image();

  // Mengatur sumber gambar
  clientImage.src = client;
  serverImage.src = server;
  internetImage.src = internet;

  useEffect(() => {
    // Mengatur event onload untuk memastikan gambar telah dimuat sebelum digambar di canvas
    clientImage.onload = () => setImageLoaded(true);
    serverImage.onload = () => setImageLoaded(true);
    internetImage.onload = () => setImageLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fungsi untuk menggambar elemen klien, server, dan internet di canvas.
   * @param {CanvasRenderingContext2D} ctx - Konteks canvas untuk menggambar.
   */
  const drawClientServerInternet = (ctx) => {
    // Menghapus isi canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (imageLoaded) {
      // Menggambar gambar klien, server, dan internet
      ctx.drawImage(clientImage, 50, 80, 100, 50);
      ctx.drawImage(internetImage, 200, 60, 80, 80);
      ctx.drawImage(serverImage, 350, 80, 100, 50);
    } else {
      // Menampilkan teks jika gambar masih dalam proses pemuatan
      ctx.fillStyle = "black";
      ctx.font = "bold 16px Arial";
      ctx.fillText("Loading images...", 180, 100);
    }

    // Menggambar garis antara klien dan server
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 105);
    ctx.lineTo(200, 105);
    ctx.stroke();
    ctx.moveTo(280, 105);
    ctx.lineTo(350, 105);
    ctx.stroke();

    // Menggambar panah untuk menunjukkan arah komunikasi
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

  /**
   * Fungsi untuk mengirim permintaan dari klien ke server.
   * Mengaktifkan simulasi, menggambar elemen, dan menghitung waktu respons.
   */
  const sendRequest = () => {
    setIsSimulationRunning(true); // Menandai simulasi sedang berjalan
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus canvas sebelum menggambar

    drawClientServerInternet(ctx); // Menggambar elemen klien, server, dan internet

    const startTime = new Date().getTime(); // Menandai waktu mulai pengiriman
    ctx.fillStyle = "#0000ff";
    ctx.font = "16px Arial";
    ctx.fillText("Sending request...", 10, 30); // Menampilkan status pengiriman

    let requestX = 150; // Posisi horizontal awal untuk permintaan
    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, 60); // Menghapus area status
      ctx.fillStyle = "#0000ff";
      ctx.font = "16px Arial";
      ctx.fillText("Sending request...", 10, 30); // Menampilkan status pengiriman

      drawClientServerInternet(ctx); // Menggambar elemen

      ctx.fillStyle = "blue"; // Menggambar permintaan
      ctx.fillRect(requestX, 100, 20, 10);
      requestX += 5; // Memindahkan posisi permintaan ke kanan

      if (requestX >= 350) {
        // Jika permintaan mencapai server
        clearInterval(interval); // Menghentikan interval pengiriman

        setTimeout(() => {
          const endTime = new Date().getTime(); // Menandai waktu akhir
          const delay = (endTime - startTime) / 1000; // Menghitung waktu respons
          setResponseTime(delay); // Mengatur waktu respons

          let responseX = 350; // Posisi horizontal awal untuk respons
          const responseInterval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, 60); // Menghapus area status
            ctx.fillStyle = "#008000";
            ctx.font = "16px Arial";
            ctx.fillText("Response received!", 10, 30); // Menampilkan status respons diterima

            drawClientServerInternet(ctx); // Menggambar elemen

            ctx.fillStyle = "green"; // Menggambar respons
            ctx.fillRect(responseX, 100, 20, 10);
            responseX -= 5; // Memindahkan posisi respons ke kiri

            if (responseX <= 150) {
              // Jika respons kembali ke klien
              clearInterval(responseInterval); // Menghentikan interval respons
            }
          }, 30);
        }, 2000); // Delay sebelum respons diterima
      }
    }, 30); // Interval pengiriman permintaan
    setTimeout(() => {
      setResponseTime(2.5); // Contoh waktu respons
      setIsSimulationRunning(false); // Menandai simulasi tidak berjalan
    }, 3000); // Menentukan waktu total simulasi
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
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
