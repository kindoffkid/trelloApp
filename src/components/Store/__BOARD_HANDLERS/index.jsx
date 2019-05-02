import __setBoards from './__setBoards';
import __handleCreateBoard from './__handleCreateBoard';
import __handleRemoveBoard from './__handleRemoveBoard';
import __handleSetBoardPanelState from './__handleSetBoardPanelState';
import __handleSetBoardPanelInput from './__handleSetBoardPanelInput';

export default (state, action) => {
  switch (action.type) {
    case 'SET_BOARDS':
      return __setBoards(state, action)
    
    case 'CREATE_BOARD':
      return __handleCreateBoard(state, action)

    case 'REMOVE_BOARD':
      return __handleRemoveBoard(state, action)

    case 'SET_BOARD_PANEL_STATE':
      return __handleSetBoardPanelState(state, action)

    case 'SET_BOARD_PANEL_INPUT':
      return __handleSetBoardPanelInput(state, action)
  }
}