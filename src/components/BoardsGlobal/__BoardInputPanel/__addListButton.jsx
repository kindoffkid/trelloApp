import React from 'react'

export default ({state, setBoardState}) => {
  return (
    <button
      type='button'
      style={
        !state ? { display: 'block' } : { display: 'none' }
      }
      onClick={setBoardState}
      className='board_addBtn'>Add list
    </button>
  )
}
