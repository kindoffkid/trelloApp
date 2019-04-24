export default (state, { boardId, listId }) => {
  const { boards } = state,
    board = boards[boardId]
  return {
    ...state,
    boards: [
      ...boards.slice(0, boardId),
      {
        ...board,
        // To remove item, just return new array without the item itself, with slice to Item, and from item, leaving item behind

        lists: [
          ...board.lists.slice(0, listId),
          ...board.lists.slice( listId + 1)
        ]
      },
      ...boards.slice(boardId + 1)
    ]
  }
}