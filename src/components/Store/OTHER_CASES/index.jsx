export default (state, action) => {
  switch (action.type) {
    case 'SET_FETCH_STATUS':
      return {
        ...state,
        fetchStatus: true
      }
  }
}