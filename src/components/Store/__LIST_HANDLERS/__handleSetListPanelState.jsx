export default (state, { boardId, listId }) => { 
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
              state: !list.form.state
            }
          },
          ...board.lists.slice( listId + 1)
        ]
      },
      ...boards.slice( boardId + 1)
    ]
  }
}