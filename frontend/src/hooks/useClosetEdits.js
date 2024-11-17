/**
 * useClosetEdits, collected methods to be used and handled from clothes context.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import { useClothesContext } from '../hooks/useClothesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useOutfitContext } from '../hooks/useOutfitContext'

/**
 * Managing closet edits.
 *
 * @function useClosetEdits
 * @returns {object} Object containing functions and errors related to closet edits
 */
export const useClosetEdits = () => {
  const { deletePiece, addWardrobePiece, uploadError } = useClothesContext()
  const { deleteOutfit, addOutfit, getAllOutfits } = useOutfitContext()
  const { user } = useAuthContext()

  /**
   * Deletes a clothing piece from the closet.
   *
   * @function deleteClothing
   * @param {string} id - The ID of the clothing piece to delete
   */
  const deleteClothing = async (id) => {
    if (user) {
      await deletePiece(id, user.access_token)
      // reload outfits when a clothing piece gets deleted
      await getAllOutfits(user.access_token)
    }
  }

  /**
   * Deletes a look/outfit from the closet.
   *
   * @function deleteLook
   * @param {string} id - The ID of the look/outfit to delete
   */
  const deleteLook = async (id) => {
    if (user) {
      await deleteOutfit(id, user.access_token)
    }
  }

  /**
   * Adds a look/outfit to the closet.
   *
   * @function addLook
   * @param {string} id - The ID of the look/outfit to add
   */
  const addLook = async (id) => {
    if (user) {
      await addOutfit(id, user.access_token)
    }
  }

  /**
   * Adds a clothing piece to the closet.
   *
   * @function addClothing
   * @param {string} id - The ID of the clothing piece to add
   */
  const addClothing = async (id) => {
    if (user) {
      await addWardrobePiece(id, user.access_token)
    }
  }

  return { deleteClothing, deleteLook, addLook, addClothing, uploadError }
}