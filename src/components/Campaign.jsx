import React, { useEffect, useState } from "react";
import moment from "moment";

const Campaign = ({ campaign }) => {
  const [remainingDays, setRemainingDays] = useState();
  const calculateDaysLeft = async () => {
    const currentDate = moment(new Date());
    const deadlineDate = moment(new Date(campaign.deadline));
    const daysLeft = deadlineDate.diff(currentDate, "days");
    console.log("Days left:", daysLeft);
    setRemainingDays(daysLeft);
  };
  useEffect(() => {
    calculateDaysLeft();
  }, []);
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
      <p className="text-gray-700 mb-4">{campaign.description}</p>
      <p className="text-gray-700 mb-2">
        <strong>Goal:</strong> ${campaign.target}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Current amount:</strong> ${campaign.received}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>End date:</strong> {campaign.deadline}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Days left:</strong> {remainingDays}
      </p>
      <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Details
      </p>
    </div>
  );
};

export default Campaign;
