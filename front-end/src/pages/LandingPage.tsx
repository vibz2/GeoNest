import { useState, ChangeEvent } from "react"; //UseEffect
import "../App.css";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../MapsPage";
import { FaExclamationCircle } from "react-icons/fa";
import USLocations from "../data/USLocationsUser.json";
import axios from "axios";

// Define the type for house data
interface House {
  streetAddress: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  lotAreaValue: number;
  longitude: number;
  latitude: number;
  imgSrc: string; // Assuming imgSrc comes from the API
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
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <FaExclamationCircle size={24} color="red" />
    </div>
  );
}

function App() {
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [houses, setHouses] = useState<House[]>([]);
  const [error, setError] = useState<string | null>(null); // Error state
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const locationData: LocationData = USLocations as LocationData;

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
    alert(`House clicked: ${house.streetAddress}`);
  };

  const handleSubmit = async () => {
    if (selectedState && selectedCounty && selectedCity) {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `http://localhost:8080/api/data`,
          null,
          {
            params: {
              state: selectedState,
              county: selectedCounty,
              city: selectedCity,
            },
          }
        );
        const tempHouses: House[] = [];
        for (let i = 0; i < response.data.results.length; i++) {
          const cHouse: House = {
            streetAddress: response.data.results[i].streetAddress,
            price: response.data.results[i].price,
            bedrooms: response.data.results[i].bedrooms,
            bathrooms: response.data.results[i].bathrooms,
            lotAreaValue: response.data.results[i].lotAreaValue,
            longitude: response.data.results[i].longitude,
            latitude: response.data.results[i].latitude,
            imgSrc: response.data.results[i].imgSrc,
          };
          // console.log("House:", cHouse);
          tempHouses.push(cHouse);
        }
        // console.log("Temp Houses:", tempHouses);
        setHouses(tempHouses);
        // console.log("Houses:", houses);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch houses. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select state, county, and city.");
    }
  };

  const toggleInfoBox = (): void => {
    setIsInfoVisible((prev) => !prev);
  };

  // useEffect(() => {
  //   console.log("Houses state:", houses);
  // }, [houses]);

  return (
    <>
      <button onClick={handleSubmit}>Search</button>
      <div className="app-container">
        <div className="header-1">
          <h1>GeoNest</h1>
        </div>
        <div className="header-2">
          <div className="exclamation">
            <Exclamation onClick={toggleInfoBox} />
            {isInfoVisible && (
              <div className="info-box">
                <p>This is info box text.</p>
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
            <div className="search">
            <button className="button" onClick={handleSubmit}>Search</button>
            </div>
          </div>
        </div>

        <div className="container-main">
          <div className="container-home">
            <div className="houses-list">
              {loading && <p>Loading...</p>}
              {error && <p className="error-message">{error}</p>}
              {houses.length === 0 && !loading && !error && (
                <p>No houses available for the selected criteria.</p>
              )}
              {houses.map((house, index) => (
                <div
                  key={index}
                  className="house-card"
                  onClick={() => handleHouseClick(house)}
                >
                  <p className="homeText">
                    <strong>Address:</strong> {house.streetAddress || "N/A"}
                  </p>
                  <p className="homeText">
                    <strong>Price:</strong> ${house.price.toLocaleString() || "N/A"}
                  </p>
                  <p className="homeText">
                    <strong>Bedrooms:</strong> {house.bedrooms || "N/A"}
                  </p>
                  <p className="homeText">
                    <strong>Bathrooms:</strong> {house.bathrooms || "N/A"}
                  </p>
                  <p className="homeText">
                    <strong>Lot Area:</strong>
                    {house.lotAreaValue.toLocaleString() || "N/A"}
                  </p>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
