export default (state, { name, payload }) => ({
  ...state,
  mainMenu: {
    ...state.mainMenu,
    input: payload
  }
})
