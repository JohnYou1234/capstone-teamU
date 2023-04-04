import React, { useState } from 'react';
import './FilterBox.css';

const FilterDropdown = (props) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    props.onSelect(e.target.value);
  };

  return (
    <div className="filter-dropdown">
      <label htmlFor={props.name}>{props.label}</label>
      <select className='dd-box' name={props.name} id={props.name} value={selectedOption} onChange={handleChange}>
        <option value="All">All</option>
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option}>{option}</option>
          );
        })}
      </select>
    </div>
  );
};

function FilterBox(props) {
  const handleCategorySelect = (category) => {
    props.onCategorySelect(category);
  };

  const handlePostTypeSelect = (postType) => {
    props.onPostTypeSelect(postType);
  };
  

  const categories = ["Advice", "Emotional Support", "Introduction", "Rant/Vent", "Self Improvement"];
  const postTypes = ["Text", "Image", "Poll"];

  return (
    <div className="filter-box">
      <div className="filter-icon">
        <i className="fas fa-filter"></i>
      </div>
      <FilterDropdown name="category-select" label="Category:" options={categories} onSelect={handleCategorySelect} />
      <FilterDropdown name="post-type-select" label="Post Type:" options={postTypes} onSelect={handlePostTypeSelect} />
    </div>
  );
}

export default FilterBox;
