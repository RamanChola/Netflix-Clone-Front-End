import "./listItem.scss";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlined from "@material-ui/icons/ThumbDownAltOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let unmounted = false;
    const getMovie = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/movies/find/${item}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        if (!unmounted) {
          setLoading(false);
          setMovie(res.data);
        }
      } catch (error) {
        if (!unmounted) {
          console.error(error);
        }
      }
    };
    getMovie();
    return () => {
      unmounted = true;
    };
  }, [item]);

  return (
    !loading && (
      <Link
        style={{ textDecoration: "none" }}
        to={{ pathname: "/watch", movie: movie }}
      >
        <div
          className="listItem"
          style={{ left: isHovered && index * 225 - 50 + index * 5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={movie?.imgSm} alt="" />

          {isHovered && (
            <>
              <video src={movie.trailer} autoPlay={true} loop />
              <div className="itemInfo">
                <div className="icons">
                  <PlayArrowIcon className="icon" />
                  <AddIcon className="icon" />
                  <ThumbUpAltOutlined className="icon" />
                  <ThumbDownAltOutlined className="icon" />
                </div>
                <div className="itemInfoTop">
                  <span>{movie.duration}</span>
                  <span className="limit">+{movie.limit}</span>
                  <span>{movie.year}</span>
                </div>
                <div className="desc">{movie.desc}</div>
                <div className="genre">{movie.genre}</div>
              </div>
            </>
          )}
        </div>
      </Link>
    )
  );
}
