/**
 * Account routes.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import express from 'express'
import { AccountController } from '../../../controllers/api/account-controller.js'

export const router = express.Router()

const controller = new AccountController()

// Log in
router.post('/login', (req, res, next) => controller.login(req, res, next))

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))

// POST log out
router.post('/log-out', (req, res, next) => controller.logOut(req, res, next))

// POST update login, check if request has valid cookie
router.post('/update-login', (req, res, next) => controller.checkCookie(req, res, next))
