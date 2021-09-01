import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import "./register.scss";

export default function Register() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, { email, ...data });
      history.push("/login");
    } catch (err) {
      setError(err);
    }
  };
  const [email, setEmail] = useState("");
  const history = useHistory();
  const emailRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>

      <div className="container">
        {error && (
          <div className="error">
            <p className="error-message">user registeration failed </p>
            <IconButton
              color="secondary"
              aria-label="CancelIcon"
              onClick={() => setError(null)}
            >
              <CancelIcon />
            </IconButton>
          </div>
        )}
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <Link to="/login">
          <button
            style={{
              position: "absolute",
              top: "18px",
              right: "22px",
              backgroundColor: "red",
              border: "none",
              color: "white",
              borderRadius: "5px",
              padding: "5px 15px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </Link>
        {!email ? (
          <form
            className="input"
            onSubmit={(e) => {
              e.preventDefault();
              handleStart();
              emailRef.current.value = "";
            }}
          >
            <input
              type="email"
              placeholder="email address"
              ref={emailRef}
              required
            />
            <button className="registerButton">Get Started</button>
          </form>
        ) : (
          <form className="input" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="username"
              {...register("username", { required: true })}
              required
            />
            <input
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
              required
            />
            <button className="registerButton" type="submit">
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
