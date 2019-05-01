import { arraySlicer } from '../Utils';

export default (state, { id, payload }) => { 
  const { boards } = state
  return {
    ...state,
    boards: arraySlicer(
      boards,
      id,
      {
      ...boards[id],
      panel: {
        ...boards[id].panel,
        input: payload
      }
    })
  }
}
