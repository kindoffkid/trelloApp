import {
  arraySlicer,
  removeArrayItem
} from '../Utils'

export default (
  state,
  {
    boardIndex,
    listIndex
  }) => {
  
  const { boards } = state,
  board = boards[boardIndex]
  return {
    ...state,
    boards: arraySlicer(
      boards,
      boardIndex,
      {
        ...board,
        // To remove item, just return new array without the item itself, with slice to Item, and from item, leaving item behind
        lists: removeArrayItem(
          board.lists,
          listIndex)
      }
    )
  }
}
