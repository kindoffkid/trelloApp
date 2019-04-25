import React from 'react'
export default ({
  state,
  input,
  onChange,
  createList,
  setBoardState
}) => { 
    return(
    <div className='BoardMenu'>
      <button
        type='button'
        style={
          !state ?
            { display: 'block' }
          : { display: 'none' }
        }
        onClick={setBoardState}
        className='board_addBtn'>
          Add list
       </button>
      <div
        className="board_input"
        style={
          state ?
            { display: 'block' }
          : { display: 'none' }}>
        
        <input
          type='text'
          name='boardInput'
          value={input}
          onChange={onChange}
          placeholder='List name here__'
          autoComplete='off'
          onKeyUp={event => createList(event)}
        />
      </div>
    </div>
  )
}
