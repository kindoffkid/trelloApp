import { arraySlicer } from '../Utils';

export default (state, { id }) => {
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
        state: !boards[id].panel.state
      }
    })
  }
}
