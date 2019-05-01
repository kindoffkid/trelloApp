import { arraySlicer } from '../Utils'

export default (
  state,
  {
    boardIndex,
    listIndex,
    payload
  }) => {
  const { boards } = state,
    board = boards[boardIndex],
    list = board.lists[listIndex]
  return {
    ...state,
    boards: arraySlicer(
      boards,
      boardIndex,
      {
        ...board,
        lists: arraySlicer(
          board.lists,
          listIndex,
          {
            ...list,
            form: {
              ...list.form,
              input: payload
            }
          },
        )
      },

    )    
  }
}