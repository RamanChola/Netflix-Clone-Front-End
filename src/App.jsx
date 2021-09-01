import React, { Suspense } from "react";
import "./app.scss";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import Login from "./pages/login/Login";
import { LinearProgress } from "@material-ui/core";
const Home = React.lazy(() => import("./pages/home/Home"));
const Watch = React.lazy(() => import("./pages/watch/Watch"));

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Suspense
        fallback={
          <div>
            <LinearProgress color="secondary" />
          </div>
        }
      >
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/register" />}
          </Route>
          <Route path="/register">
            {!user ? <Register /> : <Redirect to="/" />}
          </Route>
          <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
          {user && (
            <Switch>
              <Route path="/movies">
                <Home type="movie" />
              </Route>
              <Route path="/series">
                <Home type="series" />
              </Route>
              <Route path="/watch">
                <Watch />
              </Route>
            </Switch>
          )}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
