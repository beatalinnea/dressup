/**
 * Clothes, will handle clothes.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { createContext, useState, useCallback } from 'react'

export const ClothesContext = createContext({})

/**
 * Context provider component for managing clothes data.
 *
 * @component
 * @param {Object} children - The child components.
 * @returns {JSX.Element} Rendered component.
 */
const ClothesContextProvider = ({ children }) => {

  const [allClothes, setAllClothes] = useState(null)
  const [allPants, setAllPants] = useState(null)
  const [allShoes, setAllShoes] = useState(null)
  const [allTops, setAllTops] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [loadClothesError, setLoadClothesError] = useState(null)


  /**
   * Retrieves all clothes data from the server.
   *
   * @callback getAllClothes
   * @param {string} token - The access token for authentication.
   */
  const getAllClothes = useCallback(async (token) => {
    setLoadClothesError(null)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}clothes`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!response.ok) {
        if (response.status === 401) {
          const error = new Error()
          error.status = 401
          throw error
        } else {
          const error = new Error()
          throw error
        }
      }
      const data = await response.json()
      setAllClothes(data.clothes)

      // should here sort clothes in to categories instead of fetching each category
      if (data.totalPages > 1) {
        // Start fetching from the second page
        await fetchNextPage(2, token)
      }
    } catch (error) {
      if (error.status === 401) {
        setLoadClothesError('Session no longer valid')
        throw error
      } else {
        setLoadClothesError('An error occured when loading clothes')
      }
    }
  }, [])

  /**
   * Fetches the next page of clothes data recursively.
   *
   * @callback fetchNextPage
   * @param {number} page - The page number to fetch.
   * @param {string} token - The access token for authentication.
   */
  const fetchNextPage = useCallback(async (page, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}clothes?page=${page}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!response.ok) {
        if (response.status === 401) {
          const error = new Error()
          error.status = 401
          throw error
        } else {
          const error = new Error()
          throw error
        }
      }
      const data = await response.json()
      setAllClothes(prevClothes => [...prevClothes, ...data.clothes])
      // Fetch the next page
      if (page < data.totalPages) {
        await fetchNextPage(page + 1, token)
      }
    } catch (error) {
      if (error.status === 401) {
        setLoadClothesError('Session no longer valid')
        throw error
      } else {
        setLoadClothesError('An error occured when loading clothes')
      }
    }
  }, [])


  /**
   * Fetches the shoes data from the server. Should be done differently for just one fetch and
   * then sort it to categories instead.
   *
   * @callback fetchShoes
   * @param {string} token - The access token for authentication.
   */
  const fetchShoes = useCallback(async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/shoes`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!response.ok) {
        if (response.status === 401) {
          const error = new Error()
          error.status = 401
          throw error
        } else {
          const error = new Error()
          throw error
        }
      }
      const data = await response.json()
      setAllShoes(data.shoes)
      if (data.totalPages > 1) {
        // Start fetching from the second page
        await fetchNextShoePage(2, token)
      }
    } catch (error) {
      if (error.status === 401) {
        setLoadClothesError('Session no longer valid')
        throw error
      } else {
        setLoadClothesError('An error occured when loading clothes')
      }
    }
  }, [])

  /**
   * Fetches the next page of clothes data recursively.
   *
   * @callback fetchNextShoePage
   * @param {number} page - The page number to fetch.
   * @param {string} token - The access token for authentication.
   */
  const fetchNextShoePage = useCallback(async (page, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/shoes?page=${page}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!response.ok) {
        const error = new Error()
        throw error
      }
      const data = await response.json()
      setAllShoes(prevShoes => [...prevShoes, ...data.shoes])
      // Fetch the next page
      if (page < data.totalPages) {
        await fetchNextShoePage(page + 1, token)
      }
    } catch (e) {
      setLoadClothesError('An error occured when loading clothes')
    }
  }, [])

  /**
   * Fetches the pants data from the server. Should be done differently for just one fetch and
   * then sort it to categories instead.
   *
   * @callback fetchPants
   * @param {string} token - The access token for authentication.
   */
  const fetchPants = useCallback(async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/pants`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!response.ok) {
        if (response.status === 401) {
          const error = new Error()
          error.status = 401
          throw error
        } else {
          const error = new Error()
          throw error
        }
      }
      const data = await response.json()
      setAllPants(data.pants)
      if (data.totalPages > 1) {
        // Start fetching from the second page
        await fetchNextPantsPage(2, token)
      }
    } catch (error) {
      if (error.status === 401) {
        setLoadClothesError('Session no longer valid')
        throw error
      } else {
        setLoadClothesError('An error occured when loading clothes')
      }
    }
  }, [])

  /**
 * Fetches the next page of pants data recursively.
 *
 * @callback fetchNextPantsPage
 * @param {number} page - The page number to fetch.
 * @param {string} token - The access token for authentication.
 */
  const fetchNextPantsPage = useCallback(async (page, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/pants?page=${page}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!response.ok) {
        const error = new Error()
        throw error
      }
      const data = await response.json()
      setAllPants(prevPants => [...prevPants, ...data.pants])
      // Fetch the next page
      if (page < data.totalPages) {
        await fetchNextPantsPage(page + 1, token)
      }
    } catch (e) {
      setLoadClothesError('An error occured when loading clothes')
    }
  }, [])

  /**
   * Fetches the tops data from the server. Should be done differently for just one fetch and
   * then sort it to categories instead.
   *
   * @callback fetchTops
   * @param {string} token - The access token for authentication.
   */
  const fetchTops = useCallback(async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/tops`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!response.ok) {
        if (response.status === 401) {
          const error = new Error()
          error.status = 401
          throw error
        } else {
          const error = new Error()
          throw error
        }
      }
      const data = await response.json()
      setAllTops(data.tops)
      if (data.totalPages > 1) {
        // Start fetching from the second page
        await fetchNextTopsPage(2, token)
      }
    } catch (error) {
      if (error.status === 401) {
        setLoadClothesError('Session no longer valid')
        throw error
      } else {
        setLoadClothesError('An error occured when loading clothes')
      }
    }
  }, [])

  /**
* Fetches the next page of tops data recursively.
*
* @callback fetchNextTopsPage
* @param {number} page - The page number to fetch.
* @param {string} token - The access token for authentication.
*/
  const fetchNextTopsPage = useCallback(async (page, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/tops?page=${page}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!response.ok) {
        const error = new Error()
        throw error
      }
      const data = await response.json()
      setAllTops(prevTops => [...prevTops, ...data.tops])
      // Fetch the next page
      if (page < data.totalPages) {
        await fetchNextPantsPage(page + 1, token)
      }
    } catch (e) {
      setLoadClothesError('An error occured when loading clothes')
    }
  }, [])

  /**
   * Adds a wardrobe piece to the server.
   *
   * @callback addWardrobePiece
   * @param {Object} piece - The wardrobe piece to be added.
   * @param {string} token - The access token for authentication.
   */
  const addWardrobePiece = async (piece, token) => {
    try {
      setUploadError(null)
      const data = {
        src: `${piece.image}`,
        category: piece.category
      }
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}clothes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        if (response.status === 413) {
          setUploadError('This image is too big for me to handle :-(')
        } else if (response.status === 401) {
          const error = new Error()
          error.status = 401
          throw error
        } else {
          const error = new Error()
          throw error
        }
      }
      if (response.ok) {
        getAllClothes(token)
        // Would prefer that getAllClothes sorts into categories instead
        if (piece.category === 'shoes') {
          fetchShoes(token)
        }
        if (piece.category === 'pants') {
          fetchPants(token)
        }
        if (piece.category === 'tops') {
          fetchTops(token)
        }
      }
    } catch (error) {
      if (error.status === 401) {
        setLoadClothesError('Session no longer valid')
        throw error
      } else {
        setUploadError('Error while uploading')
      }
    }
  }

  /**
   * Deletes a wardrobe piece from the server.
   *
   * @callback deletePiece
   * @param {string} id - The ID of the wardrobe piece to be deleted.
   * @param {string} token - The access token for authentication.
   */
  const deletePiece = async (id, token) => {
    setLoadClothesError(null)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      if (!response.ok) {
        if (response.status === 401) {
          const error = new Error()
          error.status = 401
          throw error
        } else {
          const error = new Error()
          throw error
        }
      }
      await getAllClothes(token)
      await fetchShoes(token)
      await fetchPants(token)
      await fetchTops(token)

    } catch (e) {
      if (e.status === 401) {
        setLoadClothesError('Session no longer valid')
        throw e
      } else {
        setLoadClothesError('Error when deleting')
      }
    }
  }

  /**
   * Resets all clothes data to null.
   *
   * @callback setToNull
   * @returns {void}
   */
  const setToNull = () => {
    setAllTops(null)
    setAllPants(null)
    setAllShoes(null)
    setAllClothes(null)
  }

  return <ClothesContext.Provider
    value={{
      allClothes,
      allPants,
      allTops,
      allShoes,
      addWardrobePiece,
      getAllClothes,
      fetchPants,
      fetchShoes,
      fetchTops,
      deletePiece,
      setToNull,
      uploadError,
      loadClothesError
    }}
  >
    {children}
  </ClothesContext.Provider>
}

export default ClothesContextProvider
