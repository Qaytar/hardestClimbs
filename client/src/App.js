import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import HomePage from "./pages/HomePage";
import SportWomanPage from "./pages/SportWomanPage";
import SportWomanPage2 from "./pages/SportWomanPage2";
import SportManPage from "./pages/SportManPage";
import BoulderWomanPage from "./pages/BoulderWomanPage";
import BoulderManPage from "./pages/BoulderManPage";

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then((data) => {
        setBackendData(data);
        console.log("data:", data);
      });
  }, []);

  // return (
  //   <div>
  //     {(backendData.length === 0) ? (
  //       <p>Loading...</p>
  //     ) : (
  //       <p>{JSON.stringify(backendData, null, 2)}</p>
  //       // backendData.serverData.map((item, index) => (
  //       //   <p key={index}>{item}</p>
  //       // ))
  //     )}
  //   </div>
  // )


  return (
    <Routes>
      <Route path="/" element={<HomePage data={backendData} />} />
      <Route path="/SportWoman" element={<SportWomanPage data={backendData} />} />
      <Route path="/SportWoman2" element={<SportWomanPage2 data={backendData} />} />
      <Route path="/SportMan" element={<SportManPage data={backendData} />} />
      <Route path="/BoulderWoman" element={<BoulderWomanPage data={backendData} />} />
      <Route path="/BoulderMan" element={<BoulderManPage data={backendData} />} />
    </Routes>
  )
}
export default App;
