import React from 'react';
import { useLocation } from 'react-router-dom';
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../MapsPage";
import "../App.css";

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

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const { houses, state, county, city } = location.state as { 
    houses: House[], 
    state: string, 
    county: string, 
    city: string 
  };

  const handleHouseClick = (house: House) => {
    alert(`House clicked: ${house.streetAddress}`);
  };

  return (
    <div className="app-container">
      <div className="header-1">
        <h1>GeoNest Results</h1>
      </div>
      <div className="header-2">
        <h2>{`${city}, ${county}, ${state}`}</h2>
      </div>
      <div className="container-main">
        <div className="container-home">
          <div className="houses-list">
            {houses.length === 0 ? (
              <p>No houses available for the selected criteria.</p>
            ) : (
              houses.map((house, index) => (
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
                    <strong>Lot Area:</strong> {house.lotAreaValue.toLocaleString() || "N/A"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="container-map">
          <div className="App">
            <Wrapper apiKey={"YOUR_GOOGLE_MAPS_API_KEY"}>
              <MapComponent />
            </Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;