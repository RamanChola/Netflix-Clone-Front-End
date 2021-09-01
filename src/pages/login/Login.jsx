import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext} from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";
import ErrorIcon from "@material-ui/icons/Error";

export default function Login() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const { dispatch, error } = useContext(AuthContext);
  const onSubmit = (data) => {
    login(data, dispatch);
  };
  return (
    <div className="login">
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
            <ErrorIcon color="secondary"/>
            <p className="error-message">Incorrect Email or Password </p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            required
          />
          <button className="loginButton">Sign In</button>
          <span>
            New to Netflix?
            <Link to="/register" style={{ textDecoration: "none" }}>
              <b>Sign up now.</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
