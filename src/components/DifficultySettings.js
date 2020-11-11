import React from 'react';

const DifficultySettings = props => {
  const handleChange = event => {
    props.setDifficulty(event.target.value)
  }
  
  return (
    <React.Fragment>
      
      <div>
      <p> Select your difficulty </p>
        <input 
          type="radio" 
          id="beginner" 
          name="difficulty" 
          value="beginner" 
          onChange={ handleChange }
        />
        <label htmlFor="beginner">Beginner</label>
      </div>

      <div>
        <input 
          type="radio" 
          id="intermediate" 
          name="difficulty" 
          value="intermediate" 
          onChange={ handleChange }
        />
        <label htmlFor="intermediate">Intermediate</label>
      </div>

      <div>
        <input 
          type="radio" 
          id="advanced" 
          name="difficulty" 
          value="advanced" 
          onChange={ handleChange }
        />
        <label htmlFor="advanced">Advanced</label>
      </div>
    </React.Fragment>
  )
}


export default DifficultySettings