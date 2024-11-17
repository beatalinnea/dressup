/**
 * useAuthContext, will use Authcontext.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

/**
 * Custom hook for accessing the authentication context.
 *
 * @function useAuthContext
 * @returns {object} The authentication context
 * @throws {Error} If used outside of an AuthContextProvider
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}