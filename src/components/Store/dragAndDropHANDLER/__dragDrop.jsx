import { arraySlicer } from '../Utils';

export default (state, { dropTargetList }) => {
  const {
    boardIndex,
    listIndex,
    taskIndex, } = state.draggedItem
  
  const board = state.boards[boardIndex]
  const removedTaskFromList = board.lists[listIndex]
  const listTarget = board.lists[dropTargetList]

  const deleteTaskFromList = {
    ...removedTaskFromList,
    tasks: [
      ...removedTaskFromList.tasks.slice(0, taskIndex),
      ...removedTaskFromList.tasks.slice(taskIndex + 1)
    ]
  }
  const addTaskToList = {
    ...listTarget,
    tasks: [
      ...listTarget.tasks,
      removedTaskFromList.tasks[taskIndex]
    ]
  }
  return {
    ...state,
    boards: arraySlicer(
      state.boards,
      boardIndex,
      {
        ...board,
        lists: board.lists.map((list, index) => {
          if (index === listIndex) {
            return deleteTaskFromList
          }
          if (index === dropTargetList) {
            return addTaskToList
          }
          return list
        })
      }
    )
  }
}