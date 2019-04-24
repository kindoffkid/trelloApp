import React from 'react'

export default ({ dispatch }) => {
  return (
    <span
      className='main_menu_close'
      onClick={() => dispatch({type: 'SET_MENU_STATE'})}>
      x
    </span>
  )
}