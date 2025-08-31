import { useState } from "react";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import Modal from "../../../components/Modal";
import {
  Calendar,
  Clock,
  Plus,
  Video,
  X,
  CheckCircle,
  Eye,
} from "lucide-react";

const CalendarMeetings = () => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showMeetingDetails, setShowMeetingDetails] = useState(false);
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const upcomingMeetings = [
    {
      id: "MEET-001",
      customerName: "TechCorp Industries",
      type: "Quarterly Review",
      date: "2024-08-30",
      time: "10:00 AM",
      duration: "90 minutes",
      location: "Conference Room A",
      status: "Confirmed",
      priority: "High",
      agenda:
        "Portfolio Performance, Tax Strategy, New Investment Opportunities",
    },
    {
      id: "MEET-002",
      customerName: "Robert & Maria Martinez",
      type: "Estate Planning",
      date: "2024-08-31",
      time: "2:00 PM",
      duration: "60 minutes",
      location: "Client Office",
      status: "Confirmed",
      priority: "Medium",
      agenda: "Trust Structure, Tax Implications, Beneficiary Updates",
    },
    {
      id: "MEET-003",
      customerName: "Green Valley Restaurant Group",
      type: "Expansion Planning",
      date: "2024-09-02",
      time: "11:30 AM",
      duration: "45 minutes",
      location: "Video Conference",
      status: "Pending",
      priority: "High",
      agenda: "Loan Terms, Cash Flow Projections, Timeline",
    },
    {
      id: "MEET-004",
      customerName: "Jennifer Thompson",
      type: "Investment Review",
      date: "2024-09-03",
      time: "3:00 PM",
      duration: "60 minutes",
      location: "Office Meeting Room",
      status: "Confirmed",
      priority: "Medium",
      agenda: "Portfolio Performance, Risk Assessment",
    },
    {
      id: "MEET-005",
      customerName: "The Wilson Family Trust",
      type: "Wealth Planning",
      date: "2024-09-04",
      time: "10:00 AM",
      duration: "120 minutes",
      location: "Private Boardroom",
      status: "Confirmed",
      priority: "High",
      agenda: "Multi-generational Planning, Tax Optimization",
    },
    {
      id: "MEET-006",
      customerName: "MedTech Solutions Inc",
      type: "IPO Consultation",
      date: "2024-09-05",
      time: "1:30 PM",
      duration: "75 minutes",
      location: "Video Conference",
      status: "Pending",
      priority: "High",
      agenda: "IPO Timeline, Financial Structuring, Market Analysis",
    },
  ];

  const [newMeetingData, setNewMeetingData] = useState({
    customerName: "",
    type: "",
    date: "",
    time: "",
    duration: "60",
    location: "",
    agenda: "",
    priority: "Medium",
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
      case "Cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
      case "Medium":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300";
      case "Low":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setShowMeetingDetails(true);
  };

  const handleScheduleMeeting = () => {
    setShowNewMeetingModal(true);
  };

  const handleJoinMeeting = (meeting) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Joining meeting: ${meeting.type} with ${meeting.customerName}`);
    }, 1000);
  };

  const handleNewMeetingChange = (field, value) => {
    setNewMeetingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewMeetingSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = ["customerName", "type", "date", "time", "location"];
    const missingFields = requiredFields.filter(
      (field) => !newMeetingData[field]
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    // Generate new meeting ID
    const newMeetingId = `MEET-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;

    // Create new meeting object
    const newMeeting = {
      id: newMeetingId,
      ...newMeetingData,
      status: "Pending",
    };

    alert(
      `Meeting ${newMeetingId} scheduled successfully with ${newMeeting.customerName}`
    );

    // Reset form and close modal
    setNewMeetingData({
      customerName: "",
      type: "",
      date: "",
      time: "",
      duration: "60",
      location: "",
      agenda: "",
      priority: "Medium",
    });
    setShowNewMeetingModal(false);
  };

  // Meeting Details Modal (following User modal patterns)
  const MeetingDetailsModal = () => {
    if (!selectedMeeting) return null;

    return (
      <Modal
        isOpen={showMeetingDetails}
        onClose={() => setShowMeetingDetails(false)}
        title="Meeting Details"
        size="md"
      >
        <div className="space-y-6">
          {/* Meeting Overview */}
          <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedMeeting.type}
            </h4>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {selectedMeeting.customerName}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(
                  selectedMeeting.status
                )}`}
              >
                {selectedMeeting.status}
              </span>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-medium ${getPriorityColor(
                  selectedMeeting.priority
                )}`}
              >
                {selectedMeeting.priority} Priority
              </span>
            </div>

            {/* Key Meeting Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Date:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatDate(selectedMeeting.date)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Time:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedMeeting.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Duration:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedMeeting.duration}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Location:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedMeeting.location}
                </span>
              </div>
            </div>

            {/* Agenda */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Agenda:</strong> {selectedMeeting.agenda}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowMeetingDetails(false)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-all duration-200 hover:scale-105"
            >
              Close
            </button>
            <button
              onClick={() => handleJoinMeeting(selectedMeeting)}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#36D399] to-[#4AE3AA] text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50"
            >
              <Video className="w-4 h-4" />
              Join Meeting
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  // New Meeting Modal
  const NewMeetingModal = () => {
    if (!showNewMeetingModal) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 animate-in fade-in duration-300 scale-in-95">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Schedule New Meeting
            </h3>
            <button
              onClick={() => setShowNewMeetingModal(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleNewMeetingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={newMeetingData.customerName}
                  onChange={(e) =>
                    handleNewMeetingChange("customerName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#6160DC]"
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Meeting Type
                </label>
                <select
                  value={newMeetingData.type}
                  onChange={(e) =>
                    handleNewMeetingChange("type", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#6160DC]"
                  required
                >
                  <option value="">Select Type...</option>
                  <option value="Portfolio Review">Portfolio Review</option>
                  <option value="Investment Planning">
                    Investment Planning
                  </option>
                  <option value="Risk Assessment">Risk Assessment</option>
                  <option value="Quarterly Review">Quarterly Review</option>
                  <option value="Estate Planning">Estate Planning</option>
                  <option value="Wealth Planning">Wealth Planning</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newMeetingData.date}
                  onChange={(e) =>
                    handleNewMeetingChange("date", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#6160DC]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={newMeetingData.time}
                  onChange={(e) =>
                    handleNewMeetingChange("time", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#6160DC]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Duration
                </label>
                <select
                  value={newMeetingData.duration}
                  onChange={(e) =>
                    handleNewMeetingChange("duration", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#6160DC]"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Priority
                </label>
                <select
                  value={newMeetingData.priority}
                  onChange={(e) =>
                    handleNewMeetingChange("priority", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#6160DC]"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                Location
              </label>
              <select
                value={newMeetingData.location}
                onChange={(e) =>
                  handleNewMeetingChange("location", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#6160DC]"
                required
              >
                <option value="">Select Location...</option>
                <option value="Office Meeting Room">Office Meeting Room</option>
                <option value="Conference Room A">Conference Room A</option>
                <option value="Private Boardroom">Private Boardroom</option>
                <option value="Client Office">Client Office</option>
                <option value="Video Conference">Video Conference</option>
                <option value="Phone Call">Phone Call</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                Agenda
              </label>
              <textarea
                rows="3"
                value={newMeetingData.agenda}
                onChange={(e) =>
                  handleNewMeetingChange("agenda", e.target.value)
                }
                placeholder="Enter meeting agenda..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#6160DC]"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowNewMeetingModal(false)}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#6160DC] to-[#8B7EFF] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                Schedule Meeting
              </button>
            </div>
          </form>
        </div>
      </div>
    );
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={100}>
          <div className="text-center sm:text-left mb-8 sm:mb-10 lg:mb-12">
            <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Meetings
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              Schedule and manage your client meetings
            </p>
          </div>
        </AnimatedSection>

        {/* Meeting Statistics */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
            <div className="group p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-[#6160DC]/20 dark:hover:shadow-[#8B7EFF]/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Today
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {
                      upcomingMeetings.filter((m) => m.date === "2024-08-29")
                        .length
                    }
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="group p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-[#6160DC]/20 dark:hover:shadow-[#8B7EFF]/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    This Week
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {upcomingMeetings.length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="group p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-[#6160DC]/20 dark:hover:shadow-[#8B7EFF]/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Confirmed
                  </p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {
                      upcomingMeetings.filter((m) => m.status === "Confirmed")
                        .length
                    }
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>

            <div className="group p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-[#6160DC]/20 dark:hover:shadow-[#8B7EFF]/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {
                      upcomingMeetings.filter((m) => m.status === "Pending")
                        .length
                    }
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Schedule Meeting Button */}
        <AnimatedSection delay={250}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
              Upcoming Meetings
            </h3>
            <button
              onClick={handleScheduleMeeting}
              className="bg-gradient-to-r from-[#6160DC] to-[#8B7EFF] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Meeting
            </button>
          </div>
        </AnimatedSection>

        {/* Meetings List */}
        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
            {upcomingMeetings.map((meeting, index) => (
              <AnimatedSection key={meeting.id} delay={350 + index * 50}>
                <div className="group p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-[#6160DC]/20 dark:hover:shadow-[#8B7EFF]/20 transition-all duration-500 hover:scale-[1.02]">
                  {/* Meeting Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {meeting.type}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {meeting.customerName}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                            meeting.status
                          )}`}
                        >
                          {meeting.status}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                            meeting.priority
                          )}`}
                        >
                          {meeting.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Meeting Information */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Date:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {formatDate(meeting.date)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Time:
                      </span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {meeting.time}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Duration:
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {meeting.duration}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Location:
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {meeting.location}
                      </span>
                    </div>
                  </div>

                  {/* Agenda */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                    <p className="text-xs text-blue-800 dark:text-blue-300">
                      <strong>Agenda:</strong> {meeting.agenda}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleViewDetails(meeting)}
                    className="w-full bg-gradient-to-r from-[#6160DC] to-[#8B7EFF] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center group-hover:scale-105"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Meeting Details Modal */}
        {showMeetingDetails && <MeetingDetailsModal />}

        {/* New Meeting Modal */}
        <NewMeetingModal />
      </div>
    </div>
  );
};

export default CalendarMeetings;
