import React, { useContext } from 'react'
import { Ctx } from '../Ctx'

export default () => {
  const { dispatch } = useContext(Ctx)
  return (
    <div
      className='main_buttons block_section'>
      
      <button
        className='main-cancel'
        onClick={() =>
          dispatch({ type: 'CANCEL_CREATE_BOARD' })}>
        Cancel
      </button>

      <button
        className='main-create'
        onClick={() =>
        dispatch({ type: 'CREATE_BOARD' })}>
          Create
      </button>

    </div>
  )
}