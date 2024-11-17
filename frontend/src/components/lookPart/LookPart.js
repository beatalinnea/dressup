/** @jsxImportSource @emotion/react */

/**
 * Module for LookPart component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useContext, useEffect, useState } from 'react'
import { ClothesContext } from '../../context/ClothesContext'
import Button from '../inputButton/Button'
import { lookPartStyle } from './LookPart.css'


/**
 * LookPart component for rendering a specific category of clothing items.
 *
 * @component
 * @param {string} category - The category of clothing items ('shoes', 'pants', or 'tops').
 * @param {Function} onChange - The function called when the selected item changes.
 * @returns {JSX.Element} Rendered component.
 */
const LookPart = ({ category, onChange }) => {
  // state variables
  const { allShoes, allPants, allTops } = useContext(ClothesContext)
  const [collection, setCollection] = useState()
  const [maxIndex, setMaxIndex] = useState()
  const [counter, setCounter] = useState(0)
  const [displayedItem, setDisplayedItem] = useState()

  // update when clothes changes
  useEffect(() => {
    let newCollection
    if (category === 'shoes' && allShoes && allShoes.length > 0) {
      newCollection = allShoes.map((shoes) => (
        <img id={shoes._id} key={shoes._id} src={shoes.src} alt="hej" />
      ))
    } else if (category === 'pants' && allPants && allPants.length > 0) {
      newCollection = allPants.map((pants) => (
        <img id={pants._id} key={pants._id} src={pants.src} alt="hej" />
      ))
    } else if (category === 'tops' && allTops && allTops.length > 0) {
      newCollection = allTops.map((tops) => (
        <img id={tops._id} key={tops._id} src={tops.src} alt="hej" />
      ))
    } else {
      newCollection = []
      newCollection.push(<p>Nothing added here...</p>)
    }
    setCollection(newCollection)
    setMaxIndex(newCollection.length - 1)
    setDisplayedItem(newCollection[0])
  }, [category, allShoes, allPants, allTops])

  // Counter updates when browsing between images in collection
  useEffect(() => {
    if (collection != null && collection.length > 0) {
      setDisplayedItem(collection[counter])
      onChange(collection[counter].props.id)
    }
  }, [counter, collection])

  /**
   * Handle click event for the left button.
   */
  const handleLeftClick = () => {
    if (counter <= 0) {
      setCounter(maxIndex)
    } else {
      setCounter(counter - 1)
    }
  }

  /**
   * Handle click event for the right button.
   */
  const handleRightClick = () => {
    if (counter >= maxIndex) {
      setCounter(0)
    } else {
      setCounter(counter + 1)
    }
  }

  return (
    <figure css={lookPartStyle}>
      <Button
        buttonText="←"
        buttonColor="#D4C7FF"
        onClick={handleLeftClick} id="right"
      />
      {displayedItem}
      <Button
        buttonText="→"
        buttonColor="#D4C7FF"
        onClick={handleRightClick} id="left"
      />
    </figure>
  )
}

export default LookPart

