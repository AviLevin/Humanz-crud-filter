import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Users from "./components/Users/Users";
import About from "./components/About/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <Users />
          </Route>


       

          <Route path="/About">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;