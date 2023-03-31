import React, { useContext } from "react";
import AccountsContext from "../context/accounts";

const Navbar = () => {
  const { accounts, setAccounts } = useContext(AccountsContext);
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 text-white">
              My Crowdfunding App
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline">
              <a
                href="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Home
              </a>
              <a
                href="/add"
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Add Campaign
              </a>
              {accounts?.length > 0 ? (
                <button className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:bg-green-700">
                  {accounts[0]}
                </button>
              ) : (
                <button className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:bg-green-700">
                  Connect to Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
