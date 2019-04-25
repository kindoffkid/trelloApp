export default (
  state,
  {
    boardIndex,
    listIndex
  }) => {
  
  const { boards } = state,
  board = boards[boardIndex]
  return {
    ...state,
    boards: returnNewArray(
      boards,
      boardIndex,
      {
        ...board,
        // To remove item, just return new array without the item itself, with slice to Item, and from item, leaving item behind
        lists: [
          ...board.lists.slice(0, listIndex),
          ...board.lists.slice(listIndex + 1)
        ]
      }
    )
  }
}

function returnNewArray(array, id, newItem) {
  return [
    ...array.slice(0, id),
    newItem,
    ...array.slice(id + 1)
  ]
}