import React, { useContext } from 'react'
import { Ctx } from '../Ctx'
import { create } from 'domain';

export default ({ createBoard, dispatch }) => {

  return (
    <div className='main_buttons block_section'>
      <button
        className='main-cancel'
        onClick={() => dispatch({
          category: 'MENU_CASE',
          type: 'CANCEL_CREATE_BOARD'
        })}>
         Cancel
      </button>

      <button
        className='main-create'
        onClick={createBoard}>
          Create
      </button>
    </div>
  )
}

// __button onCLick ===
// onClick = {() => dispatch({ type: 'CREATE_BOARD' })}