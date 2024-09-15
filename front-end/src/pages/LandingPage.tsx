import { useState, ChangeEvent } from "react";
import "../App.css";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../MapsPage";
import { FaExclamationCircle } from 'react-icons/fa';
import USLocations from "../data/USLocationsUser.json";
import tempHouses from "../data/tempHouses.json";
import axios from "axios";

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

// Define the type for location data
interface LocationData {
  city: string[];
  state: string[];
  county: string[];
}

interface ExclamationProps {
  onClick: () => void;
}

function Exclamation({ onClick }: ExclamationProps) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <FaExclamationCircle size={24} color="red" />
    </div>
  );
}

function App() {
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);      
  const locationData: LocationData = USLocations as LocationData;

  // State variables for selected options
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [result, setResult] = useState('');

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
    setSelectedCounty("");
    setSelectedCity("");
  };

  const handleCountyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCounty(event.target.value);
    setSelectedCity("");
  };
  
  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleHouseClick = (house: House) => {
    alert(`House clicked: ${house.address}`);
  };

  // const navigation = async () => {
  //   const url = `/api/data/?county=${selectedCounty}&city=${selectedCity}&state=${selectedState}`;
  //   fetch(url)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('An error occurred while fetching the data.');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log('Data received from backend:', data);
  //     // Handle the data received from the backend
  //   })
  //   .catch(error => console.error('Error fetching data:', error));
  // };

  const handleSubmit = async () => {
    if (selectedState && selectedCounty && selectedCity) {
      // Make an API call to Flask with state, county, city
      axios.post(`http://localhost:8080/api/data`, null, {
        params: {
          state: selectedState,
          county: selectedCounty,
          city: selectedCity,
        }
      })
        .then((response) => {
          console.log("Response data:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        axios.post(`http://localhost:8080/api/get_disaster_data`, null, {
          params: {
            state: selectedState,
            county: selectedCounty,
          }
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      alert("Please select state, county, and city.");
    }
  };

  const toggleInfoBox = (): void => {
    setIsInfoVisible(prev => !prev);
  };
          
  // Cast tempHouses to HousesData type
  const housesData: HousesData = tempHouses as HousesData;

  return (
    <>    
      {/* Add your input elements and other components here */}
      <button onClick={handleSubmit}>Search</button>
      <div className="app-container">
        <div className="header-1">
          <h1>Header 1</h1>
        </div>
        <div className="header-2">
          <div className="exclamation">
            <Exclamation onClick={toggleInfoBox} />
            {isInfoVisible && (
              <div className="info-box">
                <p>This is info box text.</p>
                <p>Result: {result}</p>
              </div>
            )}
          </div>
          <div className="select-wrapper">
            {/* State Dropdown */}
            <div className="select-container">
              <label htmlFor="states">State:</label>
              <select
                name="states"
                id="states"
                onChange={handleStateChange}
                value={selectedState}
              >
                <option value="" disabled hidden>
                  Choose a state
                </option>
                {locationData.state.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* County Dropdown (Full List) */}
            <div className="select-container">
              <label htmlFor="counties">County:</label>
              <select
                name="counties"
                id="counties"
                onChange={handleCountyChange}
                value={selectedCounty}
              >
                <option value="" disabled hidden>
                  Choose a county
                </option>
                {locationData.county.map((county, index) => (
                  <option key={index} value={county}>
                    {county}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="select-container">
              <label htmlFor="cities">City:</label>
              <select
                name="cities"
                id="cities"
                onChange={handleCityChange}
                value={selectedCity}
                disabled={!selectedCounty}
              >
                <option value="" disabled hidden>
                  Choose a city
                </option>
                {locationData.city.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="container-main">
          <div className="container-home">
            <h2>Home</h2>
            <p>Home content goes here</p>
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