/** @jsxImportSource @emotion/react */

/**
 * Module for InputImage component. Taking a lot of learning
 * from 'https://www.youtube.com/watch?v=O3sQRJ4ksPs' 'https://github.com/cyrus8050
 * yt-mern-upload/blob/master/client/src/App.js'
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import FileBase64 from 'react-file-base64'
import React, { useState, useEffect } from 'react'
import { inputStyle } from './InputImage.css'
import Button from '../inputButton/Button'
import { useClosetEdits } from '../../hooks/useClosetEdits'
import FlashMessage from '../../components/flashMessages/FlashMessage'
import { useLogOut } from '../../hooks/useLogOut'

/**
 * InputImage component for uploading an image with category selection.
 *
 * @component
 * @returns {JSX.Element} Rendered component
 */
const InputImage = () => {
  const [item, setItem] = useState({ image: '', category: '' })
  const { addClothing, uploadError } = useClosetEdits()
  const [flashMessage, setFlashMessage] = useState(null)
  const [flashMessageKey, setFlashMessageKey] = useState(0)
  const { logOut } = useLogOut()

  useEffect(() => {
    if (uploadError) {
      setFlashMessage(`${uploadError}`)
      setFlashMessageKey((prevKey) => prevKey + 1)
    }
  }, [uploadError])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (!item.image) {
        setFlashMessage('Must choose an image')
        setItem({
          image: '',
          category: ''
        })
      } else if (!item.category) {
        setFlashMessage('Must choose a category')
      } else {
        const validFormats = ['jpg', 'jpeg', 'png', 'webp']
        const format = item.image.split(';')[0].split('/')[1]
        if (!validFormats.includes(format)) {
          setFlashMessage('Invalid file format. Only JPG, JPEG, PNG, and WEBP formats are allowed.')
        } else {
          await addClothing(item)
          setFlashMessage('Image was uploaded')
        }
        setItem({
          image: '',
          category: ''
        })
      }
      setFlashMessageKey((prevKey) => prevKey + 1)
      e.target.reset()
    } catch (e) {
      await logOut()
    }

  }

  return (
    <form action='' onSubmit={onSubmitHandler} className='input-form' css={inputStyle}>
      <FileBase64
        type='file'
        multiple={false}
        onDone={({ base64 }) => setItem({ ...item, image: base64 })}
      />
      <p>Choose category</p>
      <input
        type='radio'
        name='category'
        id='tops'
        value='tops'
        required
        checked={item.category === 'tops'}
        onChange={(e) => setItem({ ...item, category: e.target.value })}
      />
      <label htmlFor='tops'>Tops</label>
      <input
        type='radio'
        name='category'
        id='pants'
        value='pants'
        required
        checked={item.category === 'pants'}
        onChange={(e) => setItem({ ...item, category: e.target.value })}
      />
      <label htmlFor='pants'>Pants</label>
      <input
        type='radio'
        name='category'
        id='shoes'
        value='shoes'
        required
        checked={item.category === 'shoes'}
        onChange={(e) => setItem({ ...item, category: e.target.value })}
      />
      <label htmlFor='shoes'>Shoes</label>
      <Button buttonText='Upload' buttonColor='#D4C7FF' onClick={() => { }} />
      {flashMessage && <FlashMessage key={flashMessageKey} message={flashMessage} duration={3000} />}
    </form>
  )
}

export default InputImage