import { removeArrayItem } from '../Utils';

export default (state, { board_id }) => {
  return {
      ...state,
    boards: removeArrayItem(
      state.boards,
      board_id
    ),
    fetchStatus: false
  }
}
