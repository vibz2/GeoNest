
import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios'; // Import the axios library
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from './MapsPage';
import countiesData from "./uscounties.json"; // Import the JSON data


const render = (status: Status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};






function App() {
  const [array, setArray] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      setArray(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
    }, []);
    
      // New function to handle select change
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
    
//note render={render} was right after the api key below in case of any future errors letting u know

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
              {countiesData.location.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>


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
              <div className="App">
              <Wrapper apiKey={'AIzaSyBmhp7l4zjV_ILnIoZPEUcXFlGkBycSo2Y'}> 
               <MapComponent />
              </Wrapper>
            </div>
            <h2>Map</h2>
            <p>Map content goes here</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
