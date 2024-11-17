/** @jsxImportSource @emotion/react */

/**
 * Module for Looks component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useContext, useState, useEffect } from 'react'
import { useClosetEdits } from '../../hooks/useClosetEdits'
import { useLogOut } from '../../hooks/useLogOut'
import { OutfitContext } from '../../context/OutfitContext'
import { looksStyle } from './Looks.css'
import Button from '../inputButton/Button'

/**
 * Looks component for displaying outfits.
 *
 * @component
 * @returns {JSX.Element} Rendered component.
 */
const Looks = () => {
  const { allOutfits } = useContext(OutfitContext)
  const [displayedOutfits, setDisplayedOutfits] = useState([])
  const { deleteLook } = useClosetEdits()
  const { logOut } = useLogOut()

  // when outfits changes, rerender
  useEffect(() => {
    setDisplayedOutfits(viewOutfits())
  }, [allOutfits])

  /**
   * Renders all outfits.
   *
   * @returns {JSX.Element} Rendered outfits.
   */
  const viewOutfits = () => {
    if (allOutfits === null || !allOutfits.length > 0) {
      return <p>Nothing added here....</p>
    } else {
      const all = allOutfits.map((outfit, i) => (
        <figure key={i}>
          <img src={outfit.top} alt="hej" />
          <img src={outfit.pants} alt="hej" />
          <img src={outfit.shoes} alt="hej" />
          <Button
            buttonText="Delete"
            buttonColor="#D4C7FF"
            onClick={() => {
              deleteThisLook(outfit._id)
            }} />
        </figure>
      ))
      return all
    }
  }

  /**
   * Deletes a look by ID.
   *
   * @param {string} id - The ID of the look to delete. If 401 error then log out.
   */
  const deleteThisLook = async (id) => {
    try {
      await deleteLook(id)
    } catch (error) {
      if (error.status === 401) {
        await logOut()
      }
    }
  }


  return (
    <div css={looksStyle}>
      {displayedOutfits}
    </div>
  )
}

export default Looks
