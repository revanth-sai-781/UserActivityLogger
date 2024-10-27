import React, { useState, useEffect } from "react";
import LogTable from "./components/LogTable";
import FilterBar from "./components/FilterBar";
import "./App.css";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filter, setFilter] = useState({ actionType: "", dateRange: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10; //sample log pages

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/logs");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      // Convert timestamps to IST
      const logsWithIST = data.map(log => ({
        ...log,
        timestamp: new Date(log.timestamp).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
      }));

      setLogs(logsWithIST);
      setFilteredLogs(logsWithIST);
    } catch (error) {
      setError("Error fetching logs: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    applyFilters(newFilter);
  };

  const applyFilters = ({ actionType, dateRange }) => {
    let updatedLogs = logs;

    if (actionType) {
      updatedLogs = updatedLogs.filter((log) => log.actionType === actionType);
    }
    // Filtering by dateRange
    if (dateRange) {
      const [startDate, endDate] = dateRange.split(" to ");
      updatedLogs = updatedLogs.filter((log) => {
        const logDate = new Date(log.timestamp);
        return logDate >= new Date(startDate) && logDate <= new Date(endDate);
      });
    }

    setFilteredLogs(updatedLogs);
    setCurrentPage(1);
  };

  const handleSort = () => {
    const sortedLogs = [...filteredLogs].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredLogs(sortedLogs);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app-container">
      <h1>- User Activity Logs -</h1>
      <FilterBar filter={filter} onFilterChange={handleFilterChange} />
      <button onClick={handleSort} className="sort-button">
        Sort by Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <LogTable logs={currentLogs} />
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
