export default (state, {id, payload}) => { 
  const { boards } = state
  const board = boards[id]
  const store = {
    ...state,
    boards: [
      // BEFORE THE MODIFIED OBJECt
      ...boards.slice(0, id),

      {
        ...board,
        // SETTING NEW LIST
        lists: [
          ...board.lists,
          {
            name: payload,
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
      ...boards.slice(id + 1)
    ]
  }
  console.log('%cHANDLE NEW LIST CREATION', 'color: orange', store)
  return store
}

//  {
//   name: state.inputs.mainMenuInput,
//     lists: [],
    // panel: {
    //   state: false,
    //   input: '',
//   }
// }