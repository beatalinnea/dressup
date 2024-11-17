/**
 * Module for Navigation component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import CustomLink from '../link/CustomLink'
import ErrorFlashMessage from '../../components/flashMessages/ErrorFlashMessage'
import Li from '../liElement/Li'

/**
 * Navbar component for displaying the navigation bar.
 *
 * @component
 * @returns {JSX.Element} Rendered component.
 */
const Navbar = () => {
  const { user, loadClothesError, loadOutfitsError } = useAuthContext()
  const [errorFlashMessage, setErrorFlashMessage] = useState(null)

  // Listen to errors when fetching clothes / outfits
  useEffect(() => {
    if (loadClothesError) {
      setErrorFlashMessage(<ErrorFlashMessage message={loadClothesError} duration={3000} />)
    } else if (loadOutfitsError) {
      setErrorFlashMessage(<ErrorFlashMessage message={loadOutfitsError} duration={3000} />)
    } else {
      setErrorFlashMessage(null)
    }
  }, [loadClothesError, loadOutfitsError])

  return (
    <nav style={{ textAlign: 'center' }}>
      {!user ? (
        <ul>
          <Li
            link={<CustomLink path='/' text='Home' />}
          />
          <Li
            link={<CustomLink path='/account' text='Account' />}
          />
        </ul>
      ) : (
        <ul>
          <Li
            link={<CustomLink path='/' text='Home' />}
          />
          <Li
            link={<CustomLink path='/closet' text='Closet' />}
          />
          <Li
            link={<CustomLink path='/outfit-builder' text='Build' />}
          />
          <Li
            link={<CustomLink path='/upload' text='Upload' />}
          />
          <Li
            link={<CustomLink path='/account' text='Account' />}
          />
        </ul>
      )}
      {errorFlashMessage}
    </nav>
  )
}

export default Navbar