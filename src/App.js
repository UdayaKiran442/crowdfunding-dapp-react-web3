import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AddCampaign from "./components/AddCampaign";
import AllCampaigns from "./components/AllCampaigns";

import connectToMetamask from "./utils/connect-metamask";
import getAccounts from "./utils/getAccounts";

import AccountsContext from "./context/accounts";

import "./App.css";

function App() {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    connectToMetamask();
    getAccounts(setAccounts);
  }, []);
  return (
    <div className="container mx-auto py-4">
      <AccountsContext.Provider value={{ accounts, setAccounts }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllCampaigns />} />
          <Route path="/add" element={<AddCampaign />} />
        </Routes>
      </AccountsContext.Provider>
    </div>
  );
}

export default App;
