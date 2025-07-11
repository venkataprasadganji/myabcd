import React from 'react';
import '../styles/FilterBar.css';

const FilterBar = ({ filters, setFilters, applyFilters }) => {
  const years = ['2025', '2024', '2023'];
  const months = [...Array(12)].map((_, i) => (i + 1).toString().padStart(2, '0'));
  const dates = [...Array(31)].map((_, i) => (i + 1).toString().padStart(2, '0'));
  const topics = ['Polity', 'Economy', 'Environment', 'Science & Tech', 'International Relations', 'Defence', 'General'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ year: '', month: '', date: '', topic: '', timeRange: '' });
    applyFilters();
  };

  return (
    <div className="filter-bar">
      <select name="year" value={filters.year} onChange={handleChange}>
        <option value="">Year</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>

      <select name="month" value={filters.month} onChange={handleChange}>
        <option value="">Month</option>
        {months.map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <select name="date" value={filters.date} onChange={handleChange}>
        <option value="">Date</option>
        {dates.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      <select name="topic" value={filters.topic} onChange={handleChange}>
        <option value="">Topic</option>
        {topics.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      <select name="timeRange" value={filters.timeRange} onChange={handleChange}>
        <option value="">Time Range</option>
        <option value="lastWeek">Last Week</option>
        <option value="lastMonth">Last Month</option>
      </select>

      <button className="apply-button" onClick={applyFilters}>Apply</button>
      <button className="reset-button" onClick={handleReset}>Reset</button>
    </div>
  );
};

export default FilterBar;
