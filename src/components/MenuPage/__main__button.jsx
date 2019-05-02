import React from 'react'

export default ({ menuState, dispatch }) => {
  return (
    <span
      className='main_title block_section'
      onClick={() =>
        dispatch({
          category: 'MENU_CASE',
          type: 'SET_MENU_STATE'
        })
      }
      style={menuState ? { display: 'none' } : { display: 'block' }}>
      Create new board ->
    </span>
  )
}
