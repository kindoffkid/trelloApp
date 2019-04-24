import React, { useState, useContext } from 'react'
import AddListButton from './__addListButton'
import BoardPanelInput from './__input'
import { Ctx } from '../../Ctx';


export default ({ id }) => { 
  const { store, dispatch } = useContext(Ctx)
  const { panel } = store.boards[id]

  const addList = event => {
  console.log( 'adding', event.keyCode )
   return event.keyCode === 13 ? dispatch({
      type: 'CREATE_LIST',
      id: id,
      payload: event.target.value
    }) : undefined
  }

  return(
    <div className='BoardMenu'>
      <AddListButton
          state={panel.state}
          setBoardState={() => dispatch({
            type: 'SET_BOARD_PANEL_STATE',
            id: id
          })}
        />
      <BoardPanelInput
        id={id}    
        state={panel.state}
        inputValue={panel.input}
        addList={addList}
        onChange={event => dispatch({
          type: 'SET_BOARD_PANEL_INPUT',
          id: id,
          payload: event.target.value
        })}
      /> 
    </div>
  )
}

  // {/* addList={event => dispatch({
  //             type: 'ADD_LIST',
  //             name: boardInput,
  //             id: id
  //           }))} */}