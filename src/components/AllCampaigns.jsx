import React, { useEffect, useState } from "react";
import Campaign from "./Campaign";
import contractInstance from "../utils/contractInstance";

const AllCampaigns = () => {
  const [allCampaigns, setAllCampaigns] = useState([]);
  const getCampaigns = async () => {
    try {
      const result = await contractInstance.methods.getCampaigns().call();
      setAllCampaigns(result);
      console.log("Campaigns:", result);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCampaigns();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCampaigns.map((campaign) => (
          <Campaign key={campaign.id} campaign={campaign} />
        ))}
      </div>
      <div>Number of campaigns: {allCampaigns.length}</div>
    </>
  );
};

export default AllCampaigns;
