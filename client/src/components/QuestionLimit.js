import React from 'react'

const QuestionLimit = props => {
  const handleSelect = event => {
    props.setQuestionLimit(parseInt(event.target.value))
  }

  return (
    <React.Fragment>
      <p>Select number of questions:</p>
      <select name="limit" id="limit" onChange={ handleSelect }>
        <option></option>
        <option value="3">3</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </React.Fragment>
  )
}

export default QuestionLimit