import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState, createContext } from 'react'
import HomePage from "./pages/HomePage";
import SportWomanPage from "./pages/SportWomanPage";
import SportManPage from "./pages/SportManPage";
import BoulderWomanPage from "./pages/BoulderWomanPage";
import BoulderManPage from "./pages/BoulderManPage";
import { populateFAQdata } from "./FAQdata/populateFAQdata.js";

// Declare the context at the top of the file
export const FaqContext = createContext();

function App() {
  const [backendData, setBackendData] = useState([]);
  const [faqData, setFaqData] = useState({}); // Initialize the faqData state with an empty object
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then((data) => {
        setBackendData(data);
        setFaqData(populateFAQdata(data));
        setLoading(false); // Set loading to false after the data is fetched
      });
  }, []);

  // Don't render the Routes until the data is fetched
  if (loading) {
    return <div></div>;
  }

  return (
    <FaqContext.Provider value={faqData}>
      <Routes>
        <Route path="/" element={<HomePage data={backendData} />} />
        <Route path="/SportWoman" element={<SportWomanPage data={backendData} />} />
        <Route path="/SportMan" element={<SportManPage data={backendData} />} />
        <Route path="/BoulderWoman" element={<BoulderWomanPage data={backendData} />} />
        <Route path="/BoulderMan" element={<BoulderManPage data={backendData} />} />
      </Routes>
    </FaqContext.Provider>
  )
}


export default App;
