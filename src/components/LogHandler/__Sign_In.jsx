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
  const { log_email, log_pass } = store.forms.log_form
  const [ flashAlert, setFlashAlert ] = useState('')
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
      const url = `/api/users/sign_in?email=${log_email}&password=${log_pass}`
      const signIn_QUERY = await fetch(url, { method: 'POST' })
      const QUERY_response = await signIn_QUERY.json()
      if (QUERY_response.status === '200') {
        console.log(
          '%cSign in Query', 'color: orange',
          signIn_QUERY, '\n',
          QUERY_response)
         history.push('/')
         return dispatch({
          type: 'SET_LOGGED',
          payload: QUERY_response.data.username
        })
      }
      else {
        console.log(
          '%cnewUserQuery', 'color: orange',
          signIn_QUERY, '\n',
          QUERY_response
        )
        return setFlashAlert(`Erorr, ${QUERY_response.message}`)
      }
    })()
  }
  const handleOnChange = event =>
    dispatch({
      category: 'REG_LOG_FORM',
      type: 'SET_LOG_INPUT_VALUE',
      name: event.target.name,
      value: event.target.value
    })

  const handleOnFocus = event => {
    return setTimeout(() => {
      return setFlashAlert('')
    }, 500)
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
            name='log_email'
            value={log_email}
            onFocus={handleOnFocus}
            onChange={handleOnChange}
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
            name='log_pass'
            value={log_pass}
            onChange={handleOnChange}
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
        <p className={styles.flash_alert}>
          {flashAlert}
        </p>
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
