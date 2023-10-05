"use client";
import { FC } from "react";
// import YouTube, { YouTubeProps } from "react-youtube";
import style from "./ProductAddInfoVideos.module.css";

interface IProps {
  videos: IVideo[];
}

const getVideoId = (url: string): string => {
  const match = url.match(/.*\/([^?]+)/);
  const result = match ? match[1] : "";
  return result;
};

const ProductAddInfoVideos: FC<IProps> = ({ videos }) => {
  // const opts = {
  //   height: "460",
  //   width: "818",
  // };

  // const onPlayerReady: YouTubeProps["onReady"] = (event) => {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // };

  return (
    <div className={style.wrapContent}>
      {videos.map((video, index) => {
        return (
          <div key={index}>
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${getVideoId(video.url)}`}
              // frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        );
      })}
    </div>
  );
};

// <YouTube
//   key={index}
//   videoId={getVideoId(video.url)}
//   // videoId="SUrLrFYFo6Q"
//   opts={opts}
//   onReady={onPlayerReady}
// />
export default ProductAddInfoVideos;
