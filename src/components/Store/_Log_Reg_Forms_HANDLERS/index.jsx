import __setRegInputValueHandler from './__setRegInputValueHandler'
import __setLogInputValueHandler from './__setLogInputValueHandler'

export default (state, action) => {
  switch (action.type) {
    case 'SET_REG_INPUT_VALUE':
      return __setRegInputValueHandler(state, action)
    case 'SET_LOG_INPUT_VALUE':
      return __setLogInputValueHandler(state, action)
    default: 
      return state
  }
}