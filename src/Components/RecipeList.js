import React, { useContext } from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App'


export default function RecipeList({ recipes }) {
  // const value = useContext(recipeContext)
  const { handleRecipeAdd } = useContext(RecipeContext)

  return (
    <div className='recipe-list'>
      <div>
      {recipes.map(recipe => {
        return (
          <Recipe key={recipe.id} {...recipe} />  //passing all items in the array as props
        )
      })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button 
          className="btn btn--primary"
          onClick={handleRecipeAdd}
        >
          Add Recipe
        </button>
      </div>
    </div>
  )
}
