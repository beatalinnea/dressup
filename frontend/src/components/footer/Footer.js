/** @jsxImportSource @emotion/react */

/**
 * Module for Footer component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import { footerStyle } from './Footer.css'

/**
 * Footer component for displaying a footer
 *
 * @component
 * @returns {JSX.Element} Rendered component.
 */
const Footer = () => {

  return <section css={footerStyle}>
    <p>dressup</p>
    <p>Contact: Beata Eriksson | be222gr@student.lnu.se</p>
    <p>This is a web application developed in the course 1dv613 at Linnaeus University</p>
  </section>

}

export default Footer