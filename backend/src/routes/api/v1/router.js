/**
 * API version 1 routes.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import express from 'express'
import { router as accountRouter } from './account-router.js'
import { router as clothesRouter } from './clothes-router.js'
import { router as outfitRouter } from './outfit-router.js'
import { router as userRouter } from './user-router.js'

export const router = express.Router()

// Description message for API.
router.get('/', (req, res) => res.json({
  message: 'Welcome to version 1 of this RESTful API!',
  endpoints: [
    { path: '/register', method: 'POST', description: 'Register a new user account' },
    { path: '/login', method: 'POST', description: 'Log in and obtain an access token, will set a cookie' },
    { path: '/update-login', method: 'POST', description: 'Check if valid access token in cookie' },
    { path: '/log-out', method: 'DELETE', description: 'Will clear cookie' },
    { path: '/user/:id', method: 'GET', description: 'Retrieve user information' },
    { path: '/user', method: 'DELETE', description: 'Delete the user account' },
    { path: '/clothes', method: 'GET', description: 'Retrieve all clothes' },
    { path: '/clothes/tops', method: 'GET', description: 'Retrieve all tops' },
    { path: '/clothes/pants', method: 'GET', description: 'Retrieve all pants' },
    { path: '/clothes/shoes', method: 'GET', description: 'Retrieve all shoes' },
    { path: '/clothes', method: 'POST', description: 'Create a new clothing item' },
    { path: '/clothes/:id', method: 'DELETE', description: 'Delete a specific clothing item' },
    { path: '/clothes/user', method: 'DELETE', description: 'Delete all clothes by user' },
    { path: '/outfits/', method: 'GET', description: 'Retrieve all outfits' },
    { path: '/outfits/:id', method: 'GET', description: 'Retrieve certain outfit' },
    { path: '/outfits', method: 'POST', description: 'Create a new outfit' },
    { path: '/outfits/:id', method: 'DELETE', description: 'Delete a specific outfit' },
    { path: '/outfits/user', method: 'DELETE', description: 'Delete all outfits by user' }
  ]
}))

router.use('/', accountRouter)
router.use('/clothes', clothesRouter)
router.use('/outfits', outfitRouter)
router.use('/user', userRouter)
