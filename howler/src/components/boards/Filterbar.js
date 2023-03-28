import React from 'react';
import './BoardList.css';

function FilterBar(props) {
  const handleFilterChange = (event) => {
    props.setFilterText(event.target.value);
  };

  return (
    <input 
      type={'text'} 
      placeholder={'Filter Boards'} 
      className={'boardFilterBar'} 
      value={props.filterText} 
      onChange={handleFilterChange}
    />
  );
}

export default FilterBar;