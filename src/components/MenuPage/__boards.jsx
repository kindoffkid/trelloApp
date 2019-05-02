import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Ctx } from '../Ctx'

export default () => {
  const { store, dispatch } = useContext(Ctx)

  // MENU CLOSE BOARD BUTTON
  function removeBoard(e, boardIndexInLocalArray, boardId) {
    e.preventDefault()
    e.stopPropagation()
    dispatch({
      // category: 'OTHER_CASE',
      type: 'SET_FETCH_STATUS',
    })
    return(async () => {
      const url = `/api/boards/deleteBoard?id=${boardId}`
      const deleteBoard_QUERY = await fetch(url, { method: 'DELETE' })
      const response = await deleteBoard_QUERY.json()
      if (response) {
        return dispatch({
          category: 'BOARDS',
          type: 'REMOVE_BOARD',
          board_id: boardIndexInLocalArray
        })
      }
    })()
  }

  return (
    store.boards.map((element, index) => {
      return (
        <div
          className="main_menu_boards"
          key={element._id}>
          <Link
            className="main_menu_board"
            to={`/boards/${index}`}>
            {element.boardName}
          </Link>
          <span
            className='board_close'
            onClick={event => removeBoard(event,
              index, element._id
            )}>
            x</span>
        </div>
      );
    })
  )
}