import React from "react";
import yt_shorts from './assets/yt_shorts.jpg';

function App() {
  return (
    <>
      <div style={{
        height: "95vh",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
        gap: '1rem',
      }}>

        <div style={{
          position: 'relative',
          width: '300px',
          height: '480px',
          paddingTop: '1rem',
        }}>
          <video
          
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              backgroundColor: 'black',
              borderRadius: '1rem'
            }}
            autoPlay
            loop
            disablePictureInPicture
            controls
            controlsList="nodownload nofullscreen noduration noplaybackrate novolume"
          >
            <source
              src="https://media.geeksforgeeks.org/wp-content/uploads/20231020155223/Full-Stack-Development-_-LIVE-Classes-_-GeeksforGeeks.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div style={{
          position: 'sticky',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img
            src={yt_shorts}
            alt="logo"
            height={"40px"}
            width={"40px"}
          />
        </div>

      </div>
    </>
  );
}

export default App;
