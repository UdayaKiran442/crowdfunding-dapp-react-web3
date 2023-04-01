import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AddCampaign from "./components/AddCampaign";
import AllCampaigns from "./components/AllCampaigns";

import web3 from "./utils/web3";

import AccountsContext from "./context/accounts";

import "./App.css";

function App() {
  const [accounts, setAccounts] = useState([]);
  const connectToMetamask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      } else {
        console.log("Connect to metamask");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAccounts = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      console.log("Accounts:", accounts);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    connectToMetamask();
    getAccounts();
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
