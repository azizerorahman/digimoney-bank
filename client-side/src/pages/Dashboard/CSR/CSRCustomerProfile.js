import { useState } from "react";
import { Phone, Mail, MapPin, AlertTriangle } from "lucide-react";
import AnimatedSection from "../../../components/AnimatedSection";
import Modal from "../../../components/Modal";

export const csrDashboardData = {
  activeCustomer: {
    basicInfo: {
      name: "Michael Rodriguez",
      customerId: "CUST-789456",
      accountNumber: "****-****-****-3847",
      memberSince: "2019-03-15",
      preferredName: "Mike",
      contactMethod: "Phone",
      language: "English",
    },
    contactInfo: {
      phone: "(555) 234-5678",
      email: "m.rodriguez@email.com",
      address: {
        street: "1234 Oak Street",
        city: "Springfield",
        state: "IL",
        zip: "62701",
      },
      emergencyContact: {
        name: "Maria Rodriguez",
        relationship: "Spouse",
        phone: "(555) 234-5679",
      },
    },
    accountSummary: {
      accounts: [
        {
          type: "Checking",
          accountNumber: "****3847",
          balance: 2847.32,
          status: "Active",
          lastActivity: "2024-06-02",
        },
        {
          type: "Savings",
          accountNumber: "****7291",
          balance: 15420.88,
          status: "Active",
          lastActivity: "2024-05-28",
        },
        {
          type: "Credit Card",
          accountNumber: "****9156",
          balance: -1247.65,
          creditLimit: 5000,
          status: "Active",
          paymentDue: "2024-06-15",
        },
      ],
      totalRelationship: 17020.55,
      creditScore: "Good (720-750)", // Range for privacy
      riskLevel: "Low",
    },
    alerts: [
      {
        type: "info",
        message: "Customer called 3 times this month",
        priority: "Medium",
        date: "2024-06-03",
      },
      {
        type: "warning",
        message: "Credit card payment due in 12 days",
        priority: "Low",
        date: "2024-06-03",
      },
      {
        type: "overdraft",
        message: "Account overdraft: -$150.00 (Fee: $35.00)",
        priority: "High",
        date: "2024-06-03",
        amount: -150,
        fee: 35,
      },
      {
        type: "hold",
        message: "Temporary hold: $500.00 - Check verification pending",
        priority: "Medium",
        date: "2024-06-03",
        amount: 500,
        reason: "Check verification",
      },
      {
        type: "suspicious",
        message: "Suspicious activity: ATM withdrawal $800 - unusual location",
        priority: "High",
        date: "2024-06-03",
        transaction: "ATM withdrawal $800 - unusual location",
      },
    ],
  },
};

