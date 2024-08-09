import "./App.css";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { useState, useEffect } from "react";

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = () => {
    let elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }

    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }

    setIsFullscreen(false);
  };

  useEffect(() => {
    const iframe = document.getElementById('wallsio-iframe');
    iframe.onload = function() {
      const iframeDoc = iframe.contentWindow.document;

      const elementsToHide = [
        '.wall-notification-trial-background',
        '.wall-notification-trial',
        '.wall-notification',
        '.wall-notification-default',
        '.wall-notification-trial-title',
        '.wall-notification-text'
      ];

      elementsToHide.forEach(selector => {
        const elements = iframeDoc.querySelectorAll(selector);
        elements.forEach(element => {
          element.style.display = 'none';
        });
      });
    };
  }, []);

  return (
    <>
      <main className="h-screen text-center w-full bg-white">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col text-center items-center gap-2 w-1/2">
            <img src="/CCGLogo.svg" alt="CCG" className="px-16 mb-6" />
            <p className="text-xl py-4">Join us live for the event</p>
            <p className="text-medium w-[200px] font-semibold">#CCDGN24 #CloudCommunityDay</p>
            <div className="absolute bottom-0 left-0 flex flex-col gap-2 p-4">
              {isFullscreen ? (
                <button onClick={closeFullscreen}>
                  <AiOutlineFullscreenExit className="h-8 w-8" />
                </button>
              ) : (
                <button onClick={openFullscreen}>
                  <AiOutlineFullscreen className="h-8 w-8" />
                </button>
              )}
            </div>
          </div>
          <div className="w-full h-full">
            <iframe
              allowFullScreen
              id="wallsio-iframe"
              src="https://my.walls.io/s3dg3?nobackground=1&show_header=0&show_post_info=1&accessibility=0"
              style={{ border: "0", height: "100vh", width: "100%", overflow: "hidden" }}
              loading="lazy"
              title="CCDGN 2024 Social Wall"
            ></iframe>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
