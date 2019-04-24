import React, { useState, useContext } from 'react'
 
export default function Lists({ state, lists }) {
  const [listState, setListState] = useState(false);
  const [inputState, setInputState] = useState(false);

  function handleListState() {
    setListState(!listState);
  }
  return (
    <div
      className="list">
      <button
        className="list_menu_btn"
        style={!listState ? { display: "block" } : { display: "none" }}
        onClick={handleListState}>
        press me :)
      </button>
      <div style={listState ? { display: "block" } : { display: "none" }}>
        <input type="text" />
      </div>
     {/* <Tasks tasks={lists.tasks} /> */}
    </div>
  );
}



function Tasks ({tasks}){
  let Component
  if(tasks !== undefined) {
    Component = tasks.map((element, index) => {
      return (
        <div 
          className='task' 
          key={index}>
            {element}
          </div>
      )
    })
  }else {
    Component = null
  }
  return Component
}

function ListName({ name }) {
  return (<div className='list_name'>{name}</div>)
}