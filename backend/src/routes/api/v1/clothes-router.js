/**
 * API version 1 Clothes routes.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { ClothesController } from '../../../controllers/api/clothes-controller.js'

export const router = express.Router()

const controller = new ClothesController()

// -------
// HELPERS:
// -------

/**
 * Authenticates requests.
 *
 * If authentication is successful, `req.user`is populated and the
 * request is authorized to continue.
 * If authentication fails, an unauthorized response will be sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  try {
    const [authenticationScheme, token] = req.headers.authorization?.split(' ')

    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme.')
    }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = {
      username: payload.sub,
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email
    }

    next()
  } catch (err) {
    const error = createError(401)
    error.cause = err
    next(error)
  }
}

// -------
// ROUTES:
// -------

// Provide req.clothes to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadClothes(req, res, next, id))

// GET clothes
router.get('/', authenticateJWT, (req, res, next) => controller.findAll(req, res, next))

// GET certain categories
router.get('/shoes', authenticateJWT, (req, res, next) => controller.findShoes(req, res, next))
router.get('/pants', authenticateJWT, (req, res, next) => controller.findPants(req, res, next))
router.get('/tops', authenticateJWT, (req, res, next) => controller.findTops(req, res, next))

// GET clothes/:id
router.get('/:id', authenticateJWT, (req, res, next) => controller.find(req, res, next))

// POST clothes
router.post('/', authenticateJWT, (req, res, next) => controller.create(req, res, next))

// DELETE clothes/:id
router.delete('/:id', authenticateJWT, (req, res, next) => controller.delete(req, res, next))

// DELETE clothes by user
router.delete('/user', (req, res, next) => controller.deleteAllByUser(req, res, next))
