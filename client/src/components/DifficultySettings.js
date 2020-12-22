import React from 'react';

const DifficultySettings = props => {
  const handleChange = event => {
    if (event.target.value === 'beginner') {
      props.setTimeLimit(10000)
    } else if (event.target.value === 'intermediate') {
      props.setTimeLimit(5000)
    } else if (event.target.value === 'advanced') {
      props.setTimeLimit(3000)
    }
  }
  
  return (
    <React.Fragment>
      <div>
      <p>Select your difficulty</p>
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