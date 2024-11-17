/** @jsxImportSource @emotion/react */

/**
 * Module for Li component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import { liStyle } from './Li.css'

/**
 * Li component for rendering a list item element.
 *
 * @component
 * @param {Object|string} link - The link text to display in the list item.
 * @returns {JSX.Element} Rendered component.
 */
const Li = ({ link }) => {

  return <li css={liStyle}>{link}</li>

}

export default Li