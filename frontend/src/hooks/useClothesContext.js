/**
 * useClothesContext, will use Clothescontext.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import { ClothesContext } from '../context/ClothesContext'
import { useContext } from 'react'


/**
 * Custom hook for accessing the clothes context.
 *
 * @function useClothesContext
 * @returns {object} The clothes context object
 */
export const useClothesContext = () => {
  const context = useContext(ClothesContext)

  if (!context) {
    throw Error('useClothesContext must be used inside an ClothesContextProvider')
  }

  return context
}