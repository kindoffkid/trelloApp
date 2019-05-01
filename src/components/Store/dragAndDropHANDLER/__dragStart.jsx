export default (state, {
  boardIndex,
  listIndex,
  taskIndex,
  listId,
  taskId,
}) => {
  return {
    ...state,
    draggedItem: {
      boardIndex: boardIndex,
      listIndex: listIndex,
      taskIndex: taskIndex,

      listId: listId,
      taskId: taskId,
    }
  }
}