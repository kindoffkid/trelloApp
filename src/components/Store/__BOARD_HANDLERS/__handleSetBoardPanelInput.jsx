export default (state, { id, payload }) => { 
  const { boards } = state
  return {
    ...state,
    boards: returnNewArray(
      boards,
      id,
      {
      ...boards[id],
      panel: {
        ...boards[id].panel,
        input: payload
      }
    })
  }
}
function returnNewArray(array, id, newItem) {
  return [
    ...array.slice(0, id),
    newItem,
    ...array.slice( id + 1)
  ]
}