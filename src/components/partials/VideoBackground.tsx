import React from 'react';
import video from '../../assets/video.mp4';
const VideoBackground = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoBackground;