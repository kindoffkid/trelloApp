import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Ctx } from '../Ctx'
import Spinner from '../../component-assets/JS/Spinner'
import './_localAssets/spinner.scss'

import { emailValidation, passwordValidation } from './utils'
import TooltipComponent from './TooltipComponent';

import styles from './_localAssets/sign_up.module.scss'

export default ({ history }) => {
  useEffect(() => { console.log('rendering logComponent') }, [])
  const { store, dispatch } = useContext(Ctx)
  const { reg_email, reg_pass, reg_uname } = store.forms.reg_form

  const handleSubmit = event => {
    event.preventDefault()
    // setLoading(true)
    
    return (async () => {
      const url = `/api/users/sign_up?email=${reg_email}&password=${reg_pass}&username=${reg_uname}`
      const signIn_QUERY = await fetch(url, { method: 'POST' })
      const QUERY_response = await signIn_QUERY.json()
      if (QUERY_response.status === '200') {
        console.log(
          '%cnewUserQuery', 'color: orange',
          signIn_QUERY, '\n',
          QUERY_response)
        history.push('/')
        return dispatch({
          type: 'SET_LOGGED',
          payload: QUERY_response.data.username
        })
      }
    })()
  }
  const handleOnChange = event => 
    dispatch({
      category: 'REG_LOG_FORM',
      type: 'SET_REG_INPUT_VALUE',
      name: event.target.name,
      value: event.target.value
    })
  return (
    <div className={styles.formWrapper}>
      <div className={styles.form_headline}>
        <h4>Create your account</h4>
      </div>
      <Spinner />
      <form
        className={styles.form}
        onSubmit={handleSubmit}>
        <div className={styles.form_section}>
          <label htmlFor='email-input' className={styles.form_label}>
            Username
            <span style={{ color: 'red' }}> *</span>
          </label>
          <input
            type='text'
            id='username-input'
            name='reg_uname'
            value={reg_uname}
            onChange={handleOnChange}
            min={5}
            max={16}
            required
          />
          <span className={styles.form_section_flash}>
            This will be you're username.
            Min length - 5 chars, max - 16.
          </span>
        </div>

        <div className={styles.form_section}>
          <label htmlFor='email-input' className={styles.form_label}>
            Email adress
            <span style={{ color: 'red' }}> *</span>
          </label>
          <input
            type='email'
            id='email-input'
            name='reg_email'
            value={reg_email}
            onChange={handleOnChange}
            min={5}
            max={16}
            required
          />
          <span
            className={styles.form_section_flash}>
            The email adress will be used to sign in. 
          </span>
        </div>

        <div className={styles.form_section}>
          <label htmlFor='pass-input' className={styles.form_label}>
            Password <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type='password'
            name='reg_pass'
            value={reg_pass}
            onChange={handleOnChange}
            min={5}
            max={16}
            required
          />
          <span
            className={styles.form_section_flash}>
            The password. 
          </span>
        </div>

        <div
          className={styles.form_section}
          style={{
            marginTop: 25,
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}>
          <input
            type='submit'
            value='Sign up'
            className={styles.submitButton}
          />
          <div className={styles.sign_up}>
            <p>
              Have an account?
          <Link to='/'> Sign in</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
