import { Route } from "react-router-dom";

const AuthenticatedRouter = (props) => {
  const firstLogin = localStorage.getItem("firstLogin");
  return firstLogin ? <Route {...props} /> : null;
};

export default AuthenticatedRouter;
