export default (state, { boardId, listId , payload}) => {
  const { boards } = state,
    board = boards[boardId],
    list = board.lists[listId]
  return {
    ...state,
    boards: [
      ...boards.slice(0, boardId),
      {
        ...board,
        lists: [
          ...board.lists.slice(0, listId),
          {
            ...list,
            form: {
              ...list.form,
              input: payload
            }
          },
          ...board.lists.slice(listId + 1)
        ]
      },
      ...boards.slice(boardId + 1)
    ]
  }
}