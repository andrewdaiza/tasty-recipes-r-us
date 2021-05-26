import React from "react";

const ListItems = ({ param }) => {
  return (
    <>
      {param.map((param) => (
        <li>
          <span>{param.amount || param.instructions} </span>
          <span> {param.measurement || param.optional} </span>
          {param.name}
        </li>
      ))}
    </>
  );
};

export default ListItems;
