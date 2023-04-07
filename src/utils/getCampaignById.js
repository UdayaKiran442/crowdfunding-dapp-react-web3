import contractInstance from "./contractInstance";
const getCampaignById = async (id) => {
  const campaign = await contractInstance.methods.getCampaignDetails(id).call();
  console.log("Campaign details:", campaign);
  return campaign;
};

export default getCampaignById;
