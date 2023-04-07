import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import web3 from "../utils/web3";
import contractInstance from "../utils/contractInstance";

import AccountsContext from "../context/accounts";
import getCampaignById from "../utils/getCampaignById";

const UpdateCampaign = () => {
  const { accounts } = useContext(AccountsContext);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [goal, setGoal] = useState();
  const [endDate, setEndDate] = useState();
  const { id } = useParams();
  const getDetails = async () => {
    const campaign = await getCampaignById(id);
    setTitle(campaign.title);
    setDescription(campaign.description);
    setImageUrl(campaign.imageUrl);
    setGoal(campaign.target);
    setEndDate(campaign.deadline);
  };
  const handleUpdateCampaign = async (e) => {
    e.preventDefault();
    const result = await contractInstance.methods.updateCampaign(
      id,
      title,
      description,
      imageUrl,
      goal,
      endDate
    );
    const tx = {
      from: accounts[0],
      to: contractInstance.options.address,
      gas: 3000000,
      data: result.encodeABI(),
    };
    const response = await web3.eth.sendTransaction(tx);
    console.log(response);
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold mb-4">Update Campaign</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Image Url
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="goal">
            Goal
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="goal"
            type="number"
            placeholder="Enter goal"
            value={goal}
            onClick={(e) => setGoal(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="endDate"
          >
            End Date
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endDate"
            type="date"
            placeholder="Enter end date"
            value={endDate}
            onClick={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpdateCampaign}
        >
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
