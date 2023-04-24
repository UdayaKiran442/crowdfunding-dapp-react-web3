import contractInstance from "./contractInstance";
const getDonorsList = async (id) => {
  try {
    const getDonorsListMethod =
      contractInstance.methods.getCampaignDonorsList(id);
    const donorslist = await getDonorsListMethod.call();
    return donorslist;
  } catch (error) {
    console.log(error);
  }
};

export default getDonorsList;
