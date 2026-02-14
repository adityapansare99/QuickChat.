import React from "react";

const ImageViewer = ({ image, onClose, isDarkTheme }) => {
  if (!image) return null;

  const downloadImage = () => {
    fetch(image)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `image-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(err => console.error('Download failed:', err));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn overflow-auto"
      style={{
        background: isDarkTheme 
          ? 'rgba(0, 0, 0, 0.95)' 
          : 'rgba(0, 0, 0, 0.90)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
      onClick={onClose}
    >
      {/* Close Button - Top Left */}
      <button
        onClick={onClose}
        className={`absolute top-4 left-4 sm:top-6 sm:left-6 p-3 sm:p-3.5 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 z-10 group ${
          isDarkTheme
            ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            : "bg-white/90 hover:bg-white text-gray-900 shadow-lg"
        }`}
        aria-label="Close"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:rotate-90 duration-300"
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

      {/* Download Button - Bottom Center */}
      <button
        onClick={downloadImage}
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 z-10 flex items-center gap-2.5 sm:gap-3 group shadow-2xl ${
          isDarkTheme
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white backdrop-blur-md"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white"
        }`}
        aria-label="Download image"
      >
        <svg
          className="w-5 h-5 sm:w-5 sm:h-5 transition-transform group-hover:translate-y-0.5 duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span className="font-medium text-sm sm:text-base hidden xs:inline">Download</span>
        <span className="font-medium text-sm sm:text-base xs:hidden">Save</span>
      </button>

      {/* Image Container */}
      <div
        className="relative w-full min-h-full flex items-center justify-center p-4 sm:p-6 md:p-8 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-w-full">
          <img
            src={image}
            alt="Full view"
            className="w-auto h-auto max-w-full max-h-[calc(100vh-10rem)] sm:max-h-[calc(100vh-8rem)] object-contain rounded-lg sm:rounded-xl shadow-2xl transition-all duration-500"
            style={{
              animation: 'zoomIn 0.3s ease-out'
            }}
          />
          
          {/* Subtle border glow effect */}
          <div 
            className="absolute inset-0 rounded-lg sm:rounded-xl pointer-events-none"
            style={{
              background: isDarkTheme
                ? 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))'
                : 'linear-gradient(45deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
              filter: 'blur(20px)',
              transform: 'scale(1.02)'
            }}
          />
        </div>
      </div>

      {/* Optional: Loading skeleton could go here if needed */}
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        @media (max-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageViewer;