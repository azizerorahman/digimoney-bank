import { useState, useEffect } from "react";

const useLoanOfficerData = (userInfo) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!userInfo || !userInfo.role?.includes("loan-officer")) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch loan officer profile
      const officerResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/loan-officer-profile/${userInfo._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!officerResponse.ok) {
        throw new Error("Failed to fetch officer profile");
      }

      const officerProfile = await officerResponse.json();

      // Fetch loan applications
      const applicationsResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/loan-applications?officerId=${userInfo._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!applicationsResponse.ok) {
        throw new Error("Failed to fetch applications");
      }

      const applicationsData = await applicationsResponse.json();

      // Fetch active loans
      const activeLoansResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/active-loans?officerId=${userInfo._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("activeLoansResponse:", activeLoansResponse);

      const activeLoans = activeLoansResponse.ok
        ? await activeLoansResponse.json()
        : [];

      // Fetch communication logs
      const communicationResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/communication-logs`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const communicationLogs = communicationResponse.ok
        ? await communicationResponse.json()
        : [];

      // Fetch risk assessments
      const riskResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/risk-assessments`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const riskAssessments = riskResponse.ok ? await riskResponse.json() : [];

      // Construct the complete data object
      const loanOfficerData = {
        officerInfo: {
          name: officerProfile.name || userInfo.name,
          id: officerProfile._id || userInfo._id,
          title: officerProfile.title || "Loan Officer",
          branch: officerProfile.branch || userInfo.region || "Global Branch",
          status: officerProfile.status || "Available",
          todayStats: officerProfile.todayStats || {
            applicationsReviewed: 0,
            approvalRate: "0%",
            avgProcessingTime: "0 days",
            portfolioValue: "$0",
          },
          certifications: officerProfile.certifications || [],
          performance: officerProfile.performance || {
            thisMonth: {
              applications: 0,
              approved: 0,
              rejected: 0,
              pending: 0,
              volume: "$0",
            },
            thisQuarter: {
              applications: 0,
              approved: 0,
              rejected: 0,
              pending: 0,
              volume: "$0",
            },
          },
        },
        loanApplications: applicationsData.applications || [],
        activeLoanPortfolio: activeLoans || [],
        communicationLog: communicationLogs || [],
        riskAssessment: riskAssessments[0] || {
          highRiskApplications: [],
          riskDistribution: { low: 0, medium: 0, high: 0 },
          fraudAlerts: [],
        },
        creditScoreData: {}, // Will be populated as needed
        repaymentSchedules: {}, // Will be populated as needed
      };

      console.log("activeLoans:", activeLoans);

      setData(loanOfficerData);
    } catch (err) {
      console.error("Error fetching loan officer data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchData();
    }
  }, [userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: fetchData };
};

export default useLoanOfficerData;
