import React from "react";
import "./FilterBar.css";

const FilterBar = ({ filter, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filter, [name]: value });
  };

  return (
    <div className="filter-bar">
      <label>Action Type:</label>
      <select name="actionType" value={filter.actionType} onChange={handleChange}>
        <option value="">All Actions</option>
        <option value="login">Login</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>

      {/* Date Range */}
      <label>Date Range:</label>
      <input
        type="text"
        name="dateRange"
        placeholder="YYYY-MM-DD to YYYY-MM-DD"
        value={filter.dateRange}
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterBar;
