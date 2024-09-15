import { useState, ChangeEvent } from "react";
import "../App.css";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../MapsPage";
import { FaExclamationCircle, FaTimes } from 'react-icons/fa'; // Import FaTimes for "X" icon
import USLocations from "../data/USLocationsUser.json";
import tempHouses from "../data/tempHouses.json";
import naturalDisasters from "../data/natural_disasters.json";

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

// Define the type for natural disasters data
interface PreventiveMeasures {
  id: number;
  name: string;
  preventive_measures: string[];
}

interface NaturalDisastersData {
  disasters: PreventiveMeasures[];
}

interface ExclamationProps {
  onClick?: () => void; // Make onClick optional
  color: string;
  isInfoVisible: boolean; // Add isInfoVisible to props
}

function Exclamation({ onClick, color, isInfoVisible }: ExclamationProps) {
  // Check if color is gray to conditionally disable onClick
  const Icon = isInfoVisible ? FaTimes : FaExclamationCircle; // Conditionally set icon
  return (
    <div
      onClick={color !== "gray" ? onClick : undefined} // Disable onClick if color is gray
      style={{ cursor: color !== "gray" ? 'pointer' : 'default' }}
    >
      <Icon size={24} color={color} />
    </div>
  );
}

function App() {
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const [exclamationColor, setExclamationColor] = useState<string>("gray"); // Color state for exclamation point
  const [popupContent, setPopupContent] = useState<string>("");

  const locationData: LocationData = USLocations as LocationData;
  const housesData: HousesData = tempHouses as HousesData;
  const disastersData: NaturalDisastersData = naturalDisasters as NaturalDisastersData;

  // State variables for selected options
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

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

  // Randomize disasters and select a few
  const getRandomDisasters = () => {
    const numDisasters = Math.floor(Math.random() * 3) + 1; // Random number of disasters to show (1-3)
    const shuffled = disastersData.disasters.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numDisasters);
  };

  const handleHouseClick = (house: House) => {
    console.log(`House clicked: ${house.address}`);
    setExclamationColor(prevColor => (prevColor === "gray" ? "red" : "gray"));

    // Generate random disasters and format the popup content
    const selectedDisasters = getRandomDisasters();
    const disasterInfo = selectedDisasters.map(disaster => `
      <h3>${disaster.name}</h3>
      <ul>${disaster.preventive_measures.map(measure => `<li>${measure}</li>`).join('')}</ul>
    `).join('<hr/>');

    setPopupContent(disasterInfo);
    setIsInfoVisible(true);
  };

  const toggleInfoBox = (): void => {
    setIsInfoVisible(prev => !prev);
    // No need to toggle color here
  };

  return (
    <>
      <div className="app-container">
        <div className="header-1">
          <h1>GeoNest</h1>
        </div>
        <div className="header-2">
          <div className="exclamation">
            <Exclamation onClick={toggleInfoBox} color={exclamationColor} isInfoVisible={isInfoVisible} />
            {isInfoVisible && (
              <div className="info-box" dangerouslySetInnerHTML={{ __html: popupContent }} />
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

            {/* County Dropdown */}
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
