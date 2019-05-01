import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Ctx } from '../Ctx'
import Spinner from '../../component-assets/JS/Spinner'
import './_localAssets/spinner.scss'

import { emailValidation, passwordValidation } from './utils'
import TooltipComponent from './TooltipComponent';

import styles from './_localAssets/sign_in.module.scss'

export default ({ history }) => {
  useEffect(() => { console.log('rendering logComponent') }, [])
  const { store, dispatch } = useContext(Ctx)
  const { email, password } = store.forms.reg


  // const [emailFlash, setEmailFlash] = useState('')
  // const [passFlash, setPassFlash] = useState('')
  // const [ loading, setLoading ] = useState(false)

  
  // const emailRef = useRef(null)
  // const passRef = useRef(null)

  // const [emailTooltip, setEmailTooltip] = useState('')
  const [passTooltip, setPassTooltip] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    // setLoading(true)
    // if (!e_valid(email)) {
    //   return setEmailFlash('Enter a valid e-mail adress')
    // }
    // if (!p_valid(password)) {
    //   return setPassTooltip('Min password length is 5, max 16. ')
    // }
    return (async () => {
      const url = `/api/users/sign_in?email=${email}&password=${password}`
      const signIn_QUERY = await fetch(url, { method: 'POST' })
      const QUERY_response = await signIn_QUERY.json()
      console.log(
        '%cnewUserQuery', 'color: orange',
        signIn_QUERY, '\n',
        QUERY_response)
       history.push('/')
       return dispatch({
        type: 'SET_LOGGED',
        payload: QUERY_response.data.email
      })
    })()
  }
  return (
    <div className={styles.formWrapper}>
      <div className={styles.form_headline}>
        <h5> Sign in to Trello clone app</h5>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        >
        <div className={styles.form_section}>
          <label
            htmlFor='email-input' className={styles.form_label}>
            Email adress
          </label>
          <input
            type='email'
            id='email-input' 
            name='reg-email'
            value={email.value}
            onChange={event => {
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
            min={5}
            max={16}
            required
          />
          <span
            className='form-section-flash' />
        </div>

        <div className={styles.form_section}>
          <label htmlFor='pass-input' className={styles.form_label}>
            Password
          </label>
          <input
            type='password'
            name='reg-password'
            value={password.value}
            onChange={event =>
              dispatch({
                category: 'REG_LOG_FORM',
                type: 'SET_REG_PASSWORD',
                payload: event.target.value
              })
            }
            min={5}
            max={16}
            required
          />
          <span className='form-section-flash' />
        </div>

        <div
          className={styles.form_section}
          style={{ marginTop: 25, marginBottom: 10}}>
          <input 
            type='submit' 
            value='Sign in'
            className={styles.submitButton}
          />
        </div>
      </form>

      <div className={styles.sign_up}>
        <p>New to this app? 
          <Link to='/sign_up'> Sign up</Link>
        </p>
      </div>
    </div>
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


  /* <form className='form-log' onSubmit={handleSubmit}>
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
    </form> */
