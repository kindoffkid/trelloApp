export default (state, { payload }) => ({
  ...state,
  modal: {
    ...state.modal,
    state: payload
  }
})
