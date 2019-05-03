import { arraySlicer } from '../Utils';

export default (state, { payload, log, boardIndex, listIndex }) => {
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
        ),
        log: [log, ...board.log]
      }
    )
  } 
}