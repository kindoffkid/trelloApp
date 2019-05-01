import { useReducer } from 'react'

import handleCreateBoard from './__BOARD_HANDLERS/__handleCreateBoard'
import handleRemoveBoard from './__BOARD_HANDLERS/__handleRemoveBoard'
import handleSetBoardPanelState from './__BOARD_HANDLERS/__handleSetBoardPanelState'
import handleSetBoardPanelInput from './__BOARD_HANDLERS/__handleSetBoardPanelInput'
import handleListCreation from './__LIST_HANDLERS/__handleListCreation'
import __handleSetListPanelState from './__LIST_HANDLERS/__handleSetListPanelState';
import __handleSetListPanelInput from './__LIST_HANDLERS/__handleSetListPanelInput';
import __handleRemoveList from './__LIST_HANDLERS/__handleRemoveList';
import __handleTaskCreation from './__TASK_HANDLERS/__handleTaskCreation';
import __setMainMenuState from './__MAIN_MENU_HANDLERS/__setMenuState';
import __setMainMenuInput from './__MAIN_MENU_HANDLERS/__setInputValue';
import __cancelCreateBoard from './__MAIN_MENU_HANDLERS/__cancelCreateBoard';
import __setModalInput from './__MODAL_HANDLERS/__setModalInput';
import __setModalState from './__MODAL_HANDLERS/__setModalState';
import dragAndDropHANDLER from './dragAndDropHANDLER';
import _Log_Reg_Forms_HANDLERS from './_Log_Reg_Forms_HANDLERS';



const initialState = {
  nickname: '',
  logged: false,
  boards: [],
  mainMenu: {
    state: false,
    input: '',
    flash: '',
  },
  fetchStatus: false,
  modal: {
    state: true,
    input: '',
  },
  draggedItem: {
    listIndex: null,
    taskIndex: null,

    listId: null,
    taskId: null,
  },
  forms: {
    log: {
      email: '',
      password: '',
    },
    reg: {
      email: '',
      password: '',
    },
  }
}

const reducer = (state, action) => {
  switch (action.category) {
    case 'DRAG_AND_DROP':
      return dragAndDropHANDLER(state, action)
    case 'REG_LOG_FORM':
      return _Log_Reg_Forms_HANDLERS(state, action)
  }
  switch (action.type) {
    case 'SET_FETCH_STATUS':
      return {
        ...state,
        fetchStatus: true
      }
    case 'SET_BOARDS':
      return {
        ...state,
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
                input:'',
              }
            }
          })
        ],
        fetchStatus: false
      }
    
    //// MAIN MENU MANAGING
    case 'SET_INPUT_VALUE':
      return __setMainMenuInput(state, action)

    case 'SET_MENU_STATE':
      return __setMainMenuState(state, action)

    case 'CANCEL_CREATE_BOARD':
      return __cancelCreateBoard(state, action)

    // BOARD SETTINGS
    case 'CREATE_BOARD':
      return handleCreateBoard(state, action)

    case 'REMOVE_BOARD':
      return handleRemoveBoard(state, action)

    case 'SET_BOARD_PANEL_STATE':
      return handleSetBoardPanelState(state, action)

    case 'SET_BOARD_PANEL_INPUT':
      return handleSetBoardPanelInput(state, action)

    // LIST MANAGIN
    case 'CREATE_LIST':
      return handleListCreation(state, action)
    case 'SET_LIST_STATE':
      return __handleSetListPanelState(state, action)
    case 'SET_LIST_INPUT':
      return __handleSetListPanelInput(state, action)
    case 'REMOVE_LIST':
      return __handleRemoveList(state, action)

    // TASK MANAGIN
    case 'CREATE_TASK':
      return __handleTaskCreation(state, action)

    // MODAL HANDLERS
    case 'SET_MODAL_INPUT':
      return __setModalInput(state, action)
    case 'SET_MODAL_STATE':
      return __setModalState(state, action)
    case 'SET_LOGGED':
      return {
        ...state,
        logged: true,
        nickname: action.payload
      }
    case 'LOG_OUT':
      return {
        ...state,
        nickname: '',
        logged: false
      }
    case 'SET_NICKNAME_BY_ModalINPUT':
      localStorage.setItem('LocalNickname', state.modal.input)
      return {
        ...state,
        nickname: state.modal.input,
        modal: {
          input: '',
          state: false
        }
      }
    case 'SET_NICKNAME_BY_LOCALSTORAGE':
      return {
        ...state,
        nickname: action.payload,
        modal: {
          input: '',
          state: false
        }
      }
    // DEFAULT
    default:
      return state
  }
}

export default () => {
  const [state, reactDispatch ] = useReducer(reducer, initialState)
  const dispatch = action => {
    console.info(`%c[${action.type}]`, 'color: lightseagreen', {
      action,
      state: state
    })
    return reactDispatch(action)
  }

  return [state, dispatch]
}
