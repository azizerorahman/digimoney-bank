import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import useUserInfo from "../../../hooks/useUserInfo";
import LoadingSpinner from "../../../components/Loading";
import AnimatedSection from "../../../components/AnimatedSection";
import { toast } from "react-toastify";
import {
  FileText,
  Mail,
  Phone,
  Eye,
  MessageSquare,
  Send,
  AlertTriangle,
  Calendar,
  Search,
  Plus,
  X,
} from "lucide-react";

const LOCommunications = () => {
  const uId = localStorage.getItem("userId");
  const { userInfo, isLoading: userLoading } = useUserInfo(uId);

  // State management
  const [communicationLogs, setCommunicationLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewCommModal, setShowNewCommModal] = useState(false);
  const [selectedComm, setSelectedComm] = useState(null);
  const [showCommDetails, setShowCommDetails] = useState(false);
  const [newCommData, setNewCommData] = useState({
    applicantId: "",
    customerId: "",
    type: "Email",
    direction: "Outbound",
    subject: "",
    content: "",
    duration: "",
    outcome: "",
    status: "Pending",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch communication logs from backend
  useEffect(() => {
    const fetchCommunicationLogs = async () => {
      if (!userInfo?.email) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/communication-logs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          setCommunicationLogs(response.data);
        }
      } catch (err) {
        console.error("Error fetching communication logs:", err);
        setError("Failed to load communication logs");
        toast.error("Failed to load communication logs");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunicationLogs();
  }, [userInfo]);

  // Handle new communication submission
  const handleNewCommSubmission = async (e) => {
    e.preventDefault();
    if (!userInfo?.email) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("accessToken");

      const submissionData = {
        ...newCommData,
        sentBy: userInfo._id || uId,
        handledBy: userInfo._id || uId,
        date: new Date().toISOString().split("T")[0],
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/communication-logs`,
        submissionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        toast.success("Communication log added successfully");
        setShowNewCommModal(false);
        setNewCommData({
          applicantId: "",
          customerId: "",
          type: "Email",
          direction: "Outbound",
          subject: "",
          content: "",
          duration: "",
          outcome: "",
          status: "Pending",
        });

        // Refresh the communication logs
        const logsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/communication-logs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (logsResponse.data) {
          setCommunicationLogs(logsResponse.data);
        }
      }
    } catch (err) {
      console.error("Error adding communication log:", err);
      toast.error("Failed to add communication log");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle viewing communication details
  const handleViewCommDetails = (comm) => {
    setSelectedComm(comm);
    setShowCommDetails(true);
  };

  // Memoized filtered communications data
  const filteredCommunications = useMemo(() => {
    if (!communicationLogs) return [];

    return communicationLogs
      .filter((comm) => {
        const matchesFilter =
          selectedFilter === "all" ||
          comm.type?.toLowerCase() === selectedFilter.toLowerCase();

        const matchesSearch =
          !searchQuery ||
          comm.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comm.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comm.applicantId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comm.customerId?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [communicationLogs, selectedFilter, searchQuery]);

  // Memoized statistics
  const commStats = useMemo(() => {
    if (!communicationLogs || communicationLogs.length === 0) {
      return {
        total: 0,
        emails: 0,
        calls: 0,
        meetings: 0,
        pending: 0,
        todayCount: 0,
        thisWeekCount: 0,
        sent: 0,
        received: 0,
      };
    }

    const total = communicationLogs.length;
    const emails = communicationLogs.filter(
      (c) => c.type?.toLowerCase() === "email"
    ).length;
    const calls = communicationLogs.filter(
      (c) => c.type?.toLowerCase() === "phone"
    ).length;
    const meetings = communicationLogs.filter(
      (c) => c.type?.toLowerCase() === "meeting"
    ).length;
    const pending = communicationLogs.filter(
      (c) => c.status?.toLowerCase() === "pending"
    ).length;
    const sent = communicationLogs.filter(
      (c) => c.direction?.toLowerCase() === "outbound"
    ).length;
    const received = communicationLogs.filter(
      (c) => c.direction?.toLowerCase() === "inbound"
    ).length;

    const today = new Date().toDateString();
    const todayCount = communicationLogs.filter((c) => {
      const commDate = new Date(c.date).toDateString();
      return commDate === today;
    }).length;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekCount = communicationLogs.filter((c) => {
      const commDate = new Date(c.date);
      return commDate >= oneWeekAgo;
    }).length;

    return {
      total,
      emails,
      calls,
      meetings,
      pending,
      todayCount,
      thisWeekCount,
      sent,
      received,
    };
  }, [communicationLogs]);

  if (userLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <AnimatedSection>
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl max-w-md">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Communications
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "sent":
        return "text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "scheduled":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400";
      case "failed":
        return "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getDirectionColor = (direction) => {
    switch (direction?.toLowerCase()) {
      case "inbound":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700/50 dark:text-blue-400";
      case "outbound":
        return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700/50 dark:text-green-400";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/30 dark:border-gray-700/50 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header Section */}
        <AnimatedSection delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 md:mb-10 gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl pb-2 sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Communications Center
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
                Manage customer communications and follow-ups
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => setShowNewCommModal(true)}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 hover:opacity-90 hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Communication
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Communication Statistics Cards */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            {/* Total Communications Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {commStats.total}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-blue-700 dark:text-blue-300 font-medium">
                Total Communications
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                All time
              </div>
            </div>

            {/* Today's Activity Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 dark:hover:shadow-green-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {commStats.todayCount}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-green-700 dark:text-green-300 font-medium">
                Today's Activity
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                Last 24 hours
              </div>
            </div>

            {/* Pending Follow-ups Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200/50 dark:hover:shadow-yellow-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {commStats.pending}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-yellow-700 dark:text-yellow-300 font-medium">
                Pending Follow-ups
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Requires action
              </div>
            </div>

            {/* Email Communications Card */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                {commStats.emails}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-purple-700 dark:text-purple-300 font-medium">
                Email Communications
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                Total emails
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Communication Breakdown & Controls */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            {/* Communication Breakdown */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Communication Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Emails
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {commStats.emails}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Phone Calls
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {commStats.calls}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Meetings
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {commStats.meetings}
                  </span>
                </div>
              </div>
            </div>

            {/* Activity Metrics */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Activity Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    This Week
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {commStats.thisWeekCount}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Sent
                  </span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {commStats.sent}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Received
                  </span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {commStats.received}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Pending
                  </span>
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                    {commStats.pending}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 transition-all duration-500 hover:shadow-3xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Send Email</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Log Phone Call</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Meeting</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-700 dark:hover:text-yellow-300 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Review Pending</span>
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Search and Filter Controls */}
        <AnimatedSection delay={200}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 mb-8 sm:mb-10 lg:mb-12 transition-all duration-500">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Communications
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by subject, content, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base focus-visible:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-40">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Communication Type
                  </label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base focus-visible:outline-none transition-all duration-200"
                  >
                    <option value="all">All Types</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="meeting">Meeting</option>
                    <option value="message">Message</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Communications List */}
        <AnimatedSection delay={250}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Recent Communications ({filteredCommunications.length})
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredCommunications.length} of {commStats.total || 0}{" "}
                  communications
                </div>
              </div>
            </div>

            {filteredCommunications.length === 0 ? (
              <div className="p-12 sm:p-16 text-center">
                <MessageSquare className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Communications Found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-md mx-auto">
                  {searchQuery || selectedFilter !== "all"
                    ? "No communications match your current search criteria. Try adjusting your filters."
                    : "Start communicating with customers to see records here. Use the 'New Communication' button to get started."}
                </p>
                {(searchQuery || selectedFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFilter("all");
                    }}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4 p-6 sm:p-8">
                {filteredCommunications.map((comm, index) => (
                  <div
                    key={comm._id || index}
                    className="group relative p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-300/60 dark:hover:border-blue-600/60 transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/50 dark:hover:shadow-blue-900/30 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header Section */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                              {getTypeIcon(comm.type)}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                                {comm.subject ||
                                  `${
                                    comm.type?.charAt(0).toUpperCase() +
                                    comm.type?.slice(1)
                                  } Communication`}
                              </h4>
                              {comm.direction && (
                                <div
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDirectionColor(
                                    comm.direction
                                  )}`}
                                >
                                  {comm.direction.toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md font-medium">
                                App ID: {comm.applicantId || "N/A"}
                              </span>
                              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md capitalize font-medium">
                                Customer: {comm.customerId || "N/A"}
                              </span>
                              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-md capitalize font-medium">
                                {comm.type}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between lg:justify-end gap-4">
                          <div className="flex items-center gap-6">
                            {/* Status */}
                            <div className="text-center">
                              <div
                                className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(
                                  comm.status
                                )}`}
                              >
                                {comm.status?.toUpperCase() || "COMPLETED"}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                                Status
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleViewCommDetails(comm)}
                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group-hover:scale-110"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      {comm.content && (
                        <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-lg p-3 mb-4">
                          <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Content:
                          </h5>
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                            {comm.content}
                          </p>
                        </div>
                      )}

                      {/* Additional Info */}
                      {(comm.duration || comm.outcome || comm.readAt) && (
                        <div className="bg-blue-50/80 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
                          <h5 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                            Additional Information:
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {comm.duration && (
                              <div className="text-xs text-blue-700 dark:text-blue-300">
                                <span className="font-medium">Duration:</span>{" "}
                                {comm.duration}
                              </div>
                            )}
                            {comm.outcome && (
                              <div className="text-xs text-blue-700 dark:text-blue-300">
                                <span className="font-medium">Outcome:</span>{" "}
                                {comm.outcome}
                              </div>
                            )}
                            {comm.readAt && (
                              <div className="text-xs text-blue-700 dark:text-blue-300">
                                <span className="font-medium">Read:</span>{" "}
                                {new Date(comm.readAt).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">Date:</span>
                          <span>
                            {comm.date
                              ? new Date(comm.date).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Handler:</span>
                          <span>
                            {comm.sentBy ||
                              comm.handledBy ||
                              userInfo?.name ||
                              "System"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* New Communication Modal */}
        {showNewCommModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800/50 dark:to-purple-700/50 rounded-xl flex items-center justify-center">
                    <Send className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      New Communication
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Create a new communication record
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowNewCommModal(false)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <form
                onSubmit={handleNewCommSubmission}
                className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"
              >
                {/* Basic Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Applicant ID
                    </label>
                    <input
                      type="text"
                      value={newCommData.applicantId}
                      onChange={(e) =>
                        setNewCommData({
                          ...newCommData,
                          applicantId: e.target.value,
                        })
                      }
                      placeholder="e.g., APP-2024-001"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Customer ID
                    </label>
                    <input
                      type="text"
                      value={newCommData.customerId}
                      onChange={(e) =>
                        setNewCommData({
                          ...newCommData,
                          customerId: e.target.value,
                        })
                      }
                      placeholder="e.g., CUST-789123"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Communication Type
                    </label>
                    <select
                      value={newCommData.type}
                      onChange={(e) =>
                        setNewCommData({ ...newCommData, type: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Email">Email</option>
                      <option value="Phone">Phone Call</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Message">Message</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Direction
                    </label>
                    <select
                      value={newCommData.direction}
                      onChange={(e) =>
                        setNewCommData({
                          ...newCommData,
                          direction: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Outbound">Outbound (Sent)</option>
                      <option value="Inbound">Inbound (Received)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newCommData.subject}
                    onChange={(e) =>
                      setNewCommData({
                        ...newCommData,
                        subject: e.target.value,
                      })
                    }
                    placeholder="Enter communication subject..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={newCommData.content}
                    onChange={(e) =>
                      setNewCommData({
                        ...newCommData,
                        content: e.target.value,
                      })
                    }
                    placeholder="Enter communication content..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-vertical"
                    required
                  />
                </div>

                {/* Conditional fields based on type */}
                {newCommData.type === "Phone" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={newCommData.duration}
                        onChange={(e) =>
                          setNewCommData({
                            ...newCommData,
                            duration: e.target.value,
                          })
                        }
                        placeholder="e.g., 15 minutes"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Outcome
                      </label>
                      <input
                        type="text"
                        value={newCommData.outcome}
                        onChange={(e) =>
                          setNewCommData({
                            ...newCommData,
                            outcome: e.target.value,
                          })
                        }
                        placeholder="e.g., Customer Satisfied"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={newCommData.status}
                    onChange={(e) =>
                      setNewCommData({ ...newCommData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Sent">Sent</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowNewCommModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Add Communication
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Communication Details Modal */}
        {showCommDetails && selectedComm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800/50 dark:to-purple-700/50 rounded-xl flex items-center justify-center">
                    {getTypeIcon(selectedComm.type)}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      Communication Details
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedComm.subject ||
                        `${selectedComm.type} Communication`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCommDetails(false)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Communication Info
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Type:
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedComm.type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Direction:
                        </span>
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded-full ${getDirectionColor(
                            selectedComm.direction
                          )}`}
                        >
                          {selectedComm.direction}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Status:
                        </span>
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(
                            selectedComm.status
                          )}`}
                        >
                          {selectedComm.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Date:
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedComm.date
                            ? new Date(selectedComm.date).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Customer Info
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Applicant ID:
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedComm.applicantId || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Customer ID:
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedComm.customerId || "N/A"}
                        </span>
                      </div>
                      {selectedComm.duration && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Duration:
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedComm.duration}
                          </span>
                        </div>
                      )}
                      {selectedComm.outcome && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Outcome:
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedComm.outcome}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subject */}
                {selectedComm.subject && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Subject
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200">
                      {selectedComm.subject}
                    </p>
                  </div>
                )}

                {/* Content */}
                {selectedComm.content && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Content
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedComm.content}
                    </p>
                  </div>
                )}

                {/* Additional Information */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-purple-700 dark:text-purple-300">
                          Handler:
                        </span>
                        <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                          {selectedComm.sentBy ||
                            selectedComm.handledBy ||
                            userInfo?.name ||
                            "System"}
                        </span>
                      </div>
                      {selectedComm.readAt && (
                        <div className="flex justify-between">
                          <span className="text-sm text-purple-700 dark:text-purple-300">
                            Read At:
                          </span>
                          <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                            {new Date(selectedComm.readAt).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowCommDetails(false)}
                    className="px-6 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LOCommunications;
