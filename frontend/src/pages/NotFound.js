/** @jsxImportSource @emotion/react */

/**
 * Module for NotFound page.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import { textPageStyle } from './TextPages.css'
import Button from '../components/inputButton/Button'
import Heading from '../components/headingText/Heading'
import { NavLink } from 'react-router-dom'

/**
 * NotFound page.
 *
 * This component represents the page for 404 (Not Found) errors.
 *
 * @returns {JSX.Element} NotFound component.
 */
export default function NotFound() {
  return (
    <section css={textPageStyle}>
      <Heading text="404"></Heading>
      <p>This page was not found :-(</p>
      <NavLink to="/">
        <Button
          buttonText="Go To Home"
          buttonColor="#D4C7FF"
        />
      </NavLink>
    </section>
  )
}