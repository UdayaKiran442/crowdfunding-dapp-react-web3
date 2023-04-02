import web3 from "./web3";
const getAccounts = async (setAccounts) => {
  try {
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
    console.log("Accounts:", accounts);
  } catch (error) {
    console.log(error.message);
  }
};

export default getAccounts;
