import { useEffect, useState } from 'react';
import axios from 'axios'; // Import the axios library
import './App.css';

function App() {
  // State for the count button
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
      <h1>Vite + React + Flask</h1>

      <h2>Flask API Response:</h2>
      <p>{array.map((user, index) => (
        <span key={index}> {user} </span>
      ))}</p>
      
      <p className="read-the-docs">
        Hi hi hi
      </p>
    </>
  );
}

export default App;
