import React from "react";
import Campaign from "./Campaign";

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
const AllCampaigns = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {campaigns.map((campaign) => (
        <Campaign key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};

export default AllCampaigns;
