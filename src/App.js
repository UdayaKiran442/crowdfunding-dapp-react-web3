import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Campaign from "./components/Campaign";
import Navbar from "./components/Navbar";
import AddCampaign from "./components/AddCampaign";

import web3 from "./utils/web3";

import AccountsContext from "./context/accounts";

import "./App.css";
const campaigns = [
  {
    id: 1,
    title: "Campaign 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    goal: 10000,
    currentAmount: 5000,
    endDate: "2023-03-31",
  },
  {
    id: 2,
    title: "Campaign 2",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
    goal: 5000,
    currentAmount: 2000,
    endDate: "2023-04-15",
  },
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <Campaign key={campaign.id} campaign={campaign} />
          ))}
        </div>
        <Routes>
          <Route path="/add" element={<AddCampaign />} />
        </Routes>
      </AccountsContext.Provider>
    </div>
  );
}

export default App;
