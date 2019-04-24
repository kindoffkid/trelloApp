import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../component-assets/MainPage.scss";

import Nav from './Nav/Nav'
import Board from './BoardsGlobal/Main'

// REDUCER AND STORE
import createStore from './Store'

import {
  MainMenuButton,
  MenuHeader,
  MenuInput,
  Menu_Buttons,
  CloseMenuButton,
  Flash,
  BoardPanel
} from './MenuPage'

import createBoardFetcher from '../component-assets/JS/Fetchers/__newBoardFetcher'

// CONTEXT 
import { Ctx } from './Ctx'
import Modal from '../components/Modal'
import FancySpinner from './Spinner'

export default () => {
  const [store, dispatch] = createStore()
  const { mainMenu } = store

  const handleNewBoardCreation = (event) => {
    event.stopPropagation()
    dispatch({ type: 'SET_FETCH_STATUS' })
    if (store.mainMenu.input) {
      return createBoardFetcher(store.mainMenu.input, dispatch)
    }
  }

  useEffect(() => {
    console.log('%cRENDERING APP', 'color: violet')
    fetcher(dispatch)
    checkForExistingNickname(dispatch)
  }, [])



  return (
   !store.nickname ? 
      <Ctx.Provider
        value={{ store, dispatch }} >
        <Modal /> 
      </Ctx.Provider>
      :
    store.fetchStatus ? 
      <FancySpinner />
      :
      <Ctx.Provider
      value={{ store, dispatch }} >
      <Router>
        <Nav nickname={store.nickname} />
        <Route
          exact path='/'
          render={() =>
          (<>
            <div className='main_menu_boards'>
              <MainMenuButton
                onClick={() => dispatch({
                  type: 'SET_MENU_STATE'
                })}
                menuState={mainMenu.state}
              />
              <main
                className="main_menu"
                style={mainMenu.state ? { display: "block" } : { display: "none" }}>
                <MenuHeader />
                <MenuInput />

                <Flash flash={mainMenu.flash} />
                  <Menu_Buttons
                    handleNewBoardCreation={
                      handleNewBoardCreation
                    }
                />
                <CloseMenuButton
                  dispatch={dispatch} />
              </main>
              <BoardPanel />
            </div>
          </>
          )}
        />
        
        <Route
          path='/boards/:id/'
          render={ url => (<Board url={url} />)}
        />
      </Router>
      </Ctx.Provider>
  );
}

// export default () => {
//   const [value, setValue] = useState('')
//   const [ boards, setBoards ] = useState([])
//   useEffect(() => console.log( 'love' ), [boards]) 
//   async function fetcher() {
//     try {

//       const x = { name: value }
//       const url = '/boards'
//       const payload = await fetch(url)
      // const payload = await fetch(url, {
      //   method: 'POST',
      //   body: JSON.stringify(x),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   credentials: 'same-origin'
      // })
//       const data = await payload.json()
//       if (data) {
//         setBoards(data)
//       }
//     } catch (error){ console.error( error )}
//   }
//   return (
//     <>
//       <input type="text"
//         value={value}
//         onChange={event => setValue(event.target.value)}
//       />
//       <button onClick={fetcher}>SEND</button>
//       <p>{value}</p>
//       {boards ? 
//         boards.map((elem, index) => {
//           return (
//             <div key={elem._id}>
//               <p>{elem.boardName}</p>
//             </div>
//           )
//         }) : null
//         }
//       </>
//   )
// }
function checkForExistingNickname(dispatch) {
  if (localStorage.getItem('LocalNickname')) {
    dispatch({
      type: 'SET_NICKNAME_BY_LOCALSTORAGE',
      payload: localStorage.getItem('LocalNickname')
    })
  }
}
async function fetcher(dispatch) {
  try {
    const payload = await fetch('/api/boards', { method: 'GET' })
    const data = await payload.json()
    if (data) {
      return dispatch({
        type: 'SET_BOARDS',
        payload: data.data
      })
    }
  } catch (errors) {
    console.error(errors.message)
  }
}