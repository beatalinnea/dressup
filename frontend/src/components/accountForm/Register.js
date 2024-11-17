/** @jsxImportSource @emotion/react */

/**
 * Module for Register component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react'
import { useRegistration } from '../../hooks/useRegistration'
import { accountStyle } from './AccountForm.css'
import Button from '../inputButton/Button'
import FlashMessage from '../../components/flashMessages/FlashMessage'
import Heading from '../headingText/Heading'

/**
 * Register component for user registration functionality.
 *
 * @component
 * @param {boolean} onDone - Indicates whether the registration process is completed.
 * @returns {JSX.Element} - Rendered component.
 */
const Register = ({ onDone }) => {
  const [details, setDetails] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  })
  const { signup, error, isLoading, isRegistered } = useRegistration()
  const [flashMessage, setFlashMessage] = useState(null)

  useEffect(() => {
    if (error) {
      setFlashMessage(<FlashMessage message={error} duration={3000} />)
    }
    if (isRegistered && onDone) {
      onDone(true)
    }
    // If registering again after an error, reset flash messages.
    if (!error) {
      setFlashMessage(null)
    }
  }, [error, isRegistered])

  /**
   * Handles the register form submission.
   *
   * @param {Object} e - The event object.
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    await signup(details)

    setDetails({
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    })
    e.target.reset()
  }

  return (
    <div>
      <Heading text="Register" />
      <form action="" onSubmit={onSubmitHandler} className="input-form" css={accountStyle}>
        <p>Email:</p>
        <input
          type="text"
          className="input-field"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          required
        />
        <p>First name:</p>
        <input
          type="text"
          className="input-field"
          onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
          required
        />
        <p>Last name:</p>
        <input
          type="text"
          className="input-field"
          onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
          required
        />
        <p>Username:</p>
        <input
          type="text"
          className="input-field"
          onChange={(e) => setDetails({ ...details, username: e.target.value })}
          required
        />
        <p>Password:</p>
        <input
          type="password"
          className="input-field"
          minLength="10"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          required
        />
        <Button
          disabled={isLoading}
          buttonText="Register"
          buttonColor="#D4C7FF"
        />
      </form>
      {flashMessage}
    </div>
  )
}

export default Register