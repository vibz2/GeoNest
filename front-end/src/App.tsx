import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import MapsPage from "./MapsPage";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          {/* <Route path="/display/:pokemonName" element = {<MapsPage />}>
      
    </Route> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
