import QRCode from "react-qr-code";

function QRPage() {
  const url = "http://localhost:5173";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      
      <h1 className="text-2xl font-semibold">
        Escaneá el QR
      </h1>

      <div className="bg-white p-4 rounded">
        <QRCode value={url} size={200} />
      </div>

      <p className="text-gray-600">
        Este QR lleva a la página principal
      </p>

    </div>
  );
}

export default QRPage;