import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Ctx } from '../Ctx'

import '../../component-assets/Modal.scss'
import Modal from './Modal'

export default () => {
  const { store, dispatch } = useContext(Ctx)
  if(store.modal.state){
    domNode()
    dispatch({
      type: 'SET_MODAL_STATE',
      payload: false
    })
  }
  useEffect(() => {
    return () => {
      document.body.removeChild(document.querySelector('#modal'))
    }
  }, [])
  const onKeyUp = event => {
    if (event.keyCode === 13) {
      dispatch({
        type: 'SET_NICKNAME_BY_ModalINPUT'
      })
    }
  }  
  const  onClick = event =>  {
    if (store.modal.input) {
      dispatch({
        type: 'SET_NICKNAME_BY_ModalINPUT'
      })
    }
  }  
  const onChange = event => {
    return dispatch({
      type: 'SET_MODAL_INPUT',
      payload: event.target.value
    })
  }
  return ReactDOM.createPortal(
    <Modal
      input={{
        value: store.modal.input,
        onKeyUp: onKeyUp,
        onChange: onChange
      }}
      onClick={onClick}
      />,
    document.querySelector('#modal'))
}

function domNode(){
  let node = document.createElement('div')
  node.setAttribute('id', 'modal')
  return document.querySelector('body').appendChild(node)
}