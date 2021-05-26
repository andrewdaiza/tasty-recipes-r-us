import React from "react";
import Special from "./Special";

const Ingredients = ({ ingredient, specialsData }) => {
  return (
    <>
      <li>
        <span>
          {ingredient.amount}
          <span> {ingredient.measurement} </span>
        </span>
        {ingredient.name}

        {specialsData.map(
          (sData) =>
            ingredient.uuid === sData.ingredientId && <Special sData={sData} />
        )}
      </li>
    </>
  );
};

export default Ingredients;
