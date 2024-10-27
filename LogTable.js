import React from "react";
import "./LogTable.css";

const LogTable = ({ logs, role }) => {
  if (!Array.isArray(logs) || logs.length === 0) {
    return <div>No logs available.</div>;
  }

  return (
    <table className="log-table">
      <thead>
        <tr>
          <th>Action Type</th>
          <th>Timestamp</th>
          <th>User ID</th>
          {role === "admin" && <th>Role</th>}
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index}>
            <td>{log.actionType}</td>
            <td>{log.timestamp}</td>
            <td>{log.userId}</td>
            {role === "admin" && <td>{log.role}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogTable;
