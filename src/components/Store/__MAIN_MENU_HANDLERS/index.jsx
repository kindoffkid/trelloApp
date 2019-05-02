import __setMenuState from './__setMenuState';
import __setInputValue from './__setInputValue';
import __cancelCreateBoard from './__cancelCreateBoard';

export default (state, action) => {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return __setInputValue(state, action)

    case 'SET_MENU_STATE':
      return __setMenuState(state, action)

    case 'CANCEL_CREATE_BOARD':
      return __cancelCreateBoard(state, action)
  }
}