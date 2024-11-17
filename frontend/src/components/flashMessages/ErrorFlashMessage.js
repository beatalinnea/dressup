/** @jsxImportSource @emotion/react */

/**
 * Module for ErrorFlashMessage component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react'
import { errorFlashMessageStyle } from './ErrorFlashMessage.css'

/**
 * ErrorFlashMessage component for displaying an error message.
 *
 * @component
 * @param {string} props.message - The error message to display.
 * @param {number} props.duration - The duration (in milliseconds) for which the message should be visible.
 * @returns {JSX.Element|null} Rendered component or null if there is no message.
 */
const ErrorFlashMessage = ({ message, duration }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setVisible(true)

      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [message, duration])

  return visible ? <div css={errorFlashMessageStyle}>{message}</div> : null
}

export default ErrorFlashMessage