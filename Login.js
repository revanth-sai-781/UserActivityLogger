import React, { useState, useEffect } from 'react';
import LogTable from './components/LogTable';
import FilterBar from './components/FilterBar';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  const [filter, setFilter] = useState({ actionType: '', dateRange: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchLogs()
    }
  }, [isLoggedIn]);

  const fetchLogs = async () => {
    try {
      
      const data = [
        { actionType: 'login', timestamp: new Date().toISOString(), userId: 'user1' },
        { actionType: 'update', timestamp: new Date().toISOString(), userId: 'user2' },
      ];
      setLogs(data)
      setFilteredLogs(data)
    } catch (error) {
      setError('Error fetching logs: ' + error.message)
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
    setFilteredLogs(updatedLogs);
  };

  if (loading) {
    return <div> Wait Data Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="app-container">
      <h1>User Action Logs</h1>
      {!isLoggedIn ? (
        <Login onLogin={setIsLoggedIn} />
      ) : (
        <>
          <FilterBar filter={filter} onFilterChange={handleFilterChange} />
          <LogTable logs={filteredLogs} />
        </>
      )}
    </div>
  );
};

export default App;
