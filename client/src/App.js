import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PageRender from "./custom-router/page-render";
import AuthenticatedRouter from "./custom-router/authenticated-router";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";

import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./socket-client";

import { getNotifications } from "./redux/actions/notificationAction";

function App() {
  const { auth, status, modal } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifications(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <div className={`App ${(status || modal) && "mode"}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}

          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />

          <AuthenticatedRouter exact path="/:page" component={PageRender} />
          <AuthenticatedRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
