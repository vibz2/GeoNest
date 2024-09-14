import { useState, ChangeEvent } from "react";
// import axios from "axios";
import "../App.css";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../MapsPage";
import countiesData from "../data/uscounties.json";
import tempHouses from "../data/tempHouses.json";
import { useNavigate } from "react-router-dom";

// Define the type for house data
interface House {
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
}

interface HousesData {
  houses: House[];
}

function App() {
  // const [array, setArray] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [county, setInputValue] = useState("");
  const [city, setInputValue2] = useState("");
  const [state, setInputValue3] = useState("");

  // const fetchAPI = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/");
  //     setArray(response.data.users);
  //     console.log(response.data.users);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  // New function to handle select change (user import)
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  
  // Function to handle house card click
  const handleHouseClick = (house: House) => {
    alert(`House clicked: ${house.address}`);
  };

  const handleHouseClick = (house: House) => {
    Navigation("/" + county + "/" + city + "/" + state);
  };

  // Cast tempHouses to HousesData type
  const housesData: HousesData = tempHouses as HousesData;

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
              <option value="" disabled hidden>
                Choose an option: county, state
              </option>
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
            {/* <div className="api-response">
              <h2>Flask API Response:</h2>
              <p>
                {array.map((user, index) => (
                  <span key={index}> {user} </span>
                ))}
              </p>
            </div>
            <p className="read-the-docs">Hi hi hi</p> */}
            <div className="houses-list">
              {housesData.houses.map((house, index) => (
                <div
                  key={index}
                  className="house-card"
                  onClick={() => handleHouseClick(house)}
                >
                  <p className="homeText"><strong>Address:</strong> {house.address}</p>
                  <p className="homeText"><strong>Price:</strong> ${house.price.toLocaleString()}</p>
                  <p className="homeText"><strong>Bedrooms:</strong> {house.bedrooms}</p>
                  <p className="homeText"><strong>Bathrooms:</strong> {house.bathrooms}</p>
                  <p className="homeText"><strong>Square Feet:</strong> {house.square_feet.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="container-map">
            <div className="App">
              <Wrapper apiKey={"AIzaSyBmhp7l4zjV_ILnIoZPEUcXFlGkBycSo2Y"}>
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