const CSRCustomerProfile = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(
    csrDashboardData.activeCustomer
  );

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const handleCustomerUpdate = (updatedData) => {
    setSelectedCustomer((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        phone: updatedData.phone || prev.contactInfo.phone,
        email: updatedData.email || prev.contactInfo.email,
        address: {
          ...prev.contactInfo.address,
          street: updatedData.street || prev.contactInfo.address.street,
          city: updatedData.city || prev.contactInfo.address.city,
          state: updatedData.state || prev.contactInfo.address.state,
          zip: updatedData.zip || prev.contactInfo.address.zip,
        },
      },
    }));
    setShowUpdateModal(false);
  };

  const handleCreateTicket = (ticketData) => {
    const newTicket = {
      ticketId: `REQ-2024-${Date.now()}`,
      customerId: selectedCustomer.basicInfo.customerId,
      customerName: selectedCustomer.basicInfo.name,
      issue: ticketData.issue,
      priority: ticketData.priority,
      status: "New",
      createdDate: new Date().toISOString().split("T")[0],
      createdTime: new Date().toLocaleTimeString(),
      slaDeadline: ticketData.slaDeadline,
      timeRemaining: "24h 0m",
      category: ticketData.category,
      description: ticketData.description,
      assignedTo: csrDashboardData.csrInfo.name,
      escalationRequired: false,
      updates: [
        {
          timestamp: new Date().toLocaleString(),
          action: "Ticket Created",
          note: "Initial request logged",
        },
      ],
    };

    csrDashboardData.activeTickets.push(newTicket);
    csrDashboardData.myTicketQueue.unshift(newTicket);
    setShowCreateTicket(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Low":
        return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "text-black dark:text-white bg-gray-50 dark:bg-gray-800";
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "overdraft":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "hold":
        return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
      case "suspicious":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
    }
  };

  const CustomerUpdateModal = ({ isOpen, onClose, customer, onUpdate }) => {
    const [formData, setFormData] = useState({
      phone: customer?.contactInfo?.phone || "",
      email: customer?.contactInfo?.email || "",
      street: customer?.contactInfo?.address?.street || "",
      city: customer?.contactInfo?.address?.city || "",
      state: customer?.contactInfo?.address?.state || "",
      zip: customer?.contactInfo?.address?.zip || "",
    });

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Update Contact Info"
        size="sm"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Phone number"
            />

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email address"
            />

            <input
              type="text"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Street address"
            />

            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City"
              />
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="State"
              />
              <input
                type="text"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ZIP"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              onClick={() => onUpdate(formData)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Update
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const CreateTicketModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      issue: "",
      category: "Account Updates",
      priority: "Medium",
      description: "",
    });

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create Service Request"
        size="md"
      >
        <div className="space-y-6">
          {/* Request Details Section */}
          <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Request Details
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Issue Title
                </label>
                <input
                  type="text"
                  value={formData.issue}
                  onChange={(e) =>
                    setFormData({ ...formData, issue: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Brief description of the issue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="Account Updates">Account Updates</option>
                    <option value="Credit Services">Credit Services</option>
                    <option value="Fraud/Disputes">Fraud/Disputes</option>
                    <option value="Account Access">Account Access</option>
                    <option value="Transactions">Transactions</option>
                    <option value="Security">Security</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-black dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Detailed description of the request"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              onClick={() => {
                const ticketData = {
                  ...formData,
                  slaDeadline: new Date(
                    Date.now() + 24 * 60 * 60 * 1000
                  ).toISOString(), // 24 hours from now
                };
                onSubmit(ticketData);
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              Create Request
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              CSR Customer Profile
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Customer Service Representative Dashboard
            </p>
          </div>
        </AnimatedSection>

        {/* Customer Alerts Section */}
        <AnimatedSection delay={200}>
          {selectedCustomer.alerts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
              {selectedCustomer.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`group p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl ${getAlertColor(
                    alert.type
                  )}`}
                >
                  <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                    <AlertTriangle
                      className={`h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300 ${
                        alert.priority === "High"
                          ? "text-red-600 dark:text-red-400"
                          : alert.priority === "Medium"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-blue-600 dark:text-blue-400"
                      }`}
                    />
                    <span className="font-medium text-sm sm:text-base text-black dark:text-white">
                      {alert.type === "overdraft"
                        ? "Overdraft Alert"
                        : alert.type === "hold"
                        ? "Account Hold"
                        : alert.type === "suspicious"
                        ? "Suspicious Activity"
                        : alert.type === "warning"
                        ? "Payment Warning"
                        : "Customer Alert"}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(
                        alert.priority
                      )}`}
                    >
                      {alert.priority}
                    </span>
                  </div>
                  <div className="text-sm text-black dark:text-white mb-1 sm:mb-2">
                    {alert.message}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {alert.date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>

        {/* Customer Information Grid */}
        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {/* Basic Information Card */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:shadow-3xl hover:shadow-blue-200/20 dark:hover:shadow-blue-900/30">
              <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-4 sm:mb-6">
                Customer Information
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl">
                  <span className="text-sm sm:text-base text-black dark:text-white">
                    Name:
                  </span>
                  <span className="font-medium text-sm sm:text-base text-black dark:text-white">
                    {selectedCustomer.basicInfo.name}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg sm:rounded-xl">
                  <span className="text-sm sm:text-base text-black dark:text-white">
                    Customer ID:
                  </span>
                  <span className="font-medium text-sm sm:text-base text-black dark:text-white">
                    {selectedCustomer.basicInfo.customerId}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl">
                  <span className="text-sm sm:text-base text-black dark:text-white">
                    Account:
                  </span>
                  <span className="font-medium text-sm sm:text-base text-black dark:text-white">
                    {selectedCustomer.basicInfo.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-lg sm:rounded-xl">
                  <span className="text-sm sm:text-base text-black dark:text-white">
                    Member Since:
                  </span>
                  <span className="font-medium text-sm sm:text-base text-black dark:text-white">
                    {selectedCustomer.basicInfo.memberSince}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 rounded-lg sm:rounded-xl">
                  <span className="text-sm sm:text-base text-black dark:text-white">
                    Preferred Name:
                  </span>
                  <span className="font-medium text-sm sm:text-base text-black dark:text-white">
                    {selectedCustomer.basicInfo.preferredName}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 transition-all duration-500 hover:shadow-3xl hover:shadow-green-200/20 dark:hover:shadow-green-900/30">
              <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-4 sm:mb-6">
                Contact Details
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm sm:text-base text-black dark:text-white">
                    {selectedCustomer.contactInfo.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg sm:rounded-xl">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm sm:text-base text-black dark:text-white">
                    {selectedCustomer.contactInfo.email}
                  </span>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10 rounded-lg sm:rounded-xl">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm sm:text-base text-black dark:text-white">
                      {selectedCustomer.contactInfo.address.street}
                    </div>
                    <div className="text-sm sm:text-base text-black dark:text-white">
                      {selectedCustomer.contactInfo.address.city},{" "}
                      {selectedCustomer.contactInfo.address.state}{" "}
                      {selectedCustomer.contactInfo.address.zip}
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Emergency Contact:
                  </div>
                  <div className="p-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 rounded-lg sm:rounded-xl">
                    <div className="font-medium text-sm sm:text-base text-black dark:text-white">
                      {selectedCustomer.contactInfo.emergencyContact.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {
                        selectedCustomer.contactInfo.emergencyContact
                          .relationship
                      }{" "}
                      • {selectedCustomer.contactInfo.emergencyContact.phone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="group bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  Update Contact Info
                </button>
                <button
                  onClick={() => setShowCreateTicket(true)}
                  className="group bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
                >
                  Create Service Request
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Account Summary Section */}
        <AnimatedSection delay={400}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black dark:text-white mb-6 sm:mb-8">
              Account Summary
            </h3>

            {/* Account Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              {selectedCustomer.accountSummary.accounts.map(
                (account, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50"
                  >
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div>
                        <div className="font-semibold text-base sm:text-lg text-black dark:text-white">
                          {account.type}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {account.accountNumber}
                        </div>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          account.status === "Active"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {account.status}
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                      ${Math.abs(account.balance).toLocaleString()}
                      {account.balance < 0 && (
                        <span className="text-red-600 dark:text-red-400">
                          {" "}
                          (owed)
                        </span>
                      )}
                    </div>
                    {account.creditLimit && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Credit Limit: ${account.creditLimit.toLocaleString()}
                      </div>
                    )}
                    {account.paymentDue && (
                      <div className="text-sm text-orange-600 dark:text-orange-400 mb-2">
                        Payment Due: {account.paymentDue}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Last Activity: {account.lastActivity}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-600">
              <div className="group text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  $
                  {selectedCustomer.accountSummary.totalRelationship.toLocaleString()}
                </div>
                <div className="text-sm sm:text-base text-green-700 dark:text-green-300 font-medium">
                  Total Relationship
                </div>
              </div>
              <div className="group text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {selectedCustomer.accountSummary.creditScore}
                </div>
                <div className="text-sm sm:text-base text-blue-700 dark:text-blue-300 font-medium">
                  Credit Score Range
                </div>
              </div>
              <div className="group text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
                <div
                  className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-2 group-hover:scale-110 transition-transform duration-300 ${
                    selectedCustomer.accountSummary.riskLevel === "Low"
                      ? "text-green-600 dark:text-green-400"
                      : selectedCustomer.accountSummary.riskLevel === "Medium"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {selectedCustomer.accountSummary.riskLevel}
                </div>
                <div className="text-sm sm:text-base text-purple-700 dark:text-purple-300 font-medium">
                  Risk Level
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <CustomerUpdateModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          customer={selectedCustomer}
          onUpdate={handleCustomerUpdate}
        />

        <CreateTicketModal
          isOpen={showCreateTicket}
          onClose={() => setShowCreateTicket(false)}
          customer={selectedCustomer}
          onSubmit={handleCreateTicket}
        />
      </div>
    </div>
  );
};
export default CSRCustomerProfile;
