import React, { useEffect, useState } from "react";
import yt_shorts from './assets/yt_shorts.jpg';

const apiKey = import.meta.env.VITE_API_KEY;


function App() {

  const [videoData, setVideoData] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`https://pixabay.com/api/videos/?key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideoData(data.hits.slice(0, 5));
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  console.log(videoData);


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
      marginTop: '1rem',
      gap: '1rem',
    }}>

      {
        videoData.length > 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '1rem',
            }}
          >
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
          </div>
        ) : null
      }

      <div style={{
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'sticky',
        bottom: '1rem',
        gap: '1rem'
      }}>
        <button onClick={handlePreviousVideo}> Previous </button>
        <img
          src={yt_shorts}
          alt="logo"
          height={"40px"}
          width={"40px"}
          style={{
            borderRadius: '10px'
          }}
        />
        <button onClick={handleNextVideo}>Next </button>
      </div>
    </div>
  );
}

export default App;