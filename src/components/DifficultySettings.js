import React from 'react';

const DifficultySettings = props => {
  const handleChange = event => {
    props.setDifficulty(event.target.value)
  }
  
  return (
    <React.Fragment>
      <p> Select your difficulty </p>
      <div>
        <input 
          type="radio" 
          id="beginner" 
          name="difficulty" 
          value="beginner" 
          onChange={ handleChange }
        />
        <label for="beginner">Beginner</label>
      </div>

      <div>
        <input 
          type="radio" 
          id="intermediate" 
          name="difficulty" 
          value="intermediate" 
          onChange={ handleChange }
        />
        <label for="intermediate">Intermediate</label>
      </div>

      <div>
        <input 
          type="radio" 
          id="advanced" 
          name="difficulty" 
          value="advanced" 
          onChange={ handleChange }
        />
        <label for="advanced">Advanced</label>
      </div>
    </React.Fragment>
  )
}


export default DifficultySettings