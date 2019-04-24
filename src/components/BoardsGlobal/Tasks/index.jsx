import React, { useContext, useEffect } from 'react'
import { Ctx } from '../../Ctx'

export default ({ boardId, onDrag, listId }) => {
  const { store, dispatch } = useContext(Ctx)
  const { tasks } = store.boards[boardId].lists[listId]
  
  return (
    tasks ?
      tasks.map((taskObject, taskIndex) => {
        return (
          <div
            className="task"
            key={taskIndex}>

            {taskObject.task}
            <span style={{
              fontSize: '.7em'
            }}>{taskObject.time}</span>
          </div>      
        )
      })
    : null
  )
  // let Component;
  // if (tasks !== undefined) {
  //   Component = tasks.map((element, index) => {
      // return (
      //   <div
      //     className="task"
      //     key={index}>

      //       {element}
      //   </div>
      // );
  //   });
  // } else {
  //   Component = null;
  // }
  // return Component;
}

// props
// draggable
// onDrag = { e => onDrag(e, index, listIndex) }