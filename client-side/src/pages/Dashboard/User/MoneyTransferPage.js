import React, { useState, useEffect } from "react";
import AnimatedSection from "../../../components/AnimatedSection";
import LoadingSpinner from "../../../components/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const MoneyTransferPage = () => {
  const uId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    description: "",
    recipientEmail: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/accounts`,
          {
            params: { uId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data && res.data.success) {
          setAccounts(res.data.accounts);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        toast.error("Failed to load accounts");
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [uId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fromAccount || !formData.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");
      const transferData = {
        ...formData,
        uId,
        amount: parseFloat(formData.amount),
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/transfer`,
        transferData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.success) {
        toast.success("Transfer completed successfully!");
        setFormData({
          fromAccount: "",
          toAccount: "",
          amount: "",
          description: "",
          recipientEmail: "",
        });
      } else {
        toast.error(res.data?.message || "Transfer failed");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Transfer failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-4xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Money Transfer
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Transfer funds securely between accounts or to other recipients
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Transfer Form */}
          <AnimatedSection delay={200}>
            <div className="lg:col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  New Transfer
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* From Account */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From Account *
                  </label>
                  <select
                    name="fromAccount"
                    value={formData.fromAccount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  >
                    <option value="">Select account to transfer from</option>
                    {accounts
                      .filter((account) => account.type !== "Credit")
                      .map((account) => (
                        <option key={account._id} value={account._id}>
                          {account.accountName} -{" "}
                          {formatCurrency(account.balance)} (
                          {account.accountNumber})
                        </option>
                      ))}
                  </select>
                </div>

                {/* Transfer Type Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-300">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="transferType"
                        value="internal"
                        className="mr-3 text-blue-600"
                        defaultChecked
                      />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">
                          Internal Transfer
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Between your accounts
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-300">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="transferType"
                        value="external"
                        className="mr-3 text-blue-600"
                      />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">
                          External Transfer
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          To another person
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* To Account */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To Account
                  </label>
                  <select
                    name="toAccount"
                    value={formData.toAccount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  >
                    <option value="">Select destination account</option>
                    {accounts.map((account) => (
                      <option key={account._id} value={account._id}>
                        {account.accountName} ({account.accountNumber})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Recipient Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recipient Email (for external transfers)
                  </label>
                  <input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleInputChange}
                    placeholder="Enter recipient's email address"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Add a note about this transfer..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Transfer...</span>
                    </div>
                  ) : (
                    "Complete Transfer"
                  )}
                </button>
              </form>
            </div>
          </AnimatedSection>

          {/* Transfer Summary */}
          <AnimatedSection delay={300}>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Transfer Summary
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Amount
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {formData.amount
                      ? formatCurrency(parseFloat(formData.amount))
                      : "$0.00"}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Transfer Fee
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      $0.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Processing Time
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      Instant
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-800 dark:text-white">
                        Total
                      </span>
                      <span className="font-bold text-gray-800 dark:text-white">
                        {formData.amount
                          ? formatCurrency(parseFloat(formData.amount))
                          : "$0.00"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-800 dark:text-green-300">
                        Secure Transfer
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        Your transfer is protected with bank-level encryption
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default MoneyTransferPage;
