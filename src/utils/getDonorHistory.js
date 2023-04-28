import contractInstance from "./contractInstance";

const getDonorHistory = async (address) => {
  try {
    const getDonorCampaignsHistoryMethod =
      contractInstance.methods.getDonorDonationHistory(address);
    const campaignList = await getDonorCampaignsHistoryMethod.call();
    return campaignList;
  } catch (error) {
    console.log(error);
  }
};

export default getDonorHistory;
