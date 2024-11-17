/**
 * useOutfitContext, will use Outfitcontext.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import { OutfitContext } from '../context/OutfitContext'
import { useContext } from 'react'


/**
 * Custom hook for accessing the outfit context.
 *
 * @function useOutfitContext
 * @returns {object} Outfit context
 * @throws {Error} If used outside of an OutfitContextProvider
 */
export const useOutfitContext = () => {
  const context = useContext(OutfitContext)

  if (!context) {
    throw Error('useClothesContext must be used inside an OutfitContextProvider')
  }

  return context
}