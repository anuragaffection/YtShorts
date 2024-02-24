import React, { useEffect, useState, useCallback } from "react";
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md'
import yt_shorts from './assets/yt_shorts.png';
import VideoPlayer from '../components/VideoPlayer.jsx'

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [videoData, setVideoData] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`https://pixabay.com/api/videos/?key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideoData(data.hits);
        const initialLikes = data.hits[currentVideoIndex].likes || 0;
        setLikeCount(initialLikes);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  // console.log(videoData);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
  };

  const handleTouchEnd = (event) => {
    if (touchStartY === null) return;
    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    const sensitivity = 50;
    if (deltaY > sensitivity) {
      handlePreviousVideo();
      event.preventDefault();
    } else if (deltaY < -sensitivity) {
      handleNextVideo();
    }
    setTouchStartY(null);
  };


  const handlePreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videoData.length - 1 : prevIndex - 1));
    setLikeCount(videoData[currentVideoIndex].likes);
    setLikeStatus(false)
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === videoData.length - 1 ? 0 : prevIndex + 1));
    setLikeCount(videoData[currentVideoIndex].likes)
    setLikeStatus(false)
  };


  const handleLike = useCallback(() => {
    setLikeStatus(prevState => !prevState);
    setLikeCount(prevLikeCount => prevLikeCount + (likeStatus ? -1 : 1));
  }, [likeStatus]);


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        gap: '1rem',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div>
        {
          videoData.length > 0 ? (
            <div style={{ position: 'relative' }}>
              <video
                key={videoData[currentVideoIndex].id}
                style={{
                  objectFit: 'cover',
                  backgroundColor: 'black',
                  borderRadius: '1rem',
                  width: '300px',
                  height : isMobile ? '90vh' : '75vh'
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
              <div
                style={{
                  position: 'absolute',
                  bottom: "5rem",
                  left: "0.25rem",
                  width: '90%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '3px',
                  fontWeight: 'bold',
                }}
              >
                <img
                  height={30}
                  width={30}
                  src={videoData[currentVideoIndex].userImageURL}
                  alt="userImage"
                  style={{
                    borderRadius: '50%'
                  }}
                />
                <div>{videoData[currentVideoIndex].user}</div>
              </div>
              <div
                onClick={() => handleLike()}
                style={{
                  position: 'absolute',
                  bottom: '5rem',
                  right: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}>
                <div>{likeStatus ? <AiFillLike /> : <AiOutlineLike />}</div>
                <div> {likeCount} </div>
              </div>
            </div>
          ) : <VideoPlayer />
        }
      </div>

      <div
        style={{
          display: isMobile ? 'none' : 'flex',
          justifyContent: 'space-around',
          padding: '1rem',
          width: '270px',
          borderRadius: '1rem',
          gap: '1rem',
          position: 'sticky',
          bottom: '1rem',
          backgroundColor: 'black',
          '@media (max-width: 768px)': {
            display: 'none'
          }
        }}
      >
        <button
          onClick={handlePreviousVideo}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          <MdArrowUpward />
          Previous
        </button>
        <img src={yt_shorts} alt="logo" height="30px" width="30px" />
        <button
          onClick={handleNextVideo}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            cursor : 'pointer'
          }}
        > <MdArrowDownward />
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
