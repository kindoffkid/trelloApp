import React, { useContext } from 'react'

import { Ctx } from '../../Ctx'

import ListName from './$listName'
import ListForm from './$listForm'
import RemoveListButton from './__removeListButton';
import Tasks from '../Tasks';

// let mouseX, mouseY
// let elementPosition = getPosition(event)



// function getPosition(el) {
//   var xPosition = 0;
//   var yPosition = 0;

//   while (el) {
//     xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
//     yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
//     el = el.offsetParent;
//   }
//   return {
//     x: xPosition,
//     y: yPosition
//   };
// }    

// const handleDragStart = event => {
//   event.target.style.position = 'absolute'
// }
// const handleDrag = event => {
//   mouseX = event.clientX - elementPosition.x
//   mouseY = event.clientY - elementPosition.y
//   event.target.style.top = mouseY + 'px'
//   event.target.style.left = mouseX + 'px'

// }
// const handleDragEnd = event => {
//   event.target.style.position = 'absolute'
//   event.target.style.top = event.pageY + 'px'
//   event.target.style.left = event.pageX + 'px'
//   console.log( event.pageX, event.pageY, event.target.style.top, event.target.style.left )
// }

export default ({ id }) => {
  const { store, dispatch } = useContext(Ctx)
  const localBoard = store.boards[id]

  return (
    localBoard.lists ?
      localBoard.lists.map((elem, index) => { 
        return (
          <div
            key={elem._id}
            className='list'>
            {/* <RemoveListButton
              boardId={id}
              listId={index}
              dispatch={dispatch}
            /> */}
            <ListName listName={elem.listName} />
            <ListForm
              form={elem.form}
              boardId={id}
              listId={index} />
            {/* <Tasks boardId={id} listId={index} /> */}
          </div>
       )
      }): null
  )
}
