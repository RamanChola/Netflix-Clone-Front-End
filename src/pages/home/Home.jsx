import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./home.scss";
import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let unmounted = false;
    const getRandomLists = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/lists${type ? `?type=${type}` : ""}${
            genre ? `&&genre=${genre}` : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        if (!unmounted) {
          setLists(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          console.error(error);
        }
      }
    };
    getRandomLists();
    return () => {
      unmounted = true;
    };
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};

export default Home;
