import React, {useContext} from 'react'
import { Ctx } from '../Ctx'

export default () => {
  const { store, dispatch } = useContext(Ctx)

  const fetcher = async () => {
    const url = `/api/boards/new?boardName=${store.mainMenu.input}`
    const query = await fetch(url, { method: 'POST' })
    const response = await query.json()
    if (response) {
      return dispatch({
        type: 'CREATE_BOARD',
        payload: response
      })
    }
  }
  return (
    <input
      className='main_menu_input block_section'
      type='text'
      placeholder='Some name please'
      name='mainMenuInput'
      value={store.mainMenu.input}
      onChange={e => dispatch({
        type: 'SET_INPUT_VALUE',
        payload: e.target.value,
      })}
      onKeyUp={event => {
        if (event.keyCode === 13) {
           dispatch({
            type: 'SET_FETCH_STATUS'
          })
            return fetcher()
        }
      }}
    />
  )
}