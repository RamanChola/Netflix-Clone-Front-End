import "./featured.scss";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let unmounted = false;
    const getRandomContent = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/movies/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        if (!unmounted) {
          setContent(res.data[0]);
          setIsLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          console.error(error);
        }
      }
    };
    getRandomContent();
    return () => {
      unmounted = true;
    };
  }, [type]);

  return (
    <div className="featured">
      {isLoading && <LinearProgress color="secondary" />}
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="all">Genre</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Historical">Historical</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Western">Western</option>
            <option value="Animation">Animation</option>
            <option value="Drama">Drama</option>
            <option value="Documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <Link
            style={{ textDecoration: "none" }}
            to={{ pathname: "/watch", movie: content }}
          >
            <button className="play">
              <PlayArrowIcon />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
