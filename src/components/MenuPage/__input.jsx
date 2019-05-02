import React, {useContext} from 'react'
import { Ctx } from '../Ctx'

export default () => {
  const { store, dispatch } = useContext(Ctx)
  const handleOnKeyUp = event => {
    if (
      event.keyCode === 13 &&
      store.mainMenu.input !== ''
    ) {
      dispatch({
        type: 'SET_FETCH_STATUS'
      })
      return (async () => {
        const url = `/api/boards/new?boardName=${store.mainMenu.input}`
        const query = await fetch(url, { method: 'POST' })
        const response = await query.json()
        if (response) {
          return dispatch({
            category: 'BOARDS',
            type: 'CREATE_BOARD',
            payload: response
          })
        }
      })()
    }
    return
  }
  return (
    <input
      className='main_menu_input block_section'
      type='text'
      placeholder='Some name please'
      name='mainMenuInput'
      value={store.mainMenu.input}
      onChange={e => dispatch({
        category: 'MENU_CASE',
        type: 'SET_INPUT_VALUE',
        payload: e.target.value,
      })}
      onKeyUp={handleOnKeyUp}
    />
  )
}