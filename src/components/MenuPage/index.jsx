import React from 'react'
import BoardPanel from './__boards'
import CloseMenuButton from './__closeMenu'
import Flash from './__flash'
import MainMenuButton from './__main__button'
import MenuHeader from './__header'
import MenuInput from './__input'
import __buttons from './__buttons'
// export {
//   CloseMenuButton,
//   Flash,
//   MainMenuButton,
//   MenuHeader,
//   MenuInput,
//   Menu_Buttons,
//   BoardPanel
// }
import createBoardFetcher from '../../component-assets/JS/Fetchers/__newBoardFetcher'


export default ({ store, dispatch }) => {
  const { mainMenu } = store

  const handleCreateButton = (event) => {
    event.stopPropagation()
    dispatch({
      category: 'OTHER_CASE',
      type: 'SET_FETCH_STATUS'
    })
    if (store.mainMenu.input) {
      return createBoardFetcher(store.mainMenu.input, dispatch)
    }
  }

  return (
    <Main
      menuState={mainMenu.state}
      dispatch={dispatch}
      createBoard={handleCreateButton}
      flash={mainMenu.flash}>
        <MainMenuButton  />
        <MainTag>
          <MenuHeader />
          <MenuInput />
          <Flash />
          <__buttons />
          <CloseMenuButton />
        </MainTag>
        <BoardPanel />
      </Main>
  )
}
/* <div className='main_menu_boards'> */

function Main({menuState, createBoard, dispatch, children}) {
  const X = children.map(Elem => {
    return {
      ...Elem,
      props: {
        ...Elem.props,
        menuState: menuState,
        createBoard: createBoard,
        dispatch: dispatch
      }
    }
  })
  return (
    <div className='main_menu_boards'>
      {X}
    </div>
  )
}

function MainTag(props) {
  return (
    <main
      className="main_menu"
      style={
        props.menuState ?
          { display: "block" }
          : { display: "none" }}>

      {props.children.map((Elem) => {
        return {
          ...Elem,
          props: {
            ...Elem.props,
            ...props
          }
        }
      })}
    </main>
  )
}