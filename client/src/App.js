import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState, createContext } from 'react';
import HomePage from "./pages/HomePage";
import SportWomanPage from "./pages/sendsPages/SportWomanPage";
import SportManPage from "./pages/sendsPages/SportManPage";
import BoulderWomanPage from "./pages/sendsPages/BoulderWomanPage";
import BoulderManPage from "./pages/sendsPages/BoulderManPage";
import { populateFAQdata } from "./FAQdata/populateFAQdata.js";

// Create context for FAQ data
export const FAQcontext = createContext();

function App() {
  // Initial state setup for backend data, FAQ data and loading state
  const [backendData, setBackendData] = useState([]);
  const [FAQdata, setFAQdata] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch backend data when component mounts
  /*use the right fetch depending on local or remote server*/
  useEffect(() => {
    fetch('https://hardestclimbs-server.vercel.app/api')
      //fetch('/api')
      .then(res => res.json())
      .then((data) => {
        // Set backend data and FAQ data after it's fetched
        // 'data' is all the data used in the app. It's a populated array of the object Sends (mongoose). Model can be found in the folder 'models' in the server side code
        setBackendData(data);

        // FAQ data is contained in the backend data, it requires some basic fetching and calculations done in the folder 'FAQdata'
        setFAQdata(populateFAQdata(data));
        // Set loading to false after the data is fetched
        setLoading(false);
      });
  }, []);

  // Return empty div when data is being fetched
  if (loading) {
    return <div className={'loading'}>
      <p>Using a free server..</p>
      <p>..takes a moment to Load :)</p>
    </div>;
  }

  // Return Routes wrapped in FAQcontext provider when data is fetched
  return (
    <FAQcontext.Provider value={FAQdata}>
      <Routes>
        <Route path="/" element={<HomePage data={backendData} />} />
        <Route path="/SportWoman" element={<SportWomanPage data={backendData} />} />
        <Route path="/SportMan" element={<SportManPage data={backendData} />} />
        <Route path="/BoulderWoman" element={<BoulderWomanPage data={backendData} />} />
        <Route path="/BoulderMan" element={<BoulderManPage data={backendData} />} />
      </Routes>
    </FAQcontext.Provider>
  )
}

// Export App component
export default App;

