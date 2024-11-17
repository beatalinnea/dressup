/**
 * useLogIn, collected methods to be used and handled from AuthContext, handling user login.
 * Getting help and inspiration from
 * 'https://github.com/iamshaunjp/MERN-Auth-Tutorial/blob/lesson-17/frontend/src/hooks/useLogin.js'
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * Custom hook for handling user login.
 *
 * @function useLogin
 * @returns {object} Login function, loading state, and error
 */
export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useContext(AuthContext)

  /**
   * Performs user login with the provided username and password.
   *
   * @function login
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @throws {Error} If an error occurs during the login process
   */
  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })

      const json = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          setIsLoading(false)
          setError('password or username invalid')
        }
      }

      if (response.ok) {
        // update the auth context
        await dispatch({ type: 'LOGIN', payload: json })

        // update loading state
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setError('An error occurred while logging in')
    }
  }

  return { login, isLoading, error }
}