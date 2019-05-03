import React, { useEffect } from "react";
import { BrowserRouter as Router, Route,  } from "react-router-dom";
import "../component-assets/MainPage.scss";

import Nav from './Nav/Nav'
import Board from './BoardsGlobal/BoardMainPage'
// REDUCER AND STORE
import createStore from './Store'

import MenuPage, {
  MainMenuButton,
  MenuHeader,
  MenuInput,
  Menu_Buttons,
  CloseMenuButton,
  Flash,
  BoardPanel
} from './MenuPage'

// import createBoardFetcher from '../component-assets/JS/Fetchers/__newBoardFetcher'

// CONTEXT 
import { Ctx } from './Ctx'
import Modal from '../components/Modal'
import FancySpinner from '../component-assets/JS/Spinner'
import LogHandler from './LogHandler/__Sign_In'
import __Sign_Up from './LogHandler/__Sign_Up';
export default ({ history }) => {
  const [store, dispatch] = createStore()
  useEffect(() => {
    console.log(
      '%cRENDERING APP',
      'color: violet'
    )
    fetcher(dispatch)
  }, [])

  const logOut = () => {
    history.push('/')
    return setTimeout(() =>  
      dispatch({
        type: 'LOG_OUT'
      })
      ,10)
  }
  return (
    !store.logged ?
      <Ctx.Provider
        value={{ store, dispatch }} >
          <Nav
            nickname={store.nickname}
            logged={store.logged}
          />
          <Route 
            exact path='/' 
            render={URL => <LogHandler {...URL}/>} />
          <Route
            path='/sign_up'
            render={URL => <__Sign_Up {...URL} />}
          />
      </Ctx.Provider>
      :
    store.fetchStatus ? 
      <FancySpinner />
      :
    <Ctx.Provider
      value={{ store, dispatch }} >
        <Nav nickname={store.nickname}
          logged={store.logged}
          logOut={logOut}
        />
        <Route
          exact path='/'
          render={() => <MenuPage
            store={store}
            dispatch={dispatch}
          />}
        />
        
        <Route
          path='/boards/:id/'
          render={url => (<Board url={url} />)}
        />
    </Ctx.Provider>
  )
}
async function fetcher(dispatch) {
  try {
    const payload = await fetch('/api/boards', { method: 'GET' })
    const data = await payload.json()
    if (data) {
      console.log( '%cFetched Data:', 'color: gray', '\n', data )
      return dispatch({
        category: 'BOARDS',
        type: 'SET_BOARDS',
        payload: [...data.data]
      })
    }
  } catch (errors) {
    console.error(errors.message)
    }
  }
