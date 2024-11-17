/** @jsxImportSource @emotion/react */

/**
 * Module for Closet component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogOut } from '../../hooks/useLogOut'
import { useClosetEdits } from '../../hooks/useClosetEdits'
import { useClothesContext } from '../../hooks/useClothesContext'
import { closetStyle } from "./Closet.css"
import Button from '../inputButton/Button'
import Heading from '../headingText/Heading'
import Looks from './Looks'
import UnAuthorized from '../../pages/UnAuthorized'
import UnorderedList from '../../components/unorderedList/UnorderedList'


/**
 * Closet component for viewing a user's closet.
 *
 * @component
 * @returns {JSX.Element} Rendered component.
 */
const Closet = () => {
  const { allClothes, allShoes, allTops, allPants } = useClothesContext()
  const [displayedClothes, setDisplayedClothes] = useState([])
  const { deleteClothing } = useClosetEdits()
  const { user } = useAuthContext()
  const { logOut } = useLogOut()

  // when allClothes changes, rerender
  useEffect(() => {
    setDisplayedClothes(viewAll())
  }, [allClothes])

  /**
   * Deletes an image by ID, if 401 error occurs user will be logged out.
   *
   * @param {string} id - The ID of the image to delete.
   */
  const deleteImage = async (id) => {
    try {
      await deleteClothing(id)
    } catch (error) {
      if (error.status === 401) {
        await logOut()
      }
    }
  }

  /**
 * Renders all clothes.
 *
 * @returns {JSX.Element} Rendered clothes.
 */
  const viewAll = () => {
    if (!allClothes) {
      return <p>Nothing added here...</p>
    } else if (!allClothes.length > 0) {
      return <p>Nothing added here...</p>
    } else {
      const all = allClothes.map((clothes, i) => (
        <figure key={i}>
          <img id={clothes._id} key={clothes._id} src={clothes.src} alt="hej" />
          <Button
            buttonText="Delete"
            buttonColor="#D4C7FF"
            onClick={() => {
              deleteImage(clothes._id)
            }} />
        </figure>
      ))
      return all
    }
  }

  /**
   * Renders all shoes.
   *
   * @returns {JSX.Element} Rendered shoes.
   */
  const viewShoes = () => {
    if (!allShoes) {
      return <p>Nothing added here...</p>
    } else if (!allShoes.length > 0) {
      return <p>Nothing added here...</p>
    } else {
      const all = allShoes.map((shoes, i) => (
        <figure key={i}>
          <img id={shoes._id} key={shoes._id} src={shoes.src} alt="hej" />
          <Button
            buttonText="Delete"
            buttonColor="#D4C7FF"
            onClick={() => {
              deleteImage(shoes._id)
            }} />
        </figure>
      ))
      return all
    }
  }

  /**
   * Renders all tops.
   *
   * @returns {JSX.Element} Rendered tops.
   */
  const viewTops = () => {
    if (!allTops) {
      return <p>Nothing added here...</p>
    } else if (!allTops.length > 0) {
      return <p>Nothing added here...</p>
    } else {
      const all = allTops.map((tops, i) => (
        <figure key={i}>
          <img id={tops._id} key={tops._id} src={tops.src} alt="hej" />
          <Button
            buttonText="Delete"
            buttonColor="#D4C7FF"
            onClick={() => {
              deleteImage(tops._id)
            }} />
        </figure>
      ))
      return all
    }
  }

  /**
   * Renders all pants.
   *
   * @returns {JSX.Element} Rendered pants.
   */
  const viewPants = () => {
    if (!allPants) {
      return <p>Nothing added here...</p>
    } else if (!allPants.length > 0) {
      return <p>Nothing added here...</p>
    } else {
      const all = allPants.map((pants, i) => (
        <figure key={i}>
          <img id={pants._id} key={pants._id} src={pants.src} alt="hej" />
          <Button
            buttonText="Delete"
            buttonColor="#D4C7FF"
            onClick={() => {
              deleteImage(pants._id)
            }} />
        </figure>
      ))
      return all
    }
  }

  /**
   * Renders looks.
   *
   * @returns {JSX.Element} Rendered looks.
   */
  const viewLooks = () => {
    return <Looks />
  }

  // If user is not logged in
  if (!user) {
    return <UnAuthorized />
  }

  return (
    <div>
      <Heading text="Closet"></Heading>
      <nav style={{ textAlign: "center" }}>
        <UnorderedList>
          <Button
            buttonText="All"
            buttonColor="#D4C7FF"
            onClick={() => {
              setDisplayedClothes(viewAll())
            }}
          />
          <Button
            buttonText="Tops"
            buttonColor="#D4C7FF"
            onClick={() => {
              setDisplayedClothes(viewTops())
            }}
          />
          <Button
            buttonText="Pants"
            buttonColor="#D4C7FF"
            onClick={() => {
              setDisplayedClothes(viewPants())
            }}
          />
          <Button
            buttonText="Shoes"
            buttonColor="#D4C7FF"
            onClick={() => {
              setDisplayedClothes(viewShoes())
            }}
          />
          <Button
            buttonText="Looks"
            buttonColor="#D4C7FF"
            onClick={() => {
              setDisplayedClothes(viewLooks())
            }}
          />
        </UnorderedList>
      </nav>
      <div css={closetStyle}>
        {displayedClothes}
      </div>
    </div>
  )
}

export default Closet