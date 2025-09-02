import { useState } from "react";

// All your cards restored
const cards = [
  { label: "Google", url: "https://www.google.com" },
  { label: "YouTube", url: "https://www.youtube.com" },
  { label: "Reddit", url: "https://www.reddit.com" },
  { label: "Wikipedia", url: "https://www.wikipedia.org" },
  { label: "Twitter", url: "https://twitter.com" },
  { label: "Facebook", url: "https://www.facebook.com" },
  { label: "Twitch", url: "https://www.twitch.tv" },
  { label: "Discord", url: "https://discord.com" },
  { label: "GitHub", url: "https://github.com" },
  { label: "Stack Overflow", url: "https://stackoverflow.com" },
  { label: "LinkedIn", url: "https://www.linkedin.com" },
  { label: "Instagram", url: "https://www.instagram.com" },
  { label: "Netflix", url: "https://www.netflix.com" },
  { label: "Amazon", url: "https://www.amazon.com" },
  { label: "Spotify", url: "https://open.spotify.com" },
];

export default function Home() {
  const [iframeUrl, setIframeUrl] = useState(null);
  const [iframeTitle, setIframeTitle] = useState("");

  const loadIframe = (card) => {
    const proxied = `/api/proxy?url=${encodeURIComponent(card.url)}`;
    setIframeUrl(proxied);
    setIframeTitle(card.label);
  };

  const refreshIframe = () => {
    if (!iframeUrl) return;
    setIframeUrl(iframeUrl + "&_t=" + Date.now()); // bust cache
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="p-4 text-center text-2xl font-bold bg-gray-800 shadow-md">
        FlareLink
      </header>

      {/* Card Grid */}
      <main className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {cards.map((card, i) => (
          <button
            key={i}
            onClick={() => loadIframe(card)}
            className="bg-gray-700 hover:bg-gray-600 transition rounded-2xl p-6 shadow-lg flex flex-col items-center"
          >
            <img
              src={`https://www.google.com/s2/favicons?sz=64&domain=${new URL(
                card.url
              ).hostname}`}
              alt=""
              className="w-12 h-12 mb-3"
              loading="lazy"
            />
            <span className="text-lg font-medium">{card.label}</span>
          </button>
        ))}
      </main>

      {/* Iframe Viewer */}
      {iframeUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          {/* Iframe Header */}
          <div className="flex items-center justify-between bg-gray-800 p-2">
            <span className="ml-2 truncate">{iframeTitle}</span>
            <div className="flex gap-2">
              {/* Refresh */}
              <button
                onClick={refreshIframe}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 1 .908-.418A6 6 0 1 1 8 2v1z" />
                  <path d="M8 0a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 8 0z" />
                </svg>
              </button>
              {/* Close */}
              <button
                onClick={() => setIframeUrl(null)}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Iframe */}
          <iframe
            src={iframeUrl}
            className="flex-1"
            frameBorder="0"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
