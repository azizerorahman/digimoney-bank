import { useState } from "react";
import { Clock, XCircle, ArrowUp } from "lucide-react";
import AnimatedSection from "../../../components/AnimatedSection";

export const csrDashboardData = {
  activeTickets: [
    {
      ticketId: "REQ-2024-5847",
      customerId: "CUST-789456",
      customerName: "Michael Rodriguez",
      issue: "Request to increase credit limit",
      priority: "Medium",
      status: "In Progress",
      createdDate: "2024-06-03",
      createdTime: "10:30 AM",
      slaDeadline: "2024-06-04 10:30 AM",
      timeRemaining: "23h 36m",
      category: "Credit Services",
      description:
        "Customer requesting credit limit increase from $5,000 to $8,000. Employment verification needed.",
      assignedTo: "Sarah Johnson",
      escalationRequired: true,
      escalateTo: "Credit Department",
      updates: [
        {
          timestamp: "2024-06-03 10:35 AM",
          action: "Ticket Created",
          note: "Initial request logged",
        },
      ],
    },
  ],
  myTicketQueue: [
    {
      ticketId: "REQ-2024-5847",
      customerId: "CUST-789456",
      customerName: "Michael Rodriguez",
      issue: "Credit limit increase request",
      priority: "Medium",
      status: "In Progress",
      slaDeadline: "2024-06-04 10:30 AM",
      timeRemaining: "23h 36m",
      category: "Credit Services",
    },
    {
      ticketId: "REQ-2024-5846",
      customerId: "CUST-445789",
      customerName: "Jennifer Chen",
      issue: "Dispute unauthorized charge",
      priority: "High",
      status: "New",
      slaDeadline: "2024-06-03 16:00 PM",
      timeRemaining: "5h 6m",
      category: "Fraud/Disputes",
    },
    {
      ticketId: "REQ-2024-5845",
      customerId: "CUST-223456",
      customerName: "Robert Thompson",
      issue: "Update contact information",
      priority: "Low",
      status: "Pending Approval",
      slaDeadline: "2024-06-05 12:00 PM",
      timeRemaining: "2d 1h 6m",
      category: "Account Updates",
    },
    {
      ticketId: "REQ-2024-5844",
      customerId: "CUST-667890",
      customerName: "Lisa Martinez",
      issue: "Account locked - password reset",
      priority: "High",
      status: "New",
      slaDeadline: "2024-06-03 14:00 PM",
      timeRemaining: "3h 6m",
      category: "Account Access",
    },
  ],
};

