import React, { useState, useContext } from 'react'
import '../../component-assets/MainPage.scss'

import BoardInputPanel from './__BoardInputPanel'
import BoardTitle from './BoardTitle'
import Lists from './Lists'
import { Ctx } from '../Ctx';

/*      BOARD PANEL      */ 
export default ({ url }) => {

  const localBoardIndex =
    parseInt(url.match.params.id)
  
  const { store, dispatch } = useContext(Ctx)
  const { boards } = store

  const handleOnChange = event =>
    dispatch({
      type: 'SET_BOARD_PANEL_INPUT',
      id: localBoardIndex,
      payload: event.target.value
    })

  // CREATE NEW LIST ON KEY "ENTER"
  const handleNewListCreation = (event, _id) => {
    if (event.keyCode === 13) {
      const fetcher = async () => {
        try {
          const url = `/api/lists/newList?listName=${event.target.value}&boardId=${_id}`
          const createNewList_QUERY =
            await fetch(
              url,
              { method: 'POST', })
          const newList_QUERY_response =
            await createNewList_QUERY.json()
          if (newList_QUERY_response) {
            return dispatch({
              type: 'CREATE_LIST',
              boardIndex: localBoardIndex,
              payload: newList_QUERY_response.data.INSERTED_LIST
            })
          }
        } catch (error) {
          console.error(error)
        }
      }
      fetcher()
    } else {
      return
    }
  }

  // HANDLE DELETE LIST BUTTON
  const handleRemoveListButton =  (boardIndex, listIndex, listId) =>
  {
    const boardId =
      boards[localBoardIndex]._id
    
    const fetcher = async () => {
      const url = `/api/lists/deleteList?id=${listId}&boardId=${boardId}`
     

      const deleteList_QUERY = await fetch(url, { method: 'DELETE' })

      const deletelist_QUERY_response = await deleteList_QUERY.json()
      const { status } = deletelist_QUERY_response

      if ( status === '200' ) {
        return dispatch({
          type: 'REMOVE_LIST',
          boardIndex: boardIndex,
          listIndex: listIndex
        })
      }
    }
   return fetcher()
  }

  // HANDLE THE INPUT BOARD STATE
  const handleBoardState = () => 
    dispatch({
      type: 'SET_BOARD_PANEL_STATE',
      id: localBoardIndex
    })

  if(boards.length > 0) {
    const { boardName, lists, panel, _id } = boards[localBoardIndex]
    return (
      <>

        {/* THE HEADER OF BOARD PAGE */}
        <BoardTitle title={boardName} />
        <div className="elem_wrapper">

          <>
            {lists ?
              lists.map((elem, listIndex) => {
                return (
                  <div
                    key={elem._id}
                    className='list'>

                    {/* REMOVE LIST BUTTON */}
                    <span
                      onClick={() => handleRemoveListButton(localBoardIndex, listIndex, elem._id)}
                      className='list_closeBtn'>
                        X
                    </span>
                    <div className='list_title'>
                      {elem.listName}
                    </div>
                    {/* <ListForm
                      form={elem.form}
                      boardId={id}
                      listId={listIndex} /> */}
                    {/* <Tasks boardId={id} listId={index} /> */}
                  </div>
                )
              }) : null}
          </>

          {/* <Lists boardId={boardId} /> */}

          {/* <Lists
            lists={lists}
            id={id}
            setBoards={setBoards}
            boards={boards}
          /> */}

          <BoardInputPanel
            {...panel}
            onChange={handleOnChange}
            createList={event => handleNewListCreation(event, _id)}
            setBoardState={handleBoardState}
          />

          {/* <>
            <AddListButton
              state={boardState}
              setBoardState={setBoardState}
            />
            <BoardInput
              state={boardState}
              inputValue={boardInput}
              onChange={setBoardInput}
              addList={addList}
            /> 
          </> */}
        </div>
      </>
    );
  }
  return null
}
















// ADD LIST BUTTON
function AddListButton({state, setBoardState}){
  return (
    <button
      type='button'
      style={
        !state ? { display: 'block' } : { display: 'none' }
      }
      onClick={setBoardState}
      className='board_addBtn'>Add list
    </button>
  )
}


