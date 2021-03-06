import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaAngleDoubleRight } from "react-icons/fa";

import { useSelector } from "react-redux";

export const TransfersinModal = () => {
  const { userid } = useSelector((state) => state.recipients.selectedrecipient);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransaction = async () => {
      if (userid) {
        let response = await axios.post(
          `${process.env.REACT_APP_SERVER}/gettransactions`,
          { recipientid: userid },
          { withCredentials: true }
        );
        setTransactions(response.data);
      }
    };
    getTransaction();
  }, [userid]);

  return (
    <>
      <div className="text-center font-bold text-2xl ">Transfers</div>
      <div className=" grid grid-cols-3 place-items-center">
        <div className="underline">From</div>
        <div className="underline">Amount</div>
        <div className="underline">To</div>
      </div>
      <div className="overflow-auto">
        {transactions.length ? (
          transactions.map(
            (
              { value, receivername, sendername, senderid, receiverid, tuid },
              index
            ) => {
              if (senderid === userid || receiverid === userid) {
                return (
                  <div
                    className="pb-2 px-2 grid grid-cols-5 place-items-center  hover:bg-yellow-100 "
                    key={index}
                  >
                    <span className="">{sendername}</span>
                    <span className="">
                      <FaAngleDoubleRight
                        className={`inline text-xl ${
                          senderid === userid
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      />
                    </span>
                    <span className="">{value} MTOG</span>
                    <span>
                      <FaAngleDoubleRight
                        className={`inline text-xl ${
                          receiverid === userid
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      />
                    </span>
                    <span className="items-end">{receivername}</span>
                  </div>
                );
              } else {
                return (
                  <div className="text-center" key={index}>
                    No Transactions Found
                  </div>
                );
              }
            }
          )
        ) : (
          <div className="text-center">No Transactions Found</div>
        )}

        {/* Two */}
      </div>
    </>
  );
};
