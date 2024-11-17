/** @jsxImportSource @emotion/react */

/**
 * Module for Account page.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react'
import Heading from '../components/headingText/Heading'
import Button from '../components/inputButton/Button'
import LogIn from '../components/accountForm/LogIn'
import Register from '../components/accountForm/Register'
import UnorderedList from '../components/unorderedList/UnorderedList'
import { useLogOut } from '../hooks/useLogOut'
import FlashMessage from '../components/flashMessages/FlashMessage'
import { useAuthContext } from '../hooks/useAuthContext'

/**
 * Account page.
 * 
 * This component displays the account information and handles registration,
 * login, logout, and account deletion functionalities.
 *
 * @returns {JSX.Element} Account component.
 */
const Account = () => {
  // State variables
  const [viewForm, setViewForm] = useState()
  const { logOut, deleteAccount, error } = useLogOut()
  const [flashMessage, setFlashMessage] = useState(null)
  const { user } = useAuthContext()


  /**
   * useEffect hook to handle error and display flash messages.
   */
  useEffect(() => {
    if (error) {
      setFlashMessage({ message: `${error}`, duration: 3000 })
    }
    if (!error) {
      setFlashMessage(null)
    }
  }, [error])

  /**
   * Set the view to the registration form.
   */
  const viewRegister = () => {
    setFlashMessage(null)
    setViewForm(<Register onDone={handleRegistrationDone} />)
  }

  /**
   * Handle registration done event.
   */
  const handleRegistrationDone = () => {
    setFlashMessage({ message: 'You are now registered!', duration: 3000 })
    setViewForm(null)
  }

  /**
   * Set the view to the login form.
   */
  const viewLogIn = () => {
    setFlashMessage(null)
    setViewForm(<LogIn onDone={handleLogInDone} />)
  }

  /**
   * Handle login done event.
   */
  const handleLogInDone = () => {
    setFlashMessage({ message: 'You are now logged in', duration: 3000 })
    setViewForm(null)
  }

  /**
   * Logout the user.
   */
  const logOutUser = async () => {
    await flashLogOut()
    await logOut()
  }

  /**
   * Display flash message for logout.
   */
  const flashLogOut = async () => {
    setFlashMessage(null)
    setFlashMessage({ message: 'You are now logged out', duration: 3000 })
  }

  /**
   * Display flash message for account deletion.
   */
  const flashDelete = async () => {
    setFlashMessage(null)
    setFlashMessage({ message: 'Your account was deleted', duration: 3000 })
  }

  /**
   * Delete the user account.
   */
  const deleteUser = async () => {
    await flashDelete()
    await deleteAccount()
  }

  return (
    <div>
      <Heading text="Account"></Heading>
      <nav style={{ textAlign: "center" }}>
        {!user ? (
          <UnorderedList>
            <Button
              buttonText="Register"
              buttonColor="#D4C7FF"
              onClick={() => {
                viewRegister()
              }}
            />
            <Button
              buttonText="Log in"
              buttonColor="#D4C7FF"
              onClick={() => {
                viewLogIn()
              }}
            />
          </UnorderedList>
        ) : (
          /* Elements to show when logged in */
          <UnorderedList>
            <h2>Welcome {user.username}</h2>
            <Button
              buttonText="Log out"
              buttonColor="#D4C7FF"
              onClick={() => {
                logOutUser()
              }}
            />
            <Button
              buttonText="Delete Account"
              buttonColor="#D4C7FF"
              onClick={() => {
                deleteUser()
              }}
            />
          </UnorderedList>
        )}
        {viewForm}
        {flashMessage && (
          <FlashMessage message={flashMessage.message} duration={flashMessage.duration} />
        )}
      </nav>
    </div>
  )
}

export default Account
