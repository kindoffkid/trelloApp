import React, {  useContext } from 'react'
import '../../component-assets/MainPage.scss'
import taskStyles from '../../component-assets/scss/task.module.scss'

import BoardInputPanel from './__BoardInputPanel'
import BoardTitle from './BoardTitle'
import ListForm from './Lists/__listForm'
import { Ctx } from '../Ctx';


/*      BOARD PANEL      */ 
export default ({ url }) => {

  const localBoardIndex =
    parseInt(url.match.params.id)
  
  const { store, dispatch } = useContext(Ctx)
  const { boards } = store

  const handleOnChange = event =>
    dispatch({
      category: 'BOARDS',
      type: 'SET_BOARD_PANEL_INPUT',
      id: localBoardIndex,
      payload: event.target.value
    })

  // CREATE NEW LIST ON KEY "ENTER"
  const handleNewListCreation = (event, _id) => {
    if (event.keyCode === 13 && event.target.value) {
      return (async () => {
        try {
          const url = `/api/lists/newList?listName=${
            event.target.value
          }&boardId=${_id}`
          const createNewList_QUERY = await fetch(url, { method: 'POST' })
          const newList_QUERY_response = await createNewList_QUERY.json()
          if (newList_QUERY_response) {
            return dispatch({
              category: 'LIST_CASE',
              type: 'CREATE_LIST',
              boardIndex: localBoardIndex,
              payload: newList_QUERY_response.data.INSERTED_LIST
            })
          }
        } catch (error) {
          console.error(error)
        }
      })()
    } else {
      return
    }
  }

  // HANDLE DELETE LIST BUTTON
  const handleRemoveListButton = (boardIndex, listIndex, listId) =>
  {
    const boardId =
      boards[localBoardIndex]._id
    
   return (async () => {
      const url = `/api/lists/deleteList?id=${listId}&boardId=${boardId}`
      const deleteList_QUERY = await fetch(url, { method: 'DELETE' })

      const deletelist_QUERY_response = await deleteList_QUERY.json()
      const { status } = deletelist_QUERY_response

      if ( status === '200' ) {
        return dispatch({
          category: 'LIST_CASE',
          type: 'REMOVE_LIST',
          boardIndex: boardIndex,
          listIndex: listIndex
        })
      }
    })()
  }

  // HANDLE THE INPUT BOARD STATE
  const handleBoardState = () => 
    dispatch({
      category: 'BOARDS',
      type: 'SET_BOARD_PANEL_STATE',
      id: localBoardIndex
    })

  //HANDLE onDrop OVER LIST
  const onDropHandler = (event, listIndex, targetListId) => {
    event.preventDefault()
    const { listId, taskId, listIndex: initialList } = store.draggedItem

    console.log(
      '%cDraggin over ME',
      'color: green',
      'LIST_INDEX: ',
      listIndex,
      'TARGET',
      initialList
    )
     return (async () => {
      if (listIndex === initialList) {
        return 
      }
      const url = `/api/lists/taskDragDrop?listId=${listId}&taskId=${taskId}&targetListId=${targetListId}`
      const updateDraggedTask_QUERY = await fetch(url, { method: 'POST' })
      const QUERY_response = await updateDraggedTask_QUERY.json()
      if (QUERY_response) {
        console.log(QUERY_response)
        return dispatch({
          category: 'DRAG_AND_DROP',
          type: 'SET_DROP_ITEM',
          dropTargetList: listIndex
        })
      }
    })()
  }

  if( boards.length > 0 ) {
    const { boardName, lists, panel, _id } = boards[localBoardIndex]
    return (
      <>
        {/* THE HEADER OF BOARD PAGE */}
        <BoardTitle title={boardName} />
        <div className="elem_wrapper">

            {lists ?
              lists.map((elem, listIndex) => {
                return (
                  <div
                    key={elem._id}
                    className='list'
                    onDragOver={event => handleDragOver(event)}
                    onDrop={event => onDropHandler(event, listIndex, elem._id)}
                  >

                    {/* REMOVE LIST BUTTON */}
                    <RemoveListButton
                      onClick={() =>
                        handleRemoveListButton(
                          localBoardIndex,
                          listIndex,
                          elem._id
                        )
                      }
                    />

                    <div className='list_title'>
                      {elem.listName}
                    </div>
                    <ListForm
                      {...elem.form}
                      boardIndex={localBoardIndex}
                      listIndex={listIndex}
                      _listId={elem._id}
                      nickname={store.nickname}
                    />
                    {elem.tasks ?
                      elem.tasks.map((taskObject, taskIndex) => {
                        return (
                          <div
                            key={taskObject._id}
                            className={taskStyles.taskContainer}
                            draggable
                            onDragStart={event => handleDragStart(event,
                              localBoardIndex,
                              listIndex,
                              taskIndex,
                              elem._id,
                              taskObject._id,
                              dispatch)}
                            onDrag={event => handleDrag(event)}>

                            <p className={taskStyles.nicknameWrapper}>
                              by: <span className={taskStyles.nickname}>
                                {taskObject.nickname}
                              </span>
                            </p>
                            <p className={taskStyles.task}>
                              {taskObject.task}
                            </p>
                            <p className={taskStyles.time}
                              style={{ fontSize: '.7em', fontStyle: 'oblique' }}>
                              {taskObject.time}
                            </p>
                          </div>
                        )
                      })
                      : null}
                  </div>
                )
              }) : null}
          
          <BoardInputPanel
            {...panel}
            onChange={handleOnChange}
            createList={event => handleNewListCreation(event, _id)}
            setBoardState={handleBoardState}
          />
        </div>
      </>
    );
  }
  return null
}
function RemoveListButton({onClick}) {
  return (
    <span
      onClick={onClick}
      className='list_closeBtn'>
      x
    </span>
  )
}
function handleDragStart(event, boardIndex, listIndex, taskIndex, listId, taskId, dispatch) {
  console.log( '%cDrag started', 'color: violet', event.target )
  return dispatch({
    type: 'SET_DRAGGED_ITEM',
    category: 'DRAG_AND_DROP',
    boardIndex: boardIndex,
    listIndex: listIndex,
    taskIndex: taskIndex,
    listId: listId, 
    taskId: taskId
  })
}
function handleDrag(event) {
  return event.preventDefault()
}

function handleDragOver(event) {
  event.stopPropagation()
  return event.preventDefault()
}
