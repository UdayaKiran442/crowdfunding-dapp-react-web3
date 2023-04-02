const connectToMetamask = async () => {
  try {
    if (window.ethereum) {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } else {
      console.log("Connect to metamask");
    }
  } catch (error) {
    console.log(error.message);
  }
};
export default connectToMetamask;
