/** @jsxImportSource @emotion/react */

/**
 * Module for LogIn component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogin } from '../../hooks/useLogIn'

import Button from '../inputButton/Button'
import FlashMessage from '../../components/flashMessages/FlashMessage'
import Heading from '../headingText/Heading'
import { accountStyle } from './AccountForm.css'

/**
 * LogIn component for user login functionality.
 *
 * @component
 * @param {boolean} onDone - Indicates whether the login process is completed.
 * @returns {JSX.Element} - Rendered component.
 */
const LogIn = ({ onDone }) => {
  const [details, setDetails] = useState({ username: '', password: '' })
  const { login, error, isLoading } = useLogin()
  const [flashMessage, setFlashMessage] = useState(null)
  const { user } = useAuthContext()

  useEffect(() => {
    if (error) {
      setFlashMessage(<FlashMessage message={error} duration={3000} />)
    }
    if (user && onDone) {
      onDone(true)
    }
    if (!error) {
      setFlashMessage(null)
    }
  }, [user, error])

  /**
   * Handles the log in form submission.
   *
   * @param {Object} e - The event object.
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (typeof details.username === 'string' && typeof details.password === 'string') {
      await login(details.username, details.password)
    }

    setDetails({
      username: '',
      password: ''
    })
    e.target.reset()
  }

  return (
    <div>
      <Heading text="Log in" />
      <form action="" onSubmit={onSubmitHandler} className="input-form" css={accountStyle}>
        <p>Username:</p>
        <input
          type="text"
          className="input-field"
          onChange={e => setDetails({ ...details, username: e.target.value })}
          required
        />
        <p>Password:</p>
        <input
          type="password"
          className="input-field"
          minLength="10"
          onChange={e => setDetails({ ...details, password: e.target.value })}
          required
        />
        <Button
          disabled={isLoading}
          buttonText="Log In"
          buttonColor="#D4C7FF"
        />
      </form>
      {flashMessage}
    </div>
  )
}

export default LogIn