function Listss ({ lists, id, boards, setBoards}) {  
  const [inputValue, setInputValue] = useState('')
  const [ draggedItem, setDraggedItem ] = useState({body: '', index: null})

  // SET LIST STATE
  function setListState(listIndex) {
    const newBoard = boards.map(elem => {
      elem.lists.map((e, i) => {
        if (i === listIndex) {
          e.listState = !e.listState;
          return e;
        }
        return e;
      });
      return elem;
    });
    setBoards(newBoard);
  }
  
  // ADD LIST TASK
  function onKeyUp( event, listIndex ) {
    if( event.keyCode === 13 ) {

      const updatedBoard = boards.map((elem, index) => {

        const newLists = elem.lists.map((e, i) =>{
          const tasks = [ ...e.tasks, e.listInput ]

          if(i === listIndex){
            e.tasks = tasks
            return e
          }
          return e
        })
        return elem
      })
      setListInput('', listIndex)
      setListState(listIndex)
    }
  }

  function closeList(event, listIndex) {
    event.preventDefault()

    const filteredBoard = boards.map((e,i)=>{
     const filteredList = e.lists.filter((el, index) => {
        return listIndex !== index
      })  
      e.lists = filteredList
      return e
    })

    setBoards(filteredBoard);
  }
  // SET LIST INPUT
  function setListInput(value, listIndex) {
    const newBoard = listInputSetter(value, listIndex, boards)
    setBoards(newBoard)
  }
  // DRAG FUNCTIONALITY
  function onDrag(event, taskIndex, listIndex){
    setDraggedItem({
      body: boards[id].lists[listIndex].tasks[taskIndex],
      index: taskIndex,
      listIndex: listIndex
    });
  }

  function onDragOver(event) {
    event.preventDefault()
  }
  function onDrop(event, droppedOverIndex, ){
    const { index, body, listIndex } = draggedItem
    if(listIndex === droppedOverIndex) {
      return
    }
    const renewedBoard = boards.map((elem) => {
        elem.lists.map((e,i) => {
          if(i === listIndex) {
            const tasks = e.tasks.filter((element, ind) => {
              return ind !== index
            })
            e.tasks = tasks
            return e
          }
          if(i === droppedOverIndex) {
            const tasks = [...e.tasks, body]
            e.tasks = tasks
            return e
          }
          return e
        })
        return elem
    })
    setBoards(renewedBoard)
  }
  
  const Lists = lists.map((elem, index) => {
    return (
      <div
        key={index}
        className="list"
        onDragOver={e => onDragOver(e)}
        onDrop={event => onDrop(event, index)}
      >
        <span
          className="list_closeBtn"
          onClick={event => closeList(event, index)}
        >
          x
        </span>
        <ListName name={elem.name} />
        <div className="list_form">
          <button
            className="list_btn"
            style={
              !elem.listState ? { display: "block" } : { display: "none" }
            }
            onClick={() => setListState(index)}
          >
            Add task
          </button>
          <input
            type="text"
            className="list_input"
            placeholder="Task name here__"
            style={
              elem.listState ? { display: "block" } : { display: "none" }
            }
            value={elem.listInput}
            onChange={e => setListInput(e.target.value, index)}
            onKeyUp={event => onKeyUp(event, index)}
          />
        </div>
        <Tasks tasks={elem.tasks} onDrag={onDrag} listIndex={index} />
      </div>
    );
  }
)

  return (
    <>
      {Lists}
    </>
  )
}

function ListName({ name }) {
  return <div className="list_title">{name}</div>;
}

function Tasks({ tasks, onDrag, listIndex}) {

  let Component;
  if (tasks !== undefined) {
    Component = tasks.map((element, index) => {
      return (
        <div 
          className="task" 
          draggable
          key={index}
          onDrag={e => onDrag(e, index, listIndex)}
        >
          
          {element}
        </div>
      );
    });
  } else {
    Component = null;
  }
  return Component;
}


function BoardInput ({state, inputValue, onChange, addList}) {
  return(
    <div
      className="board_input"
      style={state ? { display: 'block' } : { display: 'none' }}>
      <input
        type='text'
        name='boardInput'
        value={inputValue}
        onChange={e => onChange(e.target.value)}
        onKeyUp={e => addList(e)}
        placeholder='List name here__'
        autoComplete='off'
      />
    </div>
  )
}




/*     HELPERS      */

function listInputSetter(value, listIndex, boards) {
  const newBoard = boards.map(elem => {
    elem.lists.map((e, i) => {
      if (i === listIndex) {
        e.listInput = value;
        return e;
      }
      return e;
    });
    return elem;
  }); 
  return newBoard
}
