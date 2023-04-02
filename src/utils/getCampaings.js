import contractInstance from "./contractInstance";

const getCampaigns = async (setAllCampaigns) => {
  try {
    const result = await contractInstance.methods.getCampaigns().call();
    setAllCampaigns(result);
    console.log("Campaigns:", result);
  } catch (error) {
    console.log(error.message);
  }
};
export default getCampaigns;
