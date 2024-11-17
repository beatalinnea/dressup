/**
 * useLoadClothes, collected methods to be used and handled from clothes and outfit context.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import { useState } from 'react'
import { useClothesContext } from '../hooks/useClothesContext'
import { useOutfitContext } from '../hooks/useOutfitContext'

/**
 * Custom hook for loading clothes and outfits.
 *
 * @function useLoadClothes
 * @returns {object} The loading state and error messages
 */
export const useLoadClothes = () => {
  const [isLoading, setIsLoading] = useState(null)
  const { getAllClothes, fetchTops, fetchShoes, fetchPants, loadClothesError } = useClothesContext()
  const { getAllOutfits, loadOutfitsError } = useOutfitContext()

  /**
   * Fetches clothes and outfits from the server.
   *
   * @function fetchClothes
   * @param {string} token - The access token for authorization
   * @throws {Error} If an error occurs during the API calls
   */
  const fetchClothes = async (token) => {
    try {
      setIsLoading(true)
      await getAllClothes(token)
      await fetchTops(token)
      await fetchShoes(token)
      await fetchPants(token)
      await getAllOutfits(token)
      // update loading state
      setIsLoading(false)
      // Error will be catched if first call is 401, throws error.
    } catch (e) {
      // update loading state
      setIsLoading(false)
      throw e
    }
  }

  return { isLoading, loadClothesError, loadOutfitsError, fetchClothes }
}