export default (state, { payload }) => ({
  ...state,
  modal: {
    ...state.modal,
    input: payload
  }
})