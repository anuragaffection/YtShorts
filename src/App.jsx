import React, { useEffect, useState } from "react";
import yt_shorts from './assets/yt_shorts.jpg';
import VideoPlayer from '../components/VideoPlayer.jsx'

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [videoData, setVideoData] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`https://pixabay.com/api/videos/?key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideoData(data.hits);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
  };

  const handleTouchEnd = (event) => {
    if (touchStartY === null) return; // Ignore if touchStartY is not set

    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    const sensitivity = 50; // Adjust this value according to sensitivity

    if (deltaY > sensitivity) {
      // Swipe down
      handlePreviousVideo();
    } else if (deltaY < -sensitivity) {
      // Swipe up
      handleNextVideo();
    }

    // Reset touchStartY
    setTouchStartY(null);
  };

  const handlePreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videoData.length - 1 : prevIndex - 1));
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === videoData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      gap: '1rem',
    }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

      <div>
        {
          videoData.length > 0 ? (
            <video
              key={videoData[currentVideoIndex].id}
              style={{
                objectFit: 'cover',
                backgroundColor: 'black',
                borderRadius: '1rem',
                width: '300px',
                height: '480px',
              }}
              autoPlay
              loop
              disablePictureInPicture
              controls
              preload="auto"
              controlsList="nodownload nofullscreen noduration noplaybackrate novolume"
            >
              <source
                src={videoData[currentVideoIndex].videos.medium.url}
                type="video/mp4"
              />
            </video>

          ) : <VideoPlayer />
        }
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1rem',
        width: '270px',
        borderRadius: '1rem',
        gap: '1rem',
        position: 'sticky',
        bottom: '1rem',
        backgroundColor: 'black'
      }}>
        <button onClick={handlePreviousVideo}>Previous</button>
        <img src={yt_shorts} alt="logo" height="30px" width="30px" style={{ borderRadius: '7px' }} />
        <button onClick={handleNextVideo}>Next</button>
      </div>
    </div>
  );
}

export default App;
