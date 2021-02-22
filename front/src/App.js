
import './App.css';
import {NavBar} from "./NavBar";
import axios from "axios";

// axios.defaults.baseURL = 'http://0.0.0.0:8000/api/v1';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

function App() {
  return (
    <div className="App">
        <NavBar/>
    </div>
  );
}

export default App;
