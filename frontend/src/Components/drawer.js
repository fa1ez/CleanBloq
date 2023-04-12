import React from 'react';
import './drawer.css';

export default function Drawer({ setGraphs }) {
  const handleClick = (value) => {
    setGraphs(value);
  };

  return (
    <div className="drawer-container">
      <h2>Statistics</h2>
      <ul>
        <li>
          <button onClick={() => handleClick('home')}>Home</button>
        </li>
        <li>
          <button onClick={() => handleClick('city')}>City wise detection</button>
        </li>
        <li>
          <button onClick={() => handleClick('daily')}>Daily Detections</button>
        </li>
        <li>
          <button onClick={() => handleClick('hourly')}>Hourly detections</button>
        </li>
        <li>
          <button onClick={() => handleClick('resolve')}>Resolved/Unresolved cases</button>
        </li>
      </ul>
    </div>
  );
}
