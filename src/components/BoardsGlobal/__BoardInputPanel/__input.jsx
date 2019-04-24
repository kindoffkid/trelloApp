import React from 'react'

export default ({ state, inputValue, onChange, addList }) => {
  return(
    <div
      className="board_input"
      style={state ? { display: 'block' } : { display: 'none' }}>
      <input
        type='text'
        name='boardInput'
        value={inputValue}
        onChange={onChange}
        placeholder='List name here__'
        autoComplete='off'
        onKeyUp={event => addList(event)}
      />
    </div>
  )
}
