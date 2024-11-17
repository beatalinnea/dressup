/** @jsxImportSource @emotion/react */

/**
 * Module for CustomLink component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import { linkStyle } from './CustomLink.css'
import { Link } from 'react-router-dom'

/**
 * CustomLink component for rendering a custom link.
 *
 * @component
 * @param {string} path - The URL path for the link.
 * @param {string} text - The text to display in the link.
 * @returns {JSX.Element} Rendered component.
 */
const CustomLink = ({ path, text }) => {

  return <Link css={linkStyle} to={path}>{text}</Link>

}

export default CustomLink