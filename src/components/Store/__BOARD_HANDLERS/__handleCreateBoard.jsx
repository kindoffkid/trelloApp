export default (state, { payload }) => {
  return {
    ...state,
    boards: [
      ...state.boards,
      payload.data
    ],
    mainMenu: {
      state: false,
      input: '',
    },
    fetchStatus: false
  }
}

// export default (state) => {
//   const { mainMenu } = state
//   if (!state.mainMenu.input) {
//     return {
//       ...state,
//       mainMenu: {
//         ...mainMenu,
//         flash: `Dumbaszz, give me a name!`
//       }
//     }
//   }
//   return {
//     ...state,
//     boards: [
//       ...state.boards,
//       {
//         name: mainMenu.input,
//         lists: [], 
//         panel: {
//           state: false,
//           input: '',
//         }
//       }
//     ],
//     mainMenu: {
//       state: !mainMenu.state,
//       input: '',
//       flash: '',
//     }
//   }
// }
