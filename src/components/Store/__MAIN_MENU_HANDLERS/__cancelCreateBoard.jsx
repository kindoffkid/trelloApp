export default (state, action) => {
  return {
    ...state,
    mainMenu: {
      ...state.mainMenu,
      input: '',
      flash: '',
    }
  }
}