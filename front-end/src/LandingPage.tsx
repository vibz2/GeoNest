import { useEffect, useState } from 'react';
import axios from 'axios'; // Import the axios library
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from './MapsPage';


const render = (status: Status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};


function App() {
  // State for the count button
  const [count, setCount] = useState(0);
  const [array , setArray] = useState([]);
  
  // State to store the message from the Flask API
  // const [message, setMessage] = useState('');

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/');
    setArray(response.data.users);
    console.log(response.data.users);

  }

  useEffect(() => {
    fetchAPI();
  } , []);
//note render={render} was right after the api key below in case of any future errors letting u know
  return (
    <>
      <div className="App">
        <Wrapper apiKey={'AIzaSyBmhp7l4zjV_ILnIoZPEUcXFlGkBycSo2Y'}> 
          <MapComponent />
        </Wrapper>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>Vite + React + Flask</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR.
        </p>
      </div>

      <h2>Flask API Response:</h2>
      <p>{array.map((user, index) => (
        <span key={index}> {user} </span>
      ))}</p>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more.
      </p>
    </>
  );
}

export default App;
