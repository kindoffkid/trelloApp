import { arraySlicer } from '../Utils';

export default (state, { payload, boardIndex, listIndex }) => {
  const { boards } = state
  const board = boards[boardIndex]
  const listInCase = board.lists[listIndex]

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
            ...listInCase,
            tasks: [
              ...payload.tasks
            ],
            form: {
              state: false,
              input: '',
            }
          }
        )
      }
    )

    //   [
    //   ...boards.slice(0, boardIndex),
    //   {
    //     ...board,
    //     lists: [
    //       ...board.lists.slice(0, listIndex),
    //       {
    //         ...board.lists[listIndex],
    //         tasks: [
    //           ...board.lists[listIndex].tasks,
    //           {
    //             time: new Date().toLocaleString(undefined, {
    //                 hour: '2-digit',
    //                 minute: '2-digit',
    //                 hour12: true
    //             }),
    //             task: payload,
    //           }
    //         ],
    //         form: {
    //           state: false,
    //           input: '',
    //         }
    //       }
    //     ]
    //   },
    //   ...boards.slice(boardIndex + 1)
    // ]
  } 
}