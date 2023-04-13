import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import contractInstance from "../utils/contractInstance";
import { weiToEther } from "../utils/ether-wei";
import web3 from "../utils/web3";

import AccountsContext from "../context/accounts";

const CampaignDetails = () => {
  const [campaign, setCampaign] = useState();
  const [donation, setDonation] = useState();
  const [percentageCompleted, setPercentageCompleted] = useState();
  const [targetInEther, setTargetInEther] = useState();
  const [receivedInEther, setReceivedInEther] = useState();
  const { accounts } = useContext(AccountsContext);
  const { id } = useParams();
  const getCampaignById = async () => {
    const campaign = await contractInstance.methods
      .getCampaignDetails(id)
      .call();
    const targetAmount = weiToEther(campaign?.target);
    const receivedAmount = weiToEther(campaign?.received);
    setTargetInEther(targetAmount);
    setReceivedInEther(receivedAmount);
    setCampaign(campaign);
    console.log("Campaign details:", campaign);
  };

  const donateCampaign = async () => {
    try {
      const donateMethod = contractInstance.methods.donateToCampaign(id);
      console.log("Donate method:", donateMethod);
      const txtObj = await donateMethod.send({
        from: accounts[0],
        value: web3.utils.toWei(donation, "ether"),
      });
      console.log(txtObj);
    } catch (error) {
      console.log("Error while donating to campaign:", error.message);
    }
  };

  const percentageAmountReceived = () => {
    const percentage = Math.round(
      (campaign?.received / campaign?.target) * 100
    );
    console.log("Percentage completed:", percentage);
    setPercentageCompleted(percentage);
  };

  useEffect(() => {
    getCampaignById();
    percentageAmountReceived();
  }, []);
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold mb-4">{campaign?.title}</h1>
      <p className="text-gray-700 mb-4"></p>
      <p className="text-gray-700 mb-2">
        <strong>Goal:</strong>
        {targetInEther} Ether
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Current amount:</strong> {receivedInEther} Ether
      </p>
      <p className="text-gray-700 mb-2">
        <strong>End date:</strong> {campaign?.deadline}
      </p>
      <div className="w-80 h-4 border-2 border-solid rounded-lg">
        <div
          className={`rounded-lg w-[${percentageCompleted}%] bg-green-600 height`}
        ></div>
      </div>
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
            placeholder="Enter donation amount in ether"
            value={donation}
            onChange={(e) => setDonation(e.target.value)}
            required
          />
        </div>
        <button
          onClick={donateCampaign}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Donate
        </button>
      </form>
    </div>
  );
};

export default CampaignDetails;
