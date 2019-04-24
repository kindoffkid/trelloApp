function handleSetBoards(boards, id) {
  return boards.filter((elem, index) => {
    return index !== id
  })
}

export default (state, action) => {
  return {
      ...state,
    boards: handleSetBoards(state.boards, action.board_id)
  }
}
