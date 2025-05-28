import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankInfo } from "../../redux/reducers/BankInfoSlice";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const AdminDashboard = () => {
  const [userRequest, setUsersRequest] = useState([]);
  const { bankinfo, loading } = useSelector((state) => state.bankinfo);
  console.log(bankinfo);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBankInfo());
  }, [dispatch]);

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => setUsersRequest(data));
  }, []);
  const {
    isLoading,
    error,
    data: users,
    refetch,
  } = useQuery(["approvedusers"], () =>
    fetch("http://localhost:4000/approvedUsers").then((res) => res.json())
  );

  if (isLoading || loading) {
    return;
  }
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-full h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={1030}
              height={450}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid lg:grid-cols-3  gap-5 mt-4">
        <div class="card w-96 bg-[#6160DC] text-white">
          <div class="card-body ">
            <h2 class="card-title mx-auto">Total Users</h2>
            <h2 class="card-title mx-auto">{users.length}</h2>

            <div class="card-actions justify-end"></div>
          </div>
        </div>
        <div class="card w-96 bg-[#343472] text-white">
          <div class="card-body ">
            <h2 class="card-title mx-auto">Users Request</h2>
            <h2 class="card-title mx-auto">{userRequest.length}</h2>

            <div class="card-actions justify-end"></div>
          </div>
        </div>
        <div class="card w-96 bg-[#98589e] text-white">
          <div class="card-body ">
            <h2 class="card-title mx-auto">Bank Balance</h2>
            <h2 class="card-title mx-auto">{bankinfo.amount}</h2>

            <div class="card-actions justify-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
