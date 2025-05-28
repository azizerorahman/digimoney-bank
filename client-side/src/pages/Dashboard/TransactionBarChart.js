import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const TransactionBarChart = ({ transaction }) => {
  const chartData = transaction?.length ? transaction : [];

  return (
    <div className="h-[45vh] bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 md:p-6 transition-all duration-300 mt-2">
      <h2 className="text-xl md:text-2xl font-bold text-primary dark:text-white mb-4">
        Transaction Overview
      </h2>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickLine={{ stroke: "#E5E7EB" }}
              axisLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickLine={{ stroke: "#E5E7EB" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, ""]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                color: "#1F2937",
              }}
              cursor={{ fill: "rgba(79, 70, 229, 0.1)" }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "15px",
                fontSize: "12px",
                fontWeight: "medium",
              }}
            />
            <Bar
              name="Sent"
              dataKey="send_money"
              fill="#4F46E5"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
            <Bar
              name="Received"
              dataKey="receive_money"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No transaction data available
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionBarChart;
