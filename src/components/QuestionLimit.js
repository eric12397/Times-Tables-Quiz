import React from 'react'

const QuestionLimit = props => {
  const handleSelect = event => {
    props.setQuestionLimit(event.target.value)
  }

  return (
    <React.Fragment>
      <label for="limit">Select number of questions:</label>
      <select name="limit" id="limit" onChange={ handleSelect }>
        <option></option>
        <option value="2">2</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </React.Fragment>
  )
}

export default QuestionLimit