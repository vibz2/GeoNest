import { useEffect, useState } from 'react';
import axios from 'axios'; // Import the axios library
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Papa from 'papaparse';
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
      <select name="counties" id="counties">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      
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

function CountySelect() {
  const [counties, setCounties] = useState<string[]>([]);

  useEffect(() => {
    // Path to your CSV file
    const csvFilePath = '/path/to/your/counties.csv';

    // Fetch the CSV file and parse it
    fetch(csvFilePath)
      .then(response => response.text())
      .then(data => {
        Papa.parse(data, {
          complete: (result) => {
            // Store the parsed CSV data in state
            const countyList = result.data.map((row: any) => row[0]); // Assuming each line has one county
            setCounties(countyList);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          }
        });
      });
  }, []);

  return (
    <div>
      <label htmlFor="counties">Select a County:</label>
      <select name="counties" id="counties">
        {counties.map((county, index) => (
          <option key={index} value={county}>
            {county}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;

