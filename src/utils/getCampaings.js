import contractInstance from "./contractInstance";

const getCampaigns = async (setAllCampaigns) => {
  try {
    const getCampaign = contractInstance.methods.getCampaigns();
    console.log("Get camapaign:", getCampaign);
    getCampaign
      .call()
      .then((result) => {
        setAllCampaigns(result);
        console.log("Campaigns:", result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error.message);
  }
};
export default getCampaigns;
