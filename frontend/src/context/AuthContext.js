/**
 * AuthContext, will handle authentication.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { createContext, useReducer, useEffect } from 'react'
import { useLoadClothes } from '../hooks/useLoadClothes'
import { useLogOut } from '../hooks/useLogOut'

export const AuthContext = createContext({})

/**
 * Reducer function for the authentication state.
 *
 * @callback authReducer
 * @param {Object} state - The current state.
 * @param {Object} action - The action to be performed.
 * @returns {Object} The new state.
 */
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

/**
 * AuthContextProvider component for managing authentication state (and call to loading clothes).
 *
 * @component
 * @param {Object} children - The child components.
 * @returns {JSX.Element} Rendered component.
 */
const AuthContextProvider = ({ children }) => {
  const { fetchClothes, loadClothesError, loadOutfitsError } = useLoadClothes()
  const { logOut } = useLogOut()

  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  /**
   * Check if session is stored, try to update login
   */
  useEffect(() => {
    const getUserFromServer = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}update-login`, {
          method: 'POST',
          credentials: 'include' // Include cookies in the request
        })

        if (response.ok) {
          const user = await response.json()
          dispatch({ type: 'LOGIN', payload: user })
        }
        if (!response.ok) {
          const error = new Error()
          throw error
        }
      } catch (error) {
        console.log('Found no login session to update')
      }
    }
    getUserFromServer()
  }, [])


  // if user, load clothes
  useEffect(() => {
    const loadClothes = async () => {
      try {
        if (state.user) {
          await fetchClothes(state.user.access_token)
        }
        // If can't fetch clothes with token, log out
      } catch (e) {
        logOut()
      }
    }
    // Call the async function
    loadClothes()
  }, [state.user])

  return <AuthContext.Provider
    value={{ ...state, dispatch, loadClothesError, loadOutfitsError }}
  >
    {children}
  </AuthContext.Provider>
}

export default AuthContextProvider