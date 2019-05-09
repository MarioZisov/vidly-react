import React from "react";

const ListGroup = props => {
  const { items, selectedItem, textProp, valueProp, onClick } = props;

  return (
    <div className="list-group">
      {items.map(item => (
        <button
          key={item[valueProp]}
          type="button"
          onClick={() => onClick(item[valueProp])}
          className={
            selectedItem[valueProp] === item[valueProp]
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
        >
          {item[textProp]}
        </button>
      ))}
    </div>
  );
};

export default ListGroup;
