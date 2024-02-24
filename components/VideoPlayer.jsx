import React from 'react'

function VideoPlayer() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '1rem',
            }}
        >
            <video
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
                    src="https://cdn.pixabay.com/vimeo/907576442/beach-198488.mp4?width=640&hash=1a05fbcbd7da4c2cca961b36d5228b1cdc837e26"
                    type="video/mp4"
                />
            </video>
        </div>
    )
}

export default VideoPlayer