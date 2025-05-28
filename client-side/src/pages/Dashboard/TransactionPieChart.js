import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

const TransactionPieChart = ({ transaction }) => {
  // Custom colors that match your project's gradient theme
  const COLORS = ["#4F46E5", "#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE"];

  // Format data for the pie chart if needed
  const chartData = transaction?.length ? transaction : [];

  return (
    <div className="h-[45vh] bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 md:p-6 transition-all duration-300 mt-2">
      <h2 className="text-xl md:text-2xl font-bold text-primary dark:text-white mb-4">
        Outcome Categories
      </h2>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="send_money"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#4F46E5"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${value}`, "Amount"]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                color: "#1F2937",
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: "12px",
                fontWeight: "medium",
              }}
            />
          </PieChart>
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

export default TransactionPieChart;
