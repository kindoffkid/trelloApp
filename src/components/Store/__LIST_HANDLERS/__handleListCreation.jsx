export default (state, {boardIndex, payload}) => { 
  const { boards } = state
  const board = boards[boardIndex]
  const store = {
    ...state,
    boards: [
      // BEFORE THE MODIFIED OBJECt
      ...boards.slice(0, boardIndex),

      {
        ...board,
        // SETTING NEW LIST
        lists: [
          ...board.lists,
          {
            ...payload,
            tasks: [],
            form: {
              state: false,
              input: '',
            }
          }
        ],

        // RESETING PANEL INPUTFIELD
        panel: {
          state: !board.panel.state,
          input: '',
        }
      },

      // AFTER MODIFIED OBJECT
      ...boards.slice(boardIndex + 1)
    ]
  }
  console.log('%cHANDLE NEW LIST CREATION', 'color: orange', store)
  return store
}

function returnNewArray(array, id, newItem) {
  return [
    ...array.slice(0, id),
    newItem,
    ...array.slice(id + 1)
  ]
}