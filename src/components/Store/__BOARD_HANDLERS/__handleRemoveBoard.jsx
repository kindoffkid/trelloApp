const handleSetBoards = (boards, board_id) => {
  return boards.filter((elem, index) => {
    return index !== board_id
  })
}

export default (state, { board_id }) => {
  return {
      ...state,
    boards: handleSetBoards(state.boards, board_id),
    fetchStatus: false
  }
}
