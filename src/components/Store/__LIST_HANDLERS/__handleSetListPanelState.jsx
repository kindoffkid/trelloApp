import { arraySlicer } from '../Utils'

export default (
  state,
  {
    boardIndex,
    listIndex
  }) => { 
  const { boards } = state,
    board = boards[boardIndex],
    list = board.lists[listIndex]
  return {
    ...state,
    boards: 
      arraySlicer(
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
                state: !list.form.state
              }
            },
          )
        },
      )
      // ...boards.slice(0, boardIndex),
      // {
      //   ...board,
      //   lists: [
      //     ...board.lists.slice(0, listIndex),
      //     {
      //       ...list,
      //       form: {
      //         ...list.form,
      //         state: !list.form.state
      //       }
      //     },
      //     ...board.lists.slice( listIndex + 1)
      //   ]
      // },
      // ...boards.slice( boardIndex + 1)
    
  }
}