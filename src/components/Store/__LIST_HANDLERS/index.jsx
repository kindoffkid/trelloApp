import __handleListCreation from './__handleListCreation';
import __handleSetListPanelState from './__handleSetListPanelState';
import __handleSetListPanelInput from './__handleSetListPanelInput';
import __handleRemoveList from './__handleRemoveList';

export default (state, action) => {
  switch (action.type) {
    case 'CREATE_LIST':
      return __handleListCreation(state, action)
    case 'SET_LIST_STATE':
      return __handleSetListPanelState(state, action)
    case 'SET_LIST_INPUT':
      return __handleSetListPanelInput(state, action)
    case 'REMOVE_LIST':
      return __handleRemoveList(state, action)
  }
}