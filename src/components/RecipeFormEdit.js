import React from "react";
import ListItems from "./ListItems";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const RecipeForm = ({ editRecipe, selectedRecipe }) => {
  const [inputTitle, setInputTitle] = useState();
  const [inputDesc, setInputDesc] = useState();
  const [inputServings, setInputServings] = useState();
  const [inputPrep, setInputPrep] = useState();
  const [inputCook, setInputCook] = useState();
  const [inputDirections, setInputDirections] = useState();
  const [inputDirectionsOptional, setInputDirectionsOptional] = useState(false);
  const [inputIngredients, setInputIngredients] = useState();
  const [inputIngredientsAmount, setInputIngredientsAmount] = useState();
  const [inputIngredientsMeasurement, setInputIngredientsMeasurement] =
    useState();
  const [addDirections, setAddDirections] = useState([]);
  const [addIngredients, setAddIngredients] = useState([]);

  useEffect(() => {
    editForm();
  }, [selectedRecipe]);

  const editForm = () => {
    if (selectedRecipe) {
      setInputTitle(selectedRecipe.title);
      setInputDesc(selectedRecipe.description);
      setInputServings(selectedRecipe.servings);
      setInputPrep(selectedRecipe.prepTime);
      setInputCook(selectedRecipe.cookTime);
      setAddIngredients(selectedRecipe.ingredients);
      setAddDirections(selectedRecipe.directions);
    }
  };

  const handleDirections = (e) => {
    e.preventDefault();
    if (inputDirections === "") {
      alert("Please enter an ingredient and amount");
      return;
    } else {
      setAddDirections([
        ...addDirections,
        {
          instructions: inputDirections,
          optional: Boolean(inputDirectionsOptional),
        },
      ]);
    }
    setInputDirections("");
    setInputDirectionsOptional("");
  };

  const handleIngredients = (e) => {
    e.preventDefault();
    if (
      inputIngredients === "" ||
      inputIngredientsMeasurement === "" ||
      inputIngredientsAmount <= 0
    ) {
      alert("Please enter an ingredient and amount");
      return;
    } else {
      setAddIngredients([
        ...addIngredients,
        {
          uuid: uuidv4(),
          name: inputIngredients,
          amount: Number(inputIngredientsAmount),
          measurement: inputIngredientsMeasurement,
        },
      ]);
    }
    setInputIngredients("");
    setInputIngredientsAmount("");
    setInputIngredientsMeasurement("");
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
      editRecipe({
        uuid: selectedRecipe.uuid,
        title: inputTitle,
        description: inputDesc,
        servings: Number(inputServings),
        prepTime: Number(inputPrep),
        cookTime: Number(inputCook),
        ingredients: addIngredients,
        directions: addDirections,
        images: selectedRecipe.images,
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
      setInputIngredientsAmount("");
      setInputIngredientsMeasurement("");
      setInputDirectionsOptional(false);
    }
  };
  return (
    <form className='container flex-center' onSubmit={handleSubmit}>
      <div className='header'>Edit Recipe</div>
      <div className='form-div'>
        <label>Title</label>
        <input
          onChange={(e) => setInputTitle(e.target.value)}
          type='text'
          placeholder='Title'
          value={inputTitle}
        ></input>
      </div>
      <div className='form-div'>
        <label>Description</label>
        <input
          onChange={(e) => setInputDesc(e.target.value)}
          type='text'
          placeholder='Description'
          value={inputDesc}
        ></input>
      </div>
      <div className='form-div'>
        <label>Servings</label>
        <input
          onChange={(e) => setInputServings(e.target.value)}
          type='number'
          placeholder='Servings'
          value={inputServings}
        ></input>
      </div>
      <div className='form-div'>
        <label>Prep Time</label>
        <input
          onChange={(e) => setInputPrep(e.target.value)}
          type='number'
          placeholder='Prep Time'
          value={inputPrep}
        ></input>
      </div>
      <div className='form-div'>
        <label>Cook Time</label>
        <input
          onChange={(e) => setInputCook(e.target.value)}
          type='number'
          placeholder='Cook Time'
          value={inputCook}
        ></input>
      </div>
      <div className='form-div'>
        {addIngredients && (
          <>
            <div className='header2'>Ingredient List</div>
            <ul>
              <ListItems param={addIngredients} />
            </ul>
          </>
        )}
        <label>Ingredients</label>
        <input
          onChange={(e) => setInputIngredients(e.target.value)}
          type='text'
          placeholder='Name'
          value={inputIngredients}
        ></input>
        <input
          onChange={(e) => setInputIngredientsMeasurement(e.target.value)}
          type='text'
          placeholder='Measurement'
          value={inputIngredientsMeasurement}
        ></input>
        <input
          onChange={(e) => setInputIngredientsAmount(e.target.value)}
          type='number'
          placeholder='Amount'
          value={inputIngredientsAmount}
        ></input>
        <button onClick={(e) => handleIngredients(e)}>Add Ingredient</button>
      </div>
      <div className='form-div'>
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
        <label>Required</label>
        <input
          onChange={() => setInputDirectionsOptional(!inputDirectionsOptional)}
          type='checkbox'
          checked={inputDirectionsOptional}
        ></input>
        <button onClick={(e) => handleDirections(e)}>Add Direction</button>
      </div>
      <input type='submit' value='Save Recipe' />
    </form>
  );
};

export default RecipeForm;
