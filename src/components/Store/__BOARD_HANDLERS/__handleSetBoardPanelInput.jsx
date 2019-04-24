export default (state, { id, payload }) => { 
  const { boards } = state
  return {
    ...state,
    boards: [
      ...boards.slice(0, id),
      {
        ...boards[id],
        panel: {
          ...boards[id].panel,
          input: payload
        }

      },
      ...boards.slice(id + 1)
    ]
  }
}