const ServiceRequests = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(
    csrDashboardData.activeCustomer
  );
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // NEW HANDLER FUNCTIONS FOR ADDED FEATURES
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

    // Add to active tickets and queue
    csrDashboardData.activeTickets.push(newTicket);
    csrDashboardData.myTicketQueue.unshift(newTicket);
    setShowCreateTicket(false);
  };

  const handleTicketUpdate = (ticketId, updates) => {
    // Update ticket in both activeTickets and myTicketQueue
    const updateTicket = (tickets) =>
      tickets.map((ticket) =>
        ticket.ticketId === ticketId
          ? {
              ...ticket,
              ...updates,
              updates: [
                ...ticket.updates,
                {
                  timestamp: new Date().toLocaleString(),
                  action: "Status Updated",
                  note: updates.note || "Ticket updated",
                },
              ],
            }
          : ticket
      );

    csrDashboardData.activeTickets = updateTicket(
      csrDashboardData.activeTickets
    );
    csrDashboardData.myTicketQueue = updateTicket(
      csrDashboardData.myTicketQueue
    );
  };

  const handleAddNote = (ticketId, note) => {
    handleTicketUpdate(ticketId, {
      updates: [
        ...(selectedTicket?.updates || []),
        {
          timestamp: new Date().toLocaleString(),
          action: "Note Added",
          note: note,
        },
      ],
    });
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

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400";
      case "In Progress":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Pending Approval":
        return "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400";
      case "Resolved":
        return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
      case "Closed":
        return "text-black dark:text-white bg-gray-50 dark:bg-gray-800";
      default:
        return "text-black dark:text-white bg-gray-50 dark:bg-gray-800";
    }
  };

  // NEW MODAL COMPONENTS
  const CustomerUpdateModal = ({ isOpen, onClose, customer, onUpdate }) => {
    const [formData, setFormData] = useState({
      phone: customer?.contactInfo?.phone || "",
      email: customer?.contactInfo?.email || "",
      street: customer?.contactInfo?.address?.street || "",
      city: customer?.contactInfo?.address?.city || "",
      state: customer?.contactInfo?.address?.state || "",
      zip: customer?.contactInfo?.address?.zip || "",
    });

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
            Update Customer Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => onUpdate(formData)}
              className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Update Information
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-black dark:text-white py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CreateTicketModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      issue: "",
      category: "Account Updates",
      priority: "Medium",
      description: "",
      slaDeadline: "",
    });

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
            Create Service Request
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Issue Title
              </label>
              <input
                type="text"
                value={formData.issue}
                onChange={(e) =>
                  setFormData({ ...formData, issue: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                placeholder="Brief description of the issue"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
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
                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                placeholder="Detailed description of the request"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                SLA Deadline
              </label>
              <input
                type="datetime-local"
                value={formData.slaDeadline}
                onChange={(e) =>
                  setFormData({ ...formData, slaDeadline: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => onSubmit(formData)}
              className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Create Request
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-black dark:text-white py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TicketDetailsModal = ({
    isOpen,
    onClose,
    ticket,
    onUpdate,
    onAddNote,
  }) => {
    const [note, setNote] = useState("");
    const [status, setStatus] = useState(ticket?.status || "New");

    if (!isOpen || !ticket) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Ticket Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-black dark:text-white">
                  Ticket ID:
                </span>
                <div className="font-medium text-black dark:text-white">
                  {ticket.ticketId}
                </div>
              </div>
              <div>
                <span className="text-sm text-black dark:text-white">
                  Customer:
                </span>
                <div className="font-medium text-black dark:text-white">
                  {ticket.customerName}
                </div>
              </div>
              <div>
                <span className="text-sm text-black dark:text-white">
                  Priority:
                </span>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                    ticket.priority
                  )}`}
                >
                  {ticket.priority}
                </span>
              </div>
              <div>
                <span className="text-sm text-black dark:text-white">
                  Status:
                </span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="ml-2 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div>
              <span className="text-sm text-black dark:text-white">Issue:</span>
              <div className="font-medium text-black dark:text-white">
                {ticket.issue}
              </div>
            </div>

            <div>
              <span className="text-sm text-black dark:text-white">
                Description:
              </span>
              <div className="text-black dark:text-white mt-1">
                {ticket.description}
              </div>
            </div>

            {/* Ticket History */}
            <div>
              <span className="text-sm font-medium text-black dark:text-white">
                Ticket History:
              </span>
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                {ticket.updates?.map((update, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 p-3 rounded"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-black dark:text-white">
                        {update.action}
                      </span>
                      <span className="text-xs text-black dark:text-white">
                        {update.timestamp}
                      </span>
                    </div>
                    <div className="text-sm text-black dark:text-white mt-1">
                      {update.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Note */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-1">
                Add Note:
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                placeholder="Add internal note or customer communication..."
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => {
                onUpdate(ticket.ticketId, { status, note });
                if (note) onAddNote(ticket.ticketId, note);
                onClose();
              }}
              className="bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Update Ticket
            </button>
            <button
              onClick={() => {
                if (note) {
                  onAddNote(ticket.ticketId, note);
                  setNote("");
                }
              }}
              className="bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-600"
            >
              Add Note
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Service Requests
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              Manage customer service requests and tickets
            </p>
          </div>
        </AnimatedSection>

        {/* Active Ticket for Current Customer */}
        <AnimatedSection delay={200}>
          {csrDashboardData.activeTickets.length > 0 && (
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 lg:mb-12 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-3 sm:mb-0">
                  Active Request - Current Customer
                </h3>
                <div className="flex items-center space-x-2 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm sm:text-base text-black dark:text-white font-medium">
                    SLA: {csrDashboardData.activeTickets[0].timeRemaining}{" "}
                    remaining
                  </span>
                </div>
              </div>

              {csrDashboardData.activeTickets.map((ticket) => (
                <div
                  key={ticket.ticketId}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 space-y-3 lg:space-y-0">
                    <div className="flex-1">
                      <div className="font-semibold text-lg sm:text-xl text-black dark:text-white mb-2">
                        {ticket.issue}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Ticket #{ticket.ticketId}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority} Priority
                      </span>
                      <span
                        className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {ticket.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Created:
                      </span>
                      <div className="font-medium text-black dark:text-white">
                        {ticket.createdDate} at {ticket.createdTime}
                      </div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg sm:rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Category:
                      </span>
                      <div className="font-medium text-black dark:text-white">
                        {ticket.category}
                      </div>
                    </div>
                  </div>

                  {ticket.escalationRequired && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 rounded-xl border border-orange-200 dark:border-orange-700/50">
                      <div className="flex items-center space-x-3">
                        <ArrowUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm sm:text-base font-medium text-orange-800 dark:text-orange-300">
                          Escalation Required: {ticket.escalateTo}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setShowTicketDetails(true);
                      }}
                      className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
                    >
                      Update Request
                    </button>
                    <button className="bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-orange-500/30">
                      Escalate Now
                    </button>
                    <button className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-green-500/30">
                      Mark Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>

        {/* My Ticket Queue */}
        <AnimatedSection delay={300}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-3xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black dark:text-white mb-3 sm:mb-0">
                My Ticket Queue
              </h3>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                {csrDashboardData.myTicketQueue.length} tickets assigned
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {csrDashboardData.myTicketQueue.map((ticket) => (
                <div
                  key={ticket.ticketId}
                  className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200/50 dark:border-gray-600/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        <div className="font-semibold text-base sm:text-lg text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {ticket.issue}
                        </div>
                        <span
                          className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${getPriorityColor(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority}
                        </span>
                        <span
                          className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                      <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2">
                        <span className="font-medium">
                          {ticket.customerName}
                        </span>{" "}
                        • {ticket.customerId}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Category:{" "}
                        <span className="font-medium">{ticket.category}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-3">
                      <div className="text-right">
                        <div
                          className={`text-sm sm:text-base font-semibold ${
                            ticket.timeRemaining.includes("h") &&
                            !ticket.timeRemaining.includes("d")
                              ? "text-orange-600 dark:text-orange-400"
                              : ticket.timeRemaining.includes("m") &&
                                !ticket.timeRemaining.includes("h")
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {ticket.timeRemaining}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          remaining
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowTicketDetails(true);
                        }}
                        className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-sm font-medium hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
                      >
                        Open Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

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

      <TicketDetailsModal
        isOpen={showTicketDetails}
        onClose={() => setShowTicketDetails(false)}
        ticket={selectedTicket}
        onUpdate={handleTicketUpdate}
        onAddNote={handleAddNote}
      />
    </div>
  );
};
export default ServiceRequests;
