import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { FaPlay } from "react-icons/fa";
import { ImUpload, ImDownload } from "react-icons/im";
import TransactionRow from "./TransactionRow";
import TransactionPieChart from "./TransactionPieChart";
import TransactionBarChart from "./TransactionBarChart";
import BalanceCard from "./BalanceCard";
import useUserInfo from "../../hooks/useUserInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../../redux/reducers/TransactionReducer";
import useAdmin from "../../hooks/useAdmin";
import AdminDashboard from "./AdminDashboard";

const LandingPage = () => {
  const [user] = useAuthState(auth);

  const uId = localStorage.getItem("userId");
  const { admin, loadingAdmin } = useAdmin(uId);
  const { userInfo } = useUserInfo(uId);
  const { transaction } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchTransaction({ accountNumber: userInfo?.accountNumber, page: 0 })
    );
  }, [dispatch, userInfo]);
  let totalSendMoney = 0;
  transaction.map((money) => (totalSendMoney += parseFloat(money.send_money)));
  let totalReceiveMoney = 0;
  transaction.map(
    (money) => (totalReceiveMoney += parseFloat(money.receive_money))
  );
  let transactionHistory = [];
  transaction.forEach((element) => {
    const getSendMoney = element.send_money;
    const getNumber = Number(getSendMoney);

    const newArray = { ...element, send_money: getNumber };

    transactionHistory.push(newArray);
  });

  if (loadingAdmin) {
    return;
  }
  if (admin) {
    return <AdminDashboard />;
  }

  return (
    <section className="mt-8">
      <div className="grid lg:grid-cols-3 gap-12">
        <BalanceCard />

        {/* Income Card Chart start */}
        <div className="card bg-white  shadow-2xl  text-gray-200">
          <div className=" p-5">
            <div className="flex items-center justify-between mb-8 gap-x-8">
              <span>
                <ImDownload className="h-12 w-12 bg-[#6160DC] p-2 rounded-full" />
              </span>
              <div>
                <p className="text-gray-400">Reveive Money</p>
                <h1 className="text-xl font-bold text-black">
                  ${totalReceiveMoney ? totalReceiveMoney : 0}
                </h1>
              </div>
              <div>
                <p className="flex justify-end ">
                  <span className="flex flex-col items-center">
                    <span>
                      <FaPlay className="text-[#00A389] rotate-[30deg]" />
                    </span>
                    <span className="text-[#00A389] font-bold">+0,5%</span>
                  </span>
                </p>
                <span className="text-gray-500">last month</span>
              </div>
            </div>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={300} data={transactionHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="receive_money"
                    padding={{ left: 30, right: 30 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="receive_money"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="send_money" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Income Card Chart end */}

        {/* Expense Card Start */}
        <div className="card bg-white  shadow-2xl  text-gray-200">
          <div className=" p-5">
            <div className="flex items-center justify-between mb-8 gap-x-8">
              <span>
                <ImUpload className="h-12 w-12 bg-[#54C5EB] p-2 rounded-full" />
              </span>
              <div>
                <p className="text-gray-400">Send Money</p>
                <h1 className="text-xl font-bold text-black">
                  ${totalSendMoney ? totalSendMoney : 0}
                </h1>
              </div>
              <div>
                <p className="flex justify-end ">
                  <span className="flex flex-col items-center">
                    <span>
                      <FaPlay className="text-[#00A389] rotate-[-30deg]" />
                    </span>
                    <span className="text-[#00A389] font-bold">+0,5%</span>
                  </span>
                </p>
                <span className="text-gray-500">last month</span>
              </div>
            </div>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={300} data={transactionHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="receive_money"
                    padding={{ left: 30, right: 30 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="send_money"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reveive_money"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Expense Card End */}
      </div>

      <div className="grid  lg:grid-cols-2 gap-x-16 mt-12">
        {/* Bar Chart Start Start */}
        <TransactionBarChart transaction={transactionHistory} />
        {/* Bar Chart end */}
        {/* Pie Chart Start */}

        <TransactionPieChart transaction={transactionHistory} />
        {/* Pie chart end */}
      </div>
      {/* Transaction table start  */}
      <section className="mt-12 bg-white shadow-2xl rounded-2xl">
        <h1 className="text-3xl font-bold my-8 ml-2">Lastest Transaction</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra  w-full">
            <tbody>
              {transaction.slice(0, 6).map((rowdata, i) => (
                <TransactionRow key={i} userInfo={userInfo} rowdata={rowdata} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Transaction table end */}
    </section>
  );
};

export default LandingPage;
