import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaCopy, FaArrowLeft, FaDownload } from "react-icons/fa";

export default function PopUp({ link, onClose }) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef();

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format) => {
    const canvas = qrRef.current.querySelector("canvas");
    const dataURL = canvas.toDataURL(`image/${format}`);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `qr-code.${format}`;
    link.click();
  };

  return (
    <>
      {!isQrModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-11/12 max-w-md relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">
              Link is ready! 🎉
            </h2>
            <div className="flex items-center justify-between border-4 border-black rounded-lg p-3 mb-6">
              <span className="text-gray-800 text-lg">{link}</span>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="bg-pink-300 text-black w-32 h-12 border-4 border-black rounded-lg font-semibold hover:bg-pink-400 flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                QR
              </button>
              <button
                onClick={handleCopy}
                className="bg-pink-300 text-black w-32 h-12 border-4 border-black rounded-lg font-semibold hover:bg-pink-400 flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <FaCopy />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isQrModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-11/12 max-w-md relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✖
            </button>
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 text-2xl flex items-center gap-2"
            >
              <FaArrowLeft />
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">
              Customize QR Code
            </h2>
            <div className="flex justify-center mb-6" ref={qrRef}>
              <QRCodeCanvas
                value={link}
                size={150}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                includeMargin={true}
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => handleDownload("png")}
                  className="bg-pink-300 text-black w-32 h-12 border-4 border-black rounded-lg font-semibold hover:bg-pink-400 flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <FaDownload />
                  PNG
                </button>
                <button
                  onClick={() => handleDownload("svg")}
                  className="bg-pink-300 text-black w-32 h-12 border-4 border-black rounded-lg font-semibold hover:bg-pink-400 flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <FaDownload />
                  SVG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
