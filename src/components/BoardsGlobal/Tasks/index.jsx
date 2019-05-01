import React, { useContext, useEffect } from 'react'
// import { Ctx } from '../../Ctx'

export default ({ tasks }) => {
  // const { store, dispatch } = useContext(Ctx)
  // const { tasks } = store.boards[boardId].lists[listId]
  return (
    tasks ?
      tasks.map((taskObject, taskIndex) => {
        return (
          <div
            draggable
            className="task"
            key={taskObject._id}>
            <p>{taskObject.nickname}</p>
              {taskObject.task}
            <p style={{fontSize: '.7em', fontStyle: 'oblique'}}>
              {taskObject.time}
            </p>
          </div>      
        )
      })
    : null
  )
}
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

// props
// draggable
// onDrag = { e => onDrag(e, index, listIndex) }