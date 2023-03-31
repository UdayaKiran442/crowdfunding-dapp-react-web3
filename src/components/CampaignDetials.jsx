import React from "react";

const CampaignDetails = ({ campaign }) => {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>
      <p className="text-gray-700 mb-4">{campaign.description}</p>
      <p className="text-gray-700 mb-2">
        <strong>Goal:</strong> ${campaign.goal.toLocaleString()}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Current amount:</strong> $
        {campaign.currentAmount.toLocaleString()}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>End date:</strong> {campaign.endDate}
      </p>
      <form className="mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="donationAmount"
          >
            Donation amount
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="donationAmount"
            type="number"
            placeholder="Enter donation amount"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Donate
        </button>
      </form>
    </div>
  );
};

export default CampaignDetails;
