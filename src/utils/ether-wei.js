import web3 from "./web3";

export const etherToWei = (ether) => {
  const goalInWei = web3.utils.toWei(ether, "ether");
  return goalInWei;
};

export const weiToEther = (wei) => {
  const amountInEther = web3.utils.fromWei(wei, "ether");
  return amountInEther;
};
