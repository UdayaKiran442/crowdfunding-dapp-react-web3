import React from "react";

const Campaign = ({ campaign }) => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
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
      <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Details
      </p>
    </div>
  );
};

export default Campaign;
