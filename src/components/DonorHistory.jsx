import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Table from "react-bootstrap/esm/Table";

import web3 from "../utils/web3";
import getDonorHistory from "../utils/getDonorHistory";

const DonorHistory = () => {
  const params = useParams();
  const [campaingsList, setCampaignsList] = useState([
    { campaignId: "", amount: "" },
  ]);
  const donorHistory = async () => {
    const donorHistoryList = await getDonorHistory(params.donor);
    console.log(donorHistoryList);
    setCampaignsList(donorHistoryList);
  };
  useEffect(() => {
    donorHistory();
  }, []);
  return (
    <div>
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th className="text-center">Campaign ID</th>
            <th className="text-center">Amount Donated</th>
          </tr>
        </thead>
        <tbody>
          {campaingsList.map((list, index) => (
            <tr key={index}>
              <td className="text-center">
                <Link className="no-underline" to={`/${list.campaignId}`}>
                  {list.campaignId}
                </Link>
              </td>
              <td className="text-center">
                {web3.utils.fromWei(list.amount, "ether")} Ethers
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DonorHistory;
