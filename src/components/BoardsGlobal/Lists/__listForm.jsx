import React, { useContext } from 'react'
import { Ctx } from '../../Ctx'
export default ({
  input,
  state,
  boardIndex,
  listIndex,
  nickname,
  _listId,
  // LOG CREATION
  _boardId,
  boardName,
}) => {

  const { dispatch } = useContext(Ctx)

  // FORM BUTTON HANDLER (ADD TASK BUTTON)
  const handleListFormState = () => {
    console.log('boardIndex', boardIndex,
    '\n',
    'listIndex', listIndex)
    dispatch({
      category: 'LIST_CASE',
      type: 'SET_LIST_STATE',
      boardIndex: boardIndex,
      listIndex: listIndex
    })
  }

  // FORM INPUT onChange HANDLER (INPUT FOR NEW TASK)
  const handleListFormInputOnChange = event => {
    return dispatch({
      category: 'LIST_CASE',
      type: 'SET_LIST_INPUT',
      boardIndex: boardIndex,
      listIndex: listIndex,
      payload: event.target.value
    })
  }

  // HANDLE CREATE NEW TASK ON KEY "ENTER"
  const handleTaskCreationOnKeyUp = event => {
    if (
      event.keyCode === 13
      && event.target.value) {
      return (async () => {
        const createTaskUrl = `/api/lists/addTask?id=${_listId}&nickname=${nickname}&task=${event.target.value}&time=${Date.now()}`

        const createLogUrl = `/api/logs/new?nickname=${nickname}&task=${event.target.value}&boardId=${_boardId}`

        const createNewTask_QUERY = await fetch(createTaskUrl, { method: 'POST' })

        const createNewLog_QUERY = await fetch(createLogUrl, { method: 'POST' })

        const { status:
          logQueryStatus,
          data: logQueryData} = await createNewLog_QUERY.json()

        const { status, data:list } = await createNewTask_QUERY.json()
        status === '200' && dispatch({
          category: 'TASK_CASE',
          type: 'CREATE_TASK',
          boardIndex: boardIndex,
          listIndex: listIndex,
          payload: list,
          log: logQueryData
        })
      })()
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
        onKeyUp={handleTaskCreationOnKeyUp}
      />
    </div>
  )
}