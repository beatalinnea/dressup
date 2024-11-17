/**
 * Module for Upload page.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import InputImage from '../components/uploadImage/InputImage'
import Heading from '../components/headingText/Heading'
import UnAuthorized from './UnAuthorized'
import { useAuthContext } from '../hooks/useAuthContext'

/**
 * Upload page.
 *
 * This page displays a heading and an image upload feature.
 * If the user is not logged in, it renders the UnAuthorized page instead.
 */
const Upload = () => {
  const { user } = useAuthContext()

  // If user is not logged in
  if (!user) {
    return <UnAuthorized />
  }

  return (
    <div>
      <Heading text='Upload'></Heading>
      <InputImage />
    </div>
  )
}

export default Upload