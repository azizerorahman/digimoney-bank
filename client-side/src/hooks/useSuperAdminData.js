import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * Custom hook for SuperAdmin data management
 * Handles CRUD operations for SuperAdmin data from MongoDB
 */
const useSuperAdminData = (dataType = null, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get auth token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch data function
  const fetchData = useCallback(
    async (specificDataType = null) => {
      try {
        setLoading(true);
        setError(null);

        const queryDataType = specificDataType || dataType;
        const url = queryDataType
          ? `${process.env.REACT_APP_API_URL}/super-admin-data?dataType=${queryDataType}`
          : `${process.env.REACT_APP_API_URL}/super-admin-data`;

        const response = await axios.get(url, {
          headers: getAuthHeaders(),
        });

        console.log("Fetched SuperAdmin data:", response.data);

        if (response.data) {
          if (
            queryDataType &&
            Array.isArray(response.data) &&
            response.data.length > 0
          ) {
            setData(response.data[0]);
          } else {
            setData(response.data);
          }
        }
      } catch (err) {
        console.error("Error fetching SuperAdmin data:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to fetch data"
        );
      } finally {
        setLoading(false);
      }
    },
    [dataType]
  );

  // Update data function
  const updateData = async (updatePayload, updateDataType = null) => {
    try {
      setLoading(true);
      setError(null);

      const targetDataType = updateDataType || dataType;
      if (!targetDataType) {
        throw new Error("DataType is required for updates");
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/super-admin-data/type/${targetDataType}`,
        updatePayload,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        // Refresh data after update
        await fetchData(targetDataType);
      }

      return response.data;
    } catch (err) {
      console.error("Error updating SuperAdmin data:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to update data"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create new data function
  const createData = async (newData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/super-admin-data`,
        newData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error("Error creating SuperAdmin data:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to create data"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete data function
  const deleteData = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/super-admin-data/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );

      return response.data;
    } catch (err) {
      console.error("Error deleting SuperAdmin data:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to delete data"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add audit log function
  const addAuditLog = async (logEntry) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/super-admin-data/audit-log`,
        logEntry,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error("Error adding audit log:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to add audit log"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add security event function
  const addSecurityEvent = async (securityEvent) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/super-admin-data/security-event`,
        securityEvent,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error("Error adding security event:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to add security event"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update system metrics function
  const updateSystemMetrics = async (metrics) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/super-admin-data/system-metrics`,
        metrics,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh system overview data after update
      if (dataType === "systemOverview") {
        await fetchData();
      }

      return response.data;
    } catch (err) {
      console.error("Error updating system metrics:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update system metrics"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch data on mount and dataType change
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return {
    data,
    loading,
    error,
    fetchData,
    updateData,
    createData,
    deleteData,
    addAuditLog,
    addSecurityEvent,
    updateSystemMetrics,
    refetch: () => fetchData(),
    clearError: () => setError(null),
  };
};

export default useSuperAdminData;
