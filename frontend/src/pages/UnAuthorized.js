/** @jsxImportSource @emotion/react */

/**
 * Module for UnAuthorized page.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import { textPageStyle } from './TextPages.css'
import Button from '../components/inputButton/Button'
import Heading from '../components/headingText/Heading'
import { NavLink } from 'react-router-dom'
import UnorderedList from '../components/unorderedList/UnorderedList'

/**
 * Renders the UnAuthorized page.
 *
 * This component displays a message and provides buttons to navigate to the home page and login page.
 * @returns {JSX.Element} UnAuthorized component.
 */
export default function UnAuthorized() {
  return (
    <section css={textPageStyle}>
      <Heading text="401"></Heading>
      <p>This page is not available :-(</p>
      <UnorderedList>
        <NavLink to='/'>
          <Button
            buttonText='Go To Home'
            buttonColor='#D4C7FF'
          />
        </NavLink>
        <NavLink to='/account'>
          <Button
            buttonText='Go To Login'
            buttonColor='#D4C7FF'
          />
        </NavLink>
      </UnorderedList>
    </section>
  )
}