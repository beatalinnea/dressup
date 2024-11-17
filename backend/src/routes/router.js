/**
 * The routes.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as v1Router } from './api/v1/router.js'

export const router = express.Router()

router.use('/api/v1', v1Router)

// Catch 404 (as the last route).
router.use('*', (req, res, next) => next(createError(404)))
