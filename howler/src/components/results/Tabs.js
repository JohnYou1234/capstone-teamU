import React from 'react';

function Tab({ name, active, onClick }) {
  const activeStyle = {
    backgroundColor: 'rgb(166, 121, 202)',
    color: '#fff',
    borderRadius: '10px',
    padding: '0.5rem',
  };

  return (
    <div
      onClick={onClick}
      className="tab"
      style={active ? activeStyle : null}
    >
      {name}
    </div>
  );
}
function Tabs({ activeTab, handleTabClick, noBoard }) {
  let categories = ["Posts", "Comments", "Packs"];
  if (noBoard) categories = ["Posts", "Comments"]

  return (
    <div className="tab-wrapper">
      {categories.map((category) => (
        <Tab
          key={category}
          name={category}
          active={activeTab === category}
          onClick={() => handleTabClick(category)}
        />
      ))}
    </div>
  );
}

export default Tabs;