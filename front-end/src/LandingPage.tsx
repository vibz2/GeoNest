import { useEffect, useState } from 'react';
import axios from 'axios'; // Import the axios library
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

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

  return (
    <>
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
