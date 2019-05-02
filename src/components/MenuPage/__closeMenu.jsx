import React from 'react'

export default ({ dispatch }) => {
  return (
    <span
      className='main_menu_close'
      onClick={() => dispatch({
        category: 'MENU_CASE',
        type: 'SET_MENU_STATE'
      })}>
      x
    </span>
  )
}