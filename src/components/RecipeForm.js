import React from "react";
import ListItems from "./ListItems";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RecipeForm = ({ addNewRecipe }) => {
  const [inputTitle, setInputTitle] = useState();
  const [inputDesc, setInputDesc] = useState();
  const [inputServings, setInputServings] = useState();
  const [inputPrep, setInputPrep] = useState();
  const [inputCook, setInputCook] = useState();
  const [inputDirections, setInputDirections] = useState();
  const [inputIngredients, setInputIngredients] = useState();
  const [inputIngredientsAmount, setInputIngredientsAmount] = useState();
  const [addDirections, setAddDirections] = useState([]);
  const [addIngredients, setAddIngredients] = useState([]);

  const placeHolderImage = {
    full: "/img/queso_brat_scramble.jpg",
    medium: "/img/queso_brat_scramble--m.jpg",
    small: "/img/queso_brat_scramble--s.jpg",
  };

  const handleDirections = (e) => {
    e.preventDefault();
    setAddDirections([...addDirections, inputDirections]);
    setInputDirections("");
  };

  const handleIngredients = (e) => {
    e.preventDefault();
    setAddIngredients([
      ...addIngredients,
      {
        uuid: uuidv4(),
        name: inputIngredients,
        amount: inputIngredientsAmount,
      },
    ]);
    setInputIngredients("");
    setInputIngredientsAmount("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputTitle === "" ||
      inputDesc === "" ||
      inputServings <= 0 ||
      inputPrep <= 0 ||
      inputCook <= 0 ||
      addDirections.length === 0 ||
      addIngredients.length === 0
    ) {
      alert("Invalid Data");
      return;
    } else {
      addNewRecipe({
        uuid: uuidv4(),
        title: inputTitle,
        description: inputDesc,
        servings: Number(inputServings),
        prepTime: Number(inputPrep),
        cookTime: Number(inputCook),
        ingredients: addIngredients,
        directions: addDirections,
        images: placeHolderImage,
      });
      setInputTitle("");
      setInputDesc("");
      setInputServings("");
      setInputPrep("");
      setInputCook("");
      setInputDirections("");
      setInputIngredients("");
      setAddDirections("");
      setAddIngredients("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          onChange={(e) => setInputTitle(e.target.value)}
          type='text'
          placeholder='Title'
          value={inputTitle}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <input
          onChange={(e) => setInputDesc(e.target.value)}
          type='text'
          placeholder='Description'
          value={inputDesc}
        ></input>
      </div>
      <div>
        <label>Servings</label>
        <input
          onChange={(e) => setInputServings(e.target.value)}
          type='number'
          placeholder='Servings'
          value={inputServings}
        ></input>
      </div>
      <div>
        <label>Prep Time</label>
        <input
          onChange={(e) => setInputPrep(e.target.value)}
          type='number'
          placeholder='Prep Time'
          value={inputPrep}
        ></input>
      </div>
      <div>
        <label>Cook Time</label>
        <input
          onChange={(e) => setInputCook(e.target.value)}
          type='number'
          placeholder='Cook Time'
          value={inputCook}
        ></input>
      </div>
      <div>
        {addIngredients && (
          <>
            <div className='header2'>Ingredient List</div>
            <ul>
              <ListItems param={addIngredients} />
            </ul>
          </>
        )}
        <label>Ingredients</label>
        <br></br>
        <input
          onChange={(e) => setInputIngredients(e.target.value)}
          type='text'
          placeholder='Ingredients'
          value={inputIngredients}
        ></input>
        <input
          onChange={(e) => setInputIngredientsAmount(e.target.value)}
          type='text'
          placeholder='Amount'
          value={inputIngredientsAmount}
        ></input>
        <button onClick={(e) => handleIngredients(e)}>Add Ingredient</button>
      </div>
      <div>
        {addDirections && (
          <>
            <div className='header2'>Direction List:</div>
            <ol>
              <ListItems param={addDirections} />
            </ol>
          </>
        )}
        <label>Directions</label>
        <input
          onChange={(e) => setInputDirections(e.target.value)}
          type='text'
          placeholder='Directions'
          value={inputDirections}
        ></input>
        <button onClick={(e) => handleDirections(e)}>Add Direction</button>
      </div>
      <input type='submit' value='Save Recipe' />
    </form>
  );
};

export default RecipeForm;
