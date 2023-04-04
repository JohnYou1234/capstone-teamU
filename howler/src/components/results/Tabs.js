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

function Tabs({ activeTab, handleTabClick }) {
  return (
    <div className="tab-wrapper">
      <Tab
        name="Posts"
        active={activeTab === 'Posts'}
        onClick={() => handleTabClick('Posts')}
      />
      <Tab
        name="Comments"
        active={activeTab === 'Comments'}
        onClick={() => handleTabClick('Comments')}
      />
      <Tab
        name="Boards"
        active={activeTab === 'Boards'}
        onClick={() => handleTabClick('Boards')}
      />
    </div>
  );
}

export default Tabs;