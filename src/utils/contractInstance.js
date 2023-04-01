import contract from "./contractAddress";
import web3 from "./web3";
import CrowdFunding from "../build/contracts/CrowdFunding.json";

const contractInstance = new web3.eth.Contract(CrowdFunding.abi, contract);

export default contractInstance;
