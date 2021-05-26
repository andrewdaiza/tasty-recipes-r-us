import React from "react";

const ListItems = ({ param }) => {
  return (
    <>
      {param.map((param) => (
        <li>{param}</li>
      ))}
    </>
  );
};

export default ListItems;
