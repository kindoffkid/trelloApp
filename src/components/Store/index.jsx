import { useReducer } from 'react'
import __setModalInput from './__MODAL_HANDLERS/__setModalInput';
import __setModalState from './__MODAL_HANDLERS/__setModalState';

import dragAndDropHANDLER from './dragAndDropHANDLER';
import logRegFormHandlers from './_Log_Reg_Forms_HANDLERS';
import menuHandlers from './__MAIN_MENU_HANDLERS'
import boardsHandler from './__BOARD_HANDLERS'
import otherCasesHandler from './OTHER_CASES'
import listHandlers from './__LIST_HANDLERS';
import taskHandlers from './__TASK_HANDLERS';

import initialState from './initialState'
const reducer = (state, action) => {
  switch (action.category) {
    case 'MENU_CASE':
      return menuHandlers(state, action)
    case 'BOARDS':
      return boardsHandler(state, action)
    case 'LIST_CASE':
      return listHandlers(state, action)
    case 'TASK_CASE':
      return taskHandlers(state, action)
    case 'DRAG_AND_DROP':
      return dragAndDropHANDLER(state, action)
    case 'REG_LOG_FORM':
      return logRegFormHandlers(state, action)
    case 'OTHER_CASE': 
      return otherCasesHandler(state, action)
  }
  switch (action.type) {
    // MODAL HANDLERS)
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
    // case 'SET_MODAL_INPUT':
    //   return __setModalInput(state, action)
    // case 'SET_MODAL_STATE':
    //   return __setModalState(state, action)
    // case 'SET_NICKNAME_BY_ModalINPUT':
    //   localStorage.setItem('LocalNickname', state.modal.input)
    //   return {
    //     ...state,
    //     nickname: state.modal.input,
    //     modal: {
    //       input: '',
    //       state: false
    //     }
    //   }
    // case 'SET_NICKNAME_BY_LOCALSTORAGE':
    //   return {
    //     ...state,
    //     nickname: action.payload,
    //     modal: {
    //       input: '',
    //       state: false
    //     }
    //   }
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
