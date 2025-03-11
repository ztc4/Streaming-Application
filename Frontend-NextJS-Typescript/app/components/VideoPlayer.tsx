"use client"

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
    videoSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoSrc);
                hls.attachMedia(videoRef.current);
            } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
                videoRef.current.src = videoSrc;
            }
        }
    }, [videoSrc]);

    return <video ref={videoRef} controls style={{ width: "100%" }} />;
};

export default VideoPlayer;

