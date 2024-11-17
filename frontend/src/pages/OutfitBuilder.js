/**
 * Module for OutfitBuilder page.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useState } from 'react'
import LookPart from '../components/lookPart/LookPart'
import Heading from '../components/headingText/Heading'
import Button from '../components/inputButton/Button'
import { useClosetEdits } from '../hooks/useClosetEdits'
import UnAuthorized from './UnAuthorized'
import { useAuthContext } from '../hooks/useAuthContext'
import FlashMessage from '../components/flashMessages/FlashMessage'
import { useLogOut } from '../hooks/useLogOut'


/**
 * OutfitBuilder page.
 *
 * This component represents the page for building an outfit. If user is not logged in, will view UnAuthorized page.
 *
 * @returns {JSX.Element} OutfitBuilder component.
 */
const OutfitBuilder = () => {
  // State variables
  const [outfit, setOutfit] = useState({})
  const { addLook } = useClosetEdits()
  const { user } = useAuthContext()
  const [flashMessage, setFlashMessage] = useState(null)
  const [flashMessageKey, setFlashMessageKey] = useState(0)
  const { logOut } = useLogOut()


  /**
   * Saves the outfit to the closet.
   */
  const saveOutfit = async () => {
    setFlashMessage(null)
    try {
      if (outfit.tops !== undefined && outfit.pants !== undefined && outfit.shoes !== undefined) {
        await addLook(outfit)
        setFlashMessage('Outfit was saved')
      } else {
        setFlashMessage('Outfit is not complete')
      }
      setFlashMessageKey((prevKey) => prevKey + 1)
    } catch (e) {
      await logOut()
    }
  }

  /**
   * Handles the change of the image source for a category.
   *
   * @param {string} category - The category of the look part.
   * @param {string} id - The ID of the selected image.
   */
  const handleSrcChange = (category, id) => {
    setOutfit((prevOutfit) => ({
      ...prevOutfit,
      [category]: id,
    }))
  }

  // If user is not logged in
  if (!user) {
    return <UnAuthorized />
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Heading text='Outfit Builder'></Heading>
      <LookPart category='tops' onChange={(id) => handleSrcChange('tops', id)} />
      <LookPart category='pants' onChange={(id) => handleSrcChange('pants', id)} />
      <LookPart category='shoes' onChange={(id) => handleSrcChange('shoes', id)} />
      <Button
        buttonText='Save look'
        buttonColor='#D4C7FF'
        onClick={() => {
          saveOutfit()
        }}
      />
      {flashMessage && <FlashMessage key={flashMessageKey} message={flashMessage} duration={3000} />}
    </div>
  )
}

export default OutfitBuilder