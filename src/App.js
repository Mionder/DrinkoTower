import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route } from "react-router-dom";
import StartMenu from "./Components/StartMenu";
import Preloader from "./Components/Preloader";
import ErrorPage from "./Components/ErrorPage";

function App() {
    if(window.location.href !== window.location.origin + "/" && window.location.href !== window.location.origin + "/404"){
        window.location.href = window.location.origin + "/404";
    }
  return (
      <Router>
          <div className="App">
              <Preloader />
              <Route path="/" exact component={StartMenu} />
              <Route path="/404" exact component={ErrorPage}/>
          </div>
      </Router>

  );
}

export default App;
