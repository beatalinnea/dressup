/** @jsxImportSource @emotion/react */

/**
 * Module for Home page.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import { textPageStyle } from './TextPages.css'
import Heading from '../components/headingText/Heading'

/**
 * Home cpage.
 *
 * This component represents the home page of the application.
 *
 * @returns {JSX.Element} Home component.
 */
const Home = () => {
  return (
    <div>
      <Heading text="Home"></Heading>
      <section css={textPageStyle}>
        <h2>welcome to dressup</h2>
        <p>your wardrobe assistant application that lets you do your outfit planning from the couch</p>
        <div>
          <p> ~ ✿ ~ ꕥ ~ ❀ ~  <b>Cookies & GDPR</b>  ~ ❀ ~ ꕥ ~ ✿ ~ </p>
          <p>When you choose to register at dressup - we will ask for your personal details. These will not be in other use than for us to know who you are as a user of our application</p>
          <p>When you log in to your account we will give you a cookie - for you to be comfortable in not having to log in everytime you refresh your page. When you log out - we always clean up after us and the cookie  will be removed</p>
          <p>The images you choose to upload will only be reached by yourself</p>
          <p>If you choose to delete your account :-( all of your uploaded images and personal information will be cleared from our stored data, and there will be no trace left after you</p>
          <p> ~ ✿ ~ ꕥ ~ ❀ ~ ꕥ ~ ✿ ~ ❀ ~ ✿ ~ ꕥ ~ ❀ ~ ꕥ ~ ✿ ~ </p>
        </div>
        <ul>
          <li>
            <h3>Create an account</h3>
            <p>↓</p>
          </li>
          <li>
            <h3>Upload pictures of your clothes</h3>
            <p>↓</p>
          </li>
          <li>
            <h3>Build new outfit combinations</h3>
            <p>↓</p>
          </li>
          <li>
            <h3>Save your favorite looks</h3>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Home