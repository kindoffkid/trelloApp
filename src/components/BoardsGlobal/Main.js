import React, { useState, useContext } from 'react'
import '../../component-assets/MainPage.scss'

import BoardInputPanel from './__BoardInputPanel'
import BoardTitle from './BoardTitle'
import Lists from './Lists'
import { Ctx } from '../Ctx';


/*      BOARD PANEL      */ 
export default ({ url }) => {
  const id = parseInt(url.match.params.id)
  const { store } = useContext(Ctx)
  const { boards } = store

  if(boards.length > 0) {
    const { boardName, lists } = boards[id]
    return (
      <>

        {/* THE HEADER OF BOARD PAGE */}
        <BoardTitle title={boardName} />
        <div className="elem_wrapper">
          <Lists id={id} />

          {/* <Lists
            lists={lists}
            id={id}
            setBoards={setBoards}
            boards={boards}
          /> */}
          <BoardInputPanel id={id} />

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
