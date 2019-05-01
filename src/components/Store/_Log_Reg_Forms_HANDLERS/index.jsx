import __setInputValueHandler from './__setInputValueHandler';

export default (state, action) => {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return __setInputValueHandler(state, action)
    default: 
      return state
  }
}