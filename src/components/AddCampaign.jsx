import React, { useState, useContext } from "react";

import contractInstance from "../utils/contractInstance";
import { etherToWei } from "../utils/ether-wei";

import AccountsContext from "../context/accounts";

const AddCampaign = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState();

  const { accounts } = useContext(AccountsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const txtObj = await contractInstance.methods
      //   .addCampaigns(title, description, imageUrl, goal, endDate)
      //   .send({
      //     from: accounts[0],
      //     gas: 3000000,
      //   });
      const goalInWei = etherToWei(goal);
      console.log("Goal in wei:", goalInWei);
      const gasLimit = await contractInstance.methods
        .addCampaigns(title, description, imageUrl, goalInWei, endDate)
        .estimateGas({
          from: accounts[0],
        });
      const txtObj = await contractInstance.methods
        .addCampaigns(title, description, imageUrl, goalInWei, endDate)
        .send({
          from: accounts[0],
          gas: gasLimit + 10000,
        });
      console.log(txtObj);
    } catch (error) {
      console.log("Error while adding a campaign:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setImageUrl(fileReader.result);
      }
    };
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold mb-4">Add Campaign</h1>
      <form onSubmit={handleSubmit}>
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
          {/* <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          /> */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="goal">
            Goal
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="goal"
            type="number"
            placeholder="Enter goal in ether"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
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
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;
