import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import AccountsContext from "../context/accounts";
import { BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { weiToEther } from "../utils/ether-wei";

const Campaign = ({ campaign }) => {
  const [remainingDays, setRemainingDays] = useState();
  const [goalInEther, setGoalInEther] = useState();
  const [receivedEther, setReceivedEther] = useState();
  const { accounts } = useContext(AccountsContext);
  const calculateDaysLeft = async () => {
    const currentDate = moment(new Date());
    const deadlineDate = moment(new Date(campaign.deadline));
    const daysLeft = deadlineDate.diff(currentDate, "days");
    console.log("Days left:", daysLeft);
    setRemainingDays(daysLeft);
  };
  const targetInEther = () => {
    const ether = weiToEther(campaign.target);
    setGoalInEther(ether);
    const receivedAmount = weiToEther(campaign.received);
    setReceivedEther(receivedAmount);
  };
  useEffect(() => {
    calculateDaysLeft();
    targetInEther();
  }, []);
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
        {campaign.receipientAddress === accounts[0] && (
          <Link to={`/update/${campaign.id}`}>
            <BsPencilFill className="cursor-pointer" />
          </Link>
        )}
      </div>
      <p className="text-gray-700 mb-4">{campaign.description}</p>
      <p className="text-gray-700 mb-2">
        <strong>Goal:</strong> {goalInEther} Ether
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Current amount:</strong>
        {receivedEther} Ether
      </p>
      <p className="text-gray-700 mb-2">
        <strong>End date:</strong> {campaign.deadline}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Days left:</strong> {remainingDays}
      </p>
      <Link to={`/${campaign.id}`}>
        <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Details
        </p>
      </Link>
    </div>
  );
};

export default Campaign;
