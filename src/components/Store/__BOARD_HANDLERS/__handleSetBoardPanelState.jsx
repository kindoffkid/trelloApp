export default (state, { id }) => {
  const { boards } = state
  return {
    ...state,
    boards: [
      ...boards.slice(0, id),
      {
        ...boards[id],
        panel: {
          ...boards[id].panel,
          state: !boards[id].panel.state
        }
      },
      ...boards.slice(id + 1)
    ]
  }
}