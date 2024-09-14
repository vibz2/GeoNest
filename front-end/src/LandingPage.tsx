import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/");
    setArray(response.data.users);
    console.log(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // New function to handle select change
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="app-container">
        <div className="header-1">
          <h1>Header 1</h1>
        </div>
        <div className="header-2">
          <div className="select-wrapper">
            <select 
              name="counties" 
              id="counties" 
              onChange={handleSelectChange}
              value={selectedOption}
            >
              <option value="" disabled hidden>Choose an option: county, state</option>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>


          {/* Display the selected option */}
        </div>
        <div className="container-main">
          <div className="container-home">
            <h2>Home</h2>
            <p>Home content goes here</p>
            <div className="api-response">
              <h2>Flask API Response:</h2>
              <p>
                {array.map((user, index) => (
                  <span key={index}> {user} </span>
                ))}
              </p>
            </div>
            <p className="read-the-docs">Hi hi hi</p>
          </div>
          <div className="container-map">
            <h2>Map</h2>
            <p>Map content goes here</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
