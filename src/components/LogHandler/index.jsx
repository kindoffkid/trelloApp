import React, { useState, useContext, useRef, useEffect } from 'react'
import { Ctx } from '../Ctx'
import Spinner from '../../component-assets/JS/Spinner'
import './spinner.scss'
import '../../component-assets/LogPage.scss'
import Headline from './__Headline'
import SubmitButton from './__Submit'
import { emailValidation, passwordValidation } from './utils'
import TooltipComponent from './TooltipComponent';

export default ({ history }) => {
  useEffect(() => { console.log('rendering logComponent') }, [])
  const { store, dispatch } = useContext(Ctx)
  const { email, password } = store.forms.reg


  const [emailFlash, setEmailFlash] = useState('')
  const [passFlash, setPassFlash] = useState('')
  const [ loading, setLoading ] = useState(false)

  
  const emailRef = useRef(null)
  const passRef = useRef(null)

  const [emailTooltip, setEmailTooltip] = useState('')
  const [passTooltip, setPassTooltip] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    if (!e_valid(email)) {
      return setEmailFlash('Enter a valid e-mail adress')
    }
    // if (!p_valid(password)) {
    //   return setPassTooltip('Min password length is 5, max 16. ')
    // }
    return (async () => {
      const url = `/api/users/sign_up?email=${email}&password=${password}`
      const newUser_QUERY = await fetch(url, { method: 'POST' })
      const QUERY_response = await newUser_QUERY.json()
      console.log(
        '%cnewUserQuery', 'color: orange',
        newUser_QUERY, '\n',
        QUERY_response)
       history.push('/')
       return dispatch({
        type: 'SET_LOGGED',
        payload: QUERY_response.data.email
      })
    })()
  }
  return (
    <form className='form-log' onSubmit={handleSubmit}>
      <Headline />
      <div className='form-section'>
        <input
          type='email'
          placeholder='E-mail'
          name='reg-email'
          value={email.value}
          onChange={event =>{
              dispatch({
                category: 'REG_LOG_FORM',
                type: 'SET_REG_EMAIL',
                payload: event.target.value
              })
            return setTimeout(() => {
              return setPassTooltip('')
            }, 500)
            }
          }
          ref={emailRef}
          min={5}
          max={16}
          required
        />
        <span className='form-section-flash'>{emailFlash}</span>
        {
          emailTooltip ?
            <TooltipComponent tooltipText={emailTooltip} />
            : null
        }
      </div>

      <div className='form-section'>
        <input
          type='password'
          placeholder='Password'
          name='reg-password'
          value={password.value}
          onChange={event =>
            dispatch({
              category: 'REG_LOG_FORM',
              type: 'SET_REG_PASSWORD',
              payload: event.target.value
            })
          }
          ref={passRef}
          min={5}
          max={16}
          required
        />
        <span className='form-section-flash'>{passFlash}</span>
        {
          passTooltip ?
            <TooltipComponent tooltipText={passTooltip} />
            : null
        }
      </div>

      <SubmitButton />
      {loading ?
        <div className='spinner'>
          <div className='lds-ripple'>
            <div />
            <div />
          </div>
        </div>
        : null}
    </form>
  )
}

function e_valid(email) {
  if (emailValidation.test(email)) {
  return true
  }
  return false
}

function p_valid(pass) { 
  if (passwordValidation.test(pass)) {
    return true
  }
  return false
}