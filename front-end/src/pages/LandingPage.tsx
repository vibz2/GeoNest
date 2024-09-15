import React, { useState, ChangeEvent } from "react";
import "../App.css";
import { FaExclamationCircle } from "react-icons/fa";
import USLocations from "../data/USLocationsUser.json";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// Define the type for location data
interface LocationData {
  city: string[];
  state: string[];
  county: string[];
}

// Define the type for the house data returned from the API
interface House {
  streetAddress: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  lotAreaValue: number;
  longitude: number;
  latitude: number;
  imgSrc: string;
}

// Define the type for the API response
interface ApiResponse {
  results: House[];
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

function LandingPage() {
  const navigate = useNavigate();

  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSubmit = async () => {
    if (selectedState && selectedCounty && selectedCity) {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post<ApiResponse>(
          "http://localhost:8080/api/data",
          null,
          {
            params: {
              state: selectedState,
              county: selectedCounty,
              city: selectedCity,
            },
          }
        );

        const houses = response.data.results; // Now correctly typed as House[]

        navigate('/results', { 
          state: { 
            houses, 
            state: selectedState, 
            county: selectedCounty, 
            city: selectedCity 
          } 
        });
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

  return (
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
        </div>
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default LandingPage;
