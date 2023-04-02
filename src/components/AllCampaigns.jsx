import React, { useEffect, useState } from "react";

import Campaign from "./Campaign";

import getCampaigns from "../utils/getCampaings";

const AllCampaigns = () => {
  const [allCampaigns, setAllCampaigns] = useState([]);
  useEffect(() => {
    getCampaigns(setAllCampaigns);
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
