import React from 'react'

export default ({ menuState, onClick }) => {
  return (
    <span
      className='main_title block_section'
      onClick={onClick}
      style={menuState ? { display: 'none' } : { display: 'block' }}
    >
      Create new board ->
    </span>
  )
}
