/**
 * useLogOut, collected methods to be used and handled from AuthContext, handling user logout and account deletion.
 * Getting help and inspiration from
 * 'https://github.com/iamshaunjp/MERN-Auth-Tutorial/blob/lesson-17/frontend/src/hooks/useLogin.js'
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */


import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useClothesContext } from '../hooks/useClothesContext'

/**
 * Custom hook for handling user logout and account deletion.
 *
 * @function useLogOut
 * @returns {object} Logout and account deletion functions, loading state, and error
 */
export const useLogOut = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch, user } = useAuthContext()
  const { setToNull } = useClothesContext()

  /**
   * Performs user logout.
   *
   * @function logOut
   * @throws {Error} If an error occurs during the logout process
   */
  const logOut = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}log-out`, {
        method: 'POST',
        withCredentials: true,
        credentials: 'include'
      })
      if (!response.ok) {
        const error = new Error()
        throw error
      }

      // update the auth context
      await dispatch({ type: 'LOGOUT' })
      await setToNull()

      // update loading state
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError('An error occurred while logging out')
    }
  }

  /**
   * Deletes the user account.
   *
   * @function deleteAccount
   * @throws {Error} If an error occurs during the account deletion process
   */
  const deleteAccount = async () => {
    setIsLoading(true)
    setError(null)
    // update the auth context
    await dispatch({ type: 'LOGOUT' })
    await setToNull()

    try {
      localStorage.removeItem('user')
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}user`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`
        },
      })
      if (!response.ok) {
        const error = new Error(`Fetch error ${response.status}`)
        error.message = `Fetch error ${response.status}`
      }
      // update loading state
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setError('An error occurred while deleting account')
    }
  }

  return { logOut, isLoading, error, deleteAccount }
}