/** @jsxImportSource @emotion/react */

/**
 * Module for FlashMessage component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react'
import { flashMessageStyle } from './FlashMessage.css'


/**
 * FlashMessage component for displaying a message.
 *
 * @component
 * @param {string} message - The message to display.
 * @param {number} duration - The duration (in milliseconds) for which the message should be visible.
 * @returns {JSX.Element|null} Rendered component or null if there is no message.
 */
const FlashMessage = ({ message, duration }) => {
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

  return visible ? <div css={flashMessageStyle}>{message}</div> : null
}

export default FlashMessage