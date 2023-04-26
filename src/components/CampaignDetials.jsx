import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
import Table from "react-bootstrap/Table";
import axios from "axios";

import web3 from "../utils/web3";
import getDonorsList from "../utils/getDonorsListForCampaign";
import contractInstance from "../utils/contractInstance";
import calculateDaysLeft from "../utils/daysLeft";
import { weiToEther } from "../utils/ether-wei";

import AccountsContext from "../context/accounts";

import Loader from "./Loader";

const CampaignDetails = () => {
  const [campaign, setCampaign] = useState();
  const [donation, setDonation] = useState();
  const [daysLeft, setDaysLeft] = useState();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [percentageCompleted, setPercentageCompleted] = useState();
  const [targetInEther, setTargetInEther] = useState();
  const [receivedInEther, setReceivedInEther] = useState();
  const [donors, setDonors] = useState([{ donor: "", amount: Number }]);
  const [loading, setLoading] = useState(false);
  const { accounts } = useContext(AccountsContext);
  const { id } = useParams();
  const getCampaignById = async () => {
    try {
      setLoading(true);
      const campaign = await contractInstance.methods
        .getCampaignDetails(id)
        .call();
      const targetAmount = weiToEther(campaign?.target);
      const receivedAmount = weiToEther(campaign?.received);
      setTargetInEther(targetAmount);
      setReceivedInEther(receivedAmount);
      setCampaign(campaign);
      console.log("Campaign details:", campaign);
      const days = calculateDaysLeft(campaign?.deadline);
      setDaysLeft(days);
      setImage(`https://ipfs.io/ipfs/${campaign?.imageUrl}`);
      console.log("Image", image);
      const data = await axios.get(
        `https://ipfs.io/ipfs/${campaign?.imageUrl}`
      );
      console.log("Fetch data", data.data);
      setImageUrl(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const donateCampaign = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const donateMethod = contractInstance.methods.donateToCampaign(id);
      console.log("Donate method:", donateMethod);
      const txtObj = await donateMethod.send({
        from: accounts[0],
        value: web3.utils.toWei(donation, "ether"),
      });
      console.log(txtObj);
      getCampaignById();
      percentageCompleted();
      getDonors();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error while donating to campaign:", error.message);
    }
  };

  const percentageAmountReceived = () => {
    console.log(`Received:${receivedInEther}`);
    console.log(`Target:${targetInEther}`);
    const percentage = Math.round((receivedInEther / targetInEther) * 100);
    console.log("Percentage completed:", percentage);
    setPercentageCompleted(percentage);
  };

  const getDonors = async () => {
    const donorsList = await getDonorsList(id);
    const input = `${donorsList}`;
    const data = input.split(",");
    let res = [{ donor: "", amount: 0 }];
    for (let i = 0; i < data.length; i += 2) {
      const donor = data[i];
      const amount = Number(data[i + 1]);
      const amountInEther = Number(
        web3.utils.fromWei(amount.toString(), "ether")
      );
      const index = res.findIndex((r) => r.donor === donor);
      if (index === -1) {
        res.push({ donor, amount: amountInEther });
      } else {
        const arr = [
          ...res,
          (res[index].amount = res[index].amount + amountInEther),
        ];
        res = arr;
      }
    }
    setDonors(res);
    console.log("Donors List:", donors);
  };
  useEffect(() => {
    getCampaignById();
    percentageAmountReceived();
    getDonors();
  }, [receivedInEther, targetInEther, percentageCompleted]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto py-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            {campaign?.title}
          </h1>
          <div className="">
            <h1 className="text-2xl font-semibold">About fundraiser</h1>
            <p className="text-gray-700 mb-4 text-[18px]">
              {campaign?.description}
            </p>
          </div>
          <div className="flex gap-5">
            <div className="image">
              <img src={imageUrl} alt="Campaign" width={300} height={50} />
            </div>
            <div className="campaign">
              <p className="text-gray-700 mb-2 font-extrabold text-4xl">
                {/* <strong>Current amount:</strong>  */}
                {receivedInEther} Ethers <br />
              </p>
              <p className="text-gray-700 mb-2">
                {/* <strong>Goal:</strong> */}
                raised of {targetInEther} Ethers
              </p>

              <p className="text-gray-700 mb-2">
                <strong>End date:</strong> {campaign?.deadline}
              </p>
              <div className="w-80 h-4 border-2 border-solid rounded-lg">
                {percentageCompleted >= 0 && (
                  <div
                    className={`rounded-lg w-[${percentageCompleted}%] bg-green-600 height`}
                  ></div>
                )}
                <div className="flex">
                  <p className="text-sm">
                    <span className="text-4xl">{daysLeft}</span> days left
                  </p>
                </div>
              </div>
              <div className="share mt-16">
                <button className="bg-green-400 text-white py-2 px-7 flex justify-center items-center gap-2">
                  <BsWhatsapp />
                  Spread the word
                </button>
              </div>
            </div>
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
          <div>
            <Table striped bordered hover responsive="md">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Address</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {donors?.map((donor, index) => (
                  <>
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{donor.donor}</td>
                      <td>{donor.amount} Ethers</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignDetails;
