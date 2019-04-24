export default (state, { payload, boardId, listId }) => {
  const { boards } = state
  const board = boards[boardId]
  return {
    ...state,
    boards: [
      ...boards.slice(0, boardId),
      {
        ...board,
        lists: [
          ...board.lists.slice(0, listId),
          {
            ...board.lists[listId],
            tasks: [
              ...board.lists[listId].tasks,
              {
                time: new Date().toLocaleString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }),
                task: payload,
              }
            ],
            form: {
              state: false,
              input: '',
            }
          }
        ]
      },
      ...boards.slice(boardId + 1)
    ]
  } 
}