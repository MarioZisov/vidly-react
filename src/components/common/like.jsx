import React from "react";

const Like = props => {
  const class1 = "far fa-heart";
  const class2 = "fas fa-heart";
  let currentClass = "";
  if (props.liked) currentClass = class2;
  else currentClass = class1;
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
      className={currentClass}
    />
  );
};

export default Like;
