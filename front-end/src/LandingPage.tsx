import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/');
    setArray(response.data.users);
    console.log(response.data.users);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <select name="counties" id="counties">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      
    <div className="app-container">
      <div className="header-1">
        <h1>Header 1</h1>
      </div>
      <div className="header-2">
        <h1>Header 2</h1>
      </div>
      <div className="container-main">
        <div className="container-home">
          <h2>Home</h2>
          <p>Home content goes here</p>
        </div>
        <div className="container-map">
          <h2>Map</h2>
          <p>Map content goes here</p>
        </div>
      </div>
      <div className="api-response">
        <h2>Flask API Response:</h2>
        <p>{array.map((user, index) => (
          <span key={index}> {user} </span>
        ))}</p>
      </div>
      <p className="read-the-docs">
        Hi hi hi
      </p>
    </div>
  );
}

export default App;

