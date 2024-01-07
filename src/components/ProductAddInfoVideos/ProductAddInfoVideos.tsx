import { FC } from "react";
import style from "./ProductAddInfoVideos.module.css";

interface IProps {
  videos: IVideo[];
}

const getVideoId = (url: string): string => {
  // const match = url.match(/.*\/([^?]+)/);
  const match = url.match(/.*\/(.*)/);
  const result = match ? match[1] : "";
  return result;
};

const ProductAddInfoVideos: FC<IProps> = ({ videos }) => {
  return (
    <div className={style.wrapContent}>
      {videos.map((video, index) => {
        return (
          <div key={index} className={style.wrapVideo}>
            <iframe
              className={style.wrapVideo}
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${getVideoId(video.url)}`}
              title="YouTube video player"
              // frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductAddInfoVideos;
