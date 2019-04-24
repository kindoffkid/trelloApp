import React, { useContext } from 'react'
import { Ctx } from '../../../Ctx';

export default ({ state, boardId, listId }) => {
  const { dispatch } = useContext(Ctx)

  return (
      <button 
        className='list_btn'
        style={
          !state ?
            { display: "block" } :
            { display: "none" }
        }
      
        onClick={() => dispatch({
          type: 'SET_LIST_STATE',
          boardId: boardId,
          listId: listId
        })
      }>  
          Add Task
      </button>
  )
}