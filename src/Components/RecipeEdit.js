import React, {useContext} from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'
import {v4 as uuidv4} from "uuid";


export default function RecipeEdit({ recipe }) {
  const {handleRecipeChange, handleRecipeSelect} = useContext(RecipeContext)

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes })  //inside of this object with two ... ...were taking everything from recipe and adding everytiong from changes and overriding everyhing in changes. Overriding the name in recipe with the name in changes for example.
  }

  function handleIngredientChange(id, ingredient){
    const newIngredients = [...recipe.ingredients]
    const index = newIngredients.findIndex(ing => ing.id === id) 
    newIngredients[index] = ingredient  //the newRingredients array is the same as old ingredients array but it has the ingredient we changed replacing the ingredient of the id we passed in. We swaped in one of the ingredients in the array
    handleChange({ingredients:newIngredients})
  }

  function handleIngredientAdd(){
    const newIngredient = {
      id: uuidv4(),
      name: '',
      amount: ''
    }
    handleChange({ ingredients: [...recipe.ingredients, newIngredient]})
  }  

  function handleIngredientDelete(id) {
    handleChange({
      ingredients: recipe.ingredients.filter(ing => ing.id !== id)  //give me all ingredients that do not have this id. We end up with all the ingredients minus the one with the id we want to remove
    })
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button 
          className="btn recipe-edit__remove-button"
          onClick={() => handleRecipeSelect(undefined)} //undefined in order to select nothing. Our selected recipe id is set to undefined so it renders nothing. 
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label 
          htmlFor="name" 
          className="recipe-edit__label">
            Name
        </label>  
        <input 
          type="text" 
          name="name" 
          id="name" 
          value={recipe.name}
          onChange={e => handleChange({ name : e.target.value })}
          className="recipe-edit__input"/>
        <label 
          htmlFor="cookTime"
          className="recipe-edit__label">
            Cook Time</label>  
        <input 
          type="text" 
          name="cookTime" 
          id="cookTime" 
          value={recipe.cookTime}
          onChange={e => handleChange({ cookTime : e.target.value })}
          className="recipe-edit__input"/>
        <label 
          htmlFor="servings"
          className="recipe-edit__label">
            Servings
        </label>  
        <input 
          type="number" 
          min="1" 
          name="servings" 
          id="servings" 
          value={recipe.servings}
          onChange={e => handleChange({ servings : parseInt(e.target.value) || '' })} //target.value converts all to strings so will need to convert back to int with parseInt, if not possible it'll turn it into '' to avoid NaN
          className="recipe-edit__input"/>
        <label 
          htmlFor="instructions"
          className="recipe-edit__label">
            Instructions
        </label>
        <textarea 
          name="instructions" 
          className="recipe-edit__input"
          onChange={e => handleChange({ instructions : e.target.value })} 
          value={recipe.instructions}
          id="instructions"/>
      </div>
      <br/>
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map(ingredient => (
          <RecipeIngredientEdit 
            key={ingredient.id} 
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            ingredient={ingredient}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button 
          className="btn btn--primary"
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  )
}
