import "./app.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom"

const App = () => {
  const user = true;
  return  (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to ="/Register" />}
        </Route>
        <Route path="/Register">
          {!user ? <Register /> : <Redirect to ="/" />}
        </Route>
        <Route path="/Login">
          {!user ? <Login /> : <Redirect to ="/" />}
        </Route>
          {user &&
            <>
              <Route path="/Watch">
                <Watch />
              </Route>
              <Route path="/Movie">
                <Home type="movie" />
              </Route>
              <Route path="/Series">
                <Home type="series" />
              </Route>
            </>
          }
      </Switch>
    </Router>
  );
};

export default App;
