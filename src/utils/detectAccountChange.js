const detectAccountChange = () => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
  }
};

export default detectAccountChange;
