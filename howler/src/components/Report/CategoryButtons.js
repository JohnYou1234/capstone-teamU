import React from 'react';
import { Button } from 'react-bootstrap';

function CategoryButton({ category, index, selected, setSelected}) {
    return (
        <Button
        key={index}
        className={`category-btn m-2`}
        variant="outline-dark"
        onClick={() => setSelected(index)}
        active={selected === index}
        style={{
          borderRadius: '25px',
          minWidth: '110px',
          minHeight: '60px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        }}
      >
        {category}
      </Button>
    )
}

function CategoryButtons({ selected, setSelected}) {
  const categories = [
    'Spam',
    'Inappropriate Content',
    'Harassment',
    'Academic Dishonesty',
    'Violence',
    'Threats',
    'Other',
  ];
  return (
    <div className="d-flex flex-wrap justify-content-around">
    {categories.map((category, index) => {

      return (
        <CategoryButton 
          category={category}
          key={index}
          index={index}
          selected={selected}
          setSelected={setSelected}
        />
      )})}
  </div>
  )
}

export default CategoryButtons;