/**
 * useRegistration, collected methods to be used and handled from AuthContext, handling user registration.
 * Getting help and inspiration from
 * 'https://github.com/iamshaunjp/MERN-Auth-Tutorial/blob/lesson-17/frontend/src/hooks/Signup.js'
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import { useState } from 'react'

/**
 * Custom hook for user registration.
 *
 * @function useRegistration
 * @returns {object} Registration state and functions
 */
export const useRegistration = () => {
  const [error, setError] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(null)

  /**
   * Performs user registration.
   *
   * @function signup
   * @param {object} details - The user's details.
   * @returns {void}
   */
  const signup = async (details) => {
    setIsLoading(true)
    setError(null)

    const data = {
      email: details.email,
      password: details.password,
      username: details.username,
      firstName: details.firstName,
      lastName: details.lastName
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        if (response.status === 409) {
          setIsLoading(false)
          setError('username or email busy')
        } else if (response.status === 400) {
          setIsLoading(false)
          setError('Invalid input')
        }
      }
      if (response.ok) {
        // update loading state
        setIsRegistered(true)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setError('An error occurred during signup')
    }
  }

  return { signup, isLoading, error, isRegistered }
}