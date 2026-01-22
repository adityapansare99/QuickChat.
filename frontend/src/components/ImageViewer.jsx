import React from "react";

const ImageViewer = ({ image, onClose, isDarkTheme }) => {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-200 ${
          isDarkTheme
            ? "bg-gray-800/80 hover:bg-gray-700 text-white"
            : "bg-white/80 hover:bg-white text-gray-900"
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        className="max-w-4xl max-h-[90vh] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt="Full view"
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ImageViewer;