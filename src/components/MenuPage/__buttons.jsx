import React, { useContext } from 'react'
import { Ctx } from '../Ctx'

export default ({ handleNewBoardCreation }) => {
  const { dispatch } = useContext(Ctx)
  return (
    <div className='main_buttons block_section'>
      <button
        className='main-cancel'
        onClick={() => dispatch({ type: 'CANCEL_CREATE_BOARD' })}>
        Cancel
      </button>

      <button
        className='main-create'
        onClick={handleNewBoardCreation}
      >
        Create
      </button>
    </div>
  )
}

// __button onCLick ===
// onClick = {() => dispatch({ type: 'CREATE_BOARD' })}