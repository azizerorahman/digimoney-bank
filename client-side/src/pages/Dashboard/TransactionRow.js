import moment from "moment";
import React from "react";
import {
  BsArrowUpRightCircleFill,
  BsArrowDownLeftCircleFill,
} from "react-icons/bs";

const TransactionRow = ({ rowdata, userInfo }) => {
  const { send_money, receive_money } = rowdata;
  let asiaDhaka = new Date(rowdata.data).toLocaleString([], {
    timeZone: "Asia/Dhaka",
  });

  let day = moment(asiaDhaka).format("ll");
  let time = moment(asiaDhaka).format("LT");

  return (
    <tr>
      <th>
        {rowdata.statustwo === "incomming" ? (
          <BsArrowDownLeftCircleFill className="h-8 w-8 text-[#25AC76]" />
        ) : (
          <BsArrowUpRightCircleFill className="h-8 w-8 text-[#EDBA56]" />
        )}
      </th>
      <td>
        <p
          className={`text-md ${
            rowdata.statustwo === "incomming"
              ? "text-[#04A48B]"
              : "text-[#EDBA56]"
          }  font-bold`}
        >
          {rowdata.statustwo === "incomming"
            ? rowdata.senderName
            : rowdata.reveiverName}
        </p>
        <p
          className={`text-xs ${
            rowdata.statustwo === "incomming"
              ? "text-[#04A48B]"
              : "text-[#EDBA56]"
          } `}
        >
          {rowdata.statustwo === "incomming"
            ? rowdata.senderAccountNumber
            : rowdata.receiverAccountnumber}
        </p>
      </td>
      <td
        className={`font-bold ${
          rowdata.statustwo === "incomming"
            ? "text-[#04A48B]"
            : "text-[#EDBA56]"
        }  text-md`}
      >
        ${rowdata.statustwo === "incomming" ? receive_money : send_money}
      </td>
      <td>
        <p
          className={`font-bold ${
            rowdata.statustwo === "incomming"
              ? "text-[#04A48B]"
              : "text-[#EDBA56]"
          } text-md`}
        >
          {day}{" "}
        </p>
        <p
          className={` text-xs text-base-300 ${
            rowdata.statustwo === "incomming"
              ? "text-[#04A48B]"
              : "text-[#EDBA56]"
          }  text-gray-600`}
        >
          {time}
        </p>
      </td>
      <td
        className={`font-bold  ${
          rowdata.statustwo === "outgoing" && "text-[#EDBA56]"
        } ${rowdata.statustwo === "incomming" && "text-[#04A48B]"}`}
      >
        {rowdata.statustwo}
      </td>
      <td className="font-bold text-xl cursor-pointer text-gray-600">...</td>
    </tr>
  );
};

export default TransactionRow;
