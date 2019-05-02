import React from 'react'
export default ({ boardId:id, listId:index, dispatch }) => {  
  return <span
    onClick={() => dispatch({
      category: 'LIST_CASE',
      type: 'REMOVE_LIST',
      boardId: id,
      listId: index
    })}
    className='list_closeBtn'>
    X
  </span>
}