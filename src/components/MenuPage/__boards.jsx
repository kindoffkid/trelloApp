import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Ctx } from '../Ctx'

export default () => {
  const { store, dispatch } = useContext(Ctx)

  // MENU CLOSE BOARD BUTTON
  function removeBoard(e, id) {
    e.preventDefault()
    e.stopPropagation()
    dispatch({
      type: 'REMOVE_BOARD',
      board_id: id
    })
  }

  return (
    store.boards.map((element, index) => {
      return (
        <div
          className="main_menu_boards"
          key={element.id}>
          <Link
            className="main_menu_board"
            to={`/boards/${index}`}>
            {element.boardName}
          </Link>
          <span
            className='board_close'
            onClick={e => removeBoard(e, index)}>
            x</span>
        </div>
      );
    })
  )
}