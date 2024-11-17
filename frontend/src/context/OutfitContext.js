/**
 * OutfitContext. Will handle outfits.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { createContext, useState, useCallback } from 'react'

export const OutfitContext = createContext({})

/**
 * Context provider component for managing outfit data.
 *
 * @component
 * @param {Object} children - The child components.
 * @returns {JSX.Element} Rendered component.
 */
const OutfitContextProvider = ({ children }) => {

  const [allOutfits, setAllOutfits] = useState(null)
  const [loadOutfitsError, setLoadOutfitsError] = useState(null)

  /**
   * Retrieves all outfits data from the server.
   *
   * @callback getAllOutfits
   * @param {string} token - The access token for authentication.
   */
  const getAllOutfits = useCallback(async (token) => {
    setLoadOutfitsError(null)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}outfits`, {
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

      for (const item of data.outfits) {
        try {
          const topResponse = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/${item.top}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          })
          const topData = await topResponse.json()
          item.top = topData.src

          const pantsResponse = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/${item.pants}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          })
          const pantsData = await pantsResponse.json()
          item.pants = pantsData.src

          const shoesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/${item.shoes}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          })
          const shoesData = await shoesResponse.json()
          item.shoes = shoesData.src
        } catch (error) {
          setLoadOutfitsError('An error occured when loading clothes')
        }
      }
      setAllOutfits(data.outfits)
      if (data.totalPages > 1) {
        // Start fetching from the second page
        await fetchNextPage(2, token)
      }
    } catch (error) {
      if (error.status === 401) {
        setLoadOutfitsError('Session no longer valid')
        throw error
      } else {
        setLoadOutfitsError('An error occured when loading clothes')
      }
    }
  }, [])

  /**
  * Fetches the next page of outfits data recursively.
  *
  * @callback fetchNextPage
  * @param {number} page - The page number to fetch.
  * @param {string} token - The access token for authentication.
  */
  const fetchNextPage = useCallback(async (page, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}outfits?page=${page}`, {
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

      for (const item of data.outfits) {
        try {
          const topResponse = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/${item.top}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          })
          const topData = await topResponse.json()
          item.top = topData.src

          const pantsResponse = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/${item.pants}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          })
          const pantsData = await pantsResponse.json()
          item.pants = pantsData.src

          const shoesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}clothes/${item.shoes}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          })
          const shoesData = await shoesResponse.json()
          item.shoes = shoesData.src
        } catch (error) {
          setLoadOutfitsError('An error occured when loading clothes')
        }
      }
      setAllOutfits(prevOutfitss => [...prevOutfitss, ...data.outfits])
      // Fetch the next page
      if (page < data.totalPages) {
        await fetchNextPage(page + 1, token)
      }
    } catch (error) {
      if (error.status === 401) {
        setLoadOutfitsError('Session no longer valid')
        throw error
      } else {
        setLoadOutfitsError('An error occured when loading clothes')
      }
    }
  }, [])

  /**
   * Adds an outfit to the server and updates the outfit data.
   *
   * @callback addOutfit
   * @param {Object} outfit - The outfit to be added.
   * @param {string} token - The access token for authentication.
   */
  const addOutfit = async (outfit, token) => {
    setLoadOutfitsError(null)
    try {
      const data = {
        tops: outfit.tops,
        pants: outfit.pants,
        shoes: outfit.shoes
      }
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}outfits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        if (response.status === 401) {
          const error = new Error()
          error.status = 401
        } else {
          const error = new Error()
          throw error
        }
      }
      getAllOutfits(token)
    } catch (e) {
      if (e.status === 401) {
        setLoadOutfitsError('Session no longer valid')
        throw e
      } else {
        setLoadOutfitsError('An error occured when trying to save')
      }
    }
  }

  /**
   * Deletes an outfit from the server and updates the outfit data.
   *
   * @callback deleteOutfit
   * @param {string} id - The ID of the outfit to be deleted.
   * @param {string} token - The access token for authentication.
   */
  const deleteOutfit = async (id, token) => {
    setLoadOutfitsError(null)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}outfits/${id}`, {
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
      getAllOutfits(token)
    } catch (e) {
      if (e.status === 401) {
        setLoadOutfitsError('Session no longer valid')
        throw e
      } else {
        setLoadOutfitsError('An error occured when deleting')
      }
    }
  }

  return <OutfitContext.Provider
    value={{
      allOutfits,
      addOutfit,
      getAllOutfits,
      deleteOutfit,
      loadOutfitsError
    }}
  >
    {children}
  </OutfitContext.Provider>
}

export default OutfitContextProvider