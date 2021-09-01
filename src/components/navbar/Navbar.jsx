import React, { useContext, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link, useHistory } from "react-router-dom";
import "./navbar.scss";
import { useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  let history = useHistory();
  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    return () => {
      setIsScrolled({});
      window.onscroll = null;
    };
  }, []);

  const HandleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch(logout());
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
          <Link to="" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>

        <div className="right">
          <SearchIcon className="icon" />
          <span>KID</span>
          <NotificationsIcon className="icon" />
          <img
            className="account-image"
            src="https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
          />
          <div className="profile">
            <ArrowDropDownIcon className="icon exception" />
            <div className="options">
              <span>Settings</span>
              <span onClick={HandleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
