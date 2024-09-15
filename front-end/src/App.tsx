import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapsPage from "./MapsPage";
import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/:county/:city/:state" element = {<MapsPage />}>

          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
