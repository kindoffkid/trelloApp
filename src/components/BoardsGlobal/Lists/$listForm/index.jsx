import React, { useContext } from 'react'
import { Ctx } from '../../../Ctx'
export default ({
  input,
  state,
  boardIndex,
  listIndex,
  _listId,
  nickname
}) => {

  const { dispatch } = useContext(Ctx)

  // FORM BUTTON HANDLER (ADD TASK BUTTON)
  const handleListFormState = () => {
    console.log('boardIndex', boardIndex,
    '\n',
    'listIndex', listIndex)
    dispatch({
      type: 'SET_LIST_STATE',
      boardIndex: boardIndex,
      listIndex: listIndex
    })
  }

  // FORM INPUT onChange HANDLER (INPUT FOR NEW TASK)
  const handleListFormInputOnChange = event => {
    return dispatch({
      type: 'SET_LIST_INPUT',
      boardIndex: boardIndex,
      listIndex: listIndex,
      payload: event.target.value
    })
  }

  // HANDLE CREATE NEW TASK ON KEY "ENTER"
  const handleTaskCreationOnKeyUp = event => {
    if (event.keyCode === 13) {
      const createrOfTask = async () => {
        const url = `/api/lists/addTask?id=${_listId}&nickname=${nickname}&task=${event.target.value}&time=${Date.now()}`
        const createNewTask_QUERY = await fetch(url, { method: 'POST' })
        const { status, data:list } = await createNewTask_QUERY.json()
        status === '200' && dispatch({
        type: 'CREATE_TASK',
          boardIndex: boardIndex,
          listIndex: listIndex,
          payload: list
        })
      }
      return createrOfTask()
    } else {
      return 
    }
  }

  return (
    <div className='list_form'>
      <button
        className='list_btn'
        style={!state ? { display: 'block' } : { display: 'none' }}
        onClick={handleListFormState}>
        Add Task
      </button>

      <input
        type='text'
        className='list_input'
        placeholder='Task name here__'
        value={input}
        style={state ? { display: 'block' } : { display: 'none' }}
        onChange={handleListFormInputOnChange}
        onKeyUp={event => handleTaskCreationOnKeyUp(event)}
      />
    </div>
  )
}