export default (state, { id }) => {
  const { boards } = state
  return {
    ...state,
    boards: returnNewArray(boards, id, {
      ...boards[id],
      panel: {
        ...boards[id].panel,
        state: !boards[id].panel.state
      }
    })
  }
}
function returnNewArray(array, id, newItem) {
  return [
    ...array.slice(0, id),
    newItem,
    ...array.slice(id + 1)
  ]
}