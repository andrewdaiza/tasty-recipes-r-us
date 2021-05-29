import React from "react";
import Special from "./Special";

const ListItems = ({ param, specialsData }) => {
  return (
    <>
      <li>
        <span>{param.amount || param.instructions} </span>
        <span> {param.measurement || param.optional} </span>
        {param.name}
      </li>
      {specialsData &&
        specialsData.map(
          (sData) =>
            param.uuid === sData.ingredientId && (
              <Special key={sData.uuid} sData={sData} />
            )
        )}
    </>
  );
};

export default ListItems;
