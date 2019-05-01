export default state => {
  return {
    ...state,
    mainMenu: {
      ...state.mainMenu,
      state: !state.mainMenu.state
    }
  }  
}