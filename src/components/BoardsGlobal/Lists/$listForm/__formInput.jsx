import React, { useContext } from 'react'
import { Ctx } from '../../../Ctx'

export default ({
  state,
  input,
  boardId,
  listId
}) => {
  const { dispatch } = useContext(Ctx)

  return (
      <input 
        type="text"
        className="list_input"
        placeholder="Task name here__"
        value={input}
        style={
          state ?
            { display: "block" }
          : { display: "none" }
        }
        onChange={event => dispatch({
          type: 'SET_LIST_INPUT',
          boardId: boardId,
          listId: listId,
          payload: event.target.value
        })}
      onKeyUp={event => {
       return event.keyCode === 13 ? 
          dispatch({
            type: 'CREATE_TASK',
            boardId: boardId,
            listId: listId,
            payload: event.target.value
          }) : null
      }}
      />
  )
}