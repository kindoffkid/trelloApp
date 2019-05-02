export default (state, action) => {
  return {
    ...state,
    fetchStatus: false,
    boards: [
      ...state.boards,
      ...action.payload.map(elem => {
        return {
          ...elem,
          lists: elem.lists.map(list => {
            return {
              ...list,
              form: {
                state: false,
                input: '',
              }
            }
          }),
          panel: {
            state: false,
            input: '',
          }
        }
      })
    ],
  }
}