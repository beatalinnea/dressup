/**
 * Module for the AccountController. Learning from example "RESTful tasks with
 * JWT" but not implementing refresh token. When log in - sets cookie, when log out - clears cookie.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { User } from '../../models/user.js'

/**
 * Encapsulates a controller.
 */
export class AccountController {
  /**
   * Authenticates a user. If login successful will set a cookie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      // authenticate with the static method in the model.
      const user = await User.authenticate(req.body.username, req.body.password)

      const payload = {
        sub: user.username,
        given_name: user.firstName,
        family_name: user.lastName,
        email: user.email
      }

      // Create the access token with the shorter lifespan.
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      const oneDayInSeconds = 24 * 60 * 60 // 24 hours * 60 minutes * 60 seconds
      const expirationDate = new Date(Date.now() + oneDayInSeconds * 1000) // Calculate expiration date

      if (req.app.get('env') !== 'development') {
        res
          .cookie('jwtToken', accessToken, {
            expires: expirationDate,
            httpOnly: true,
            sameSite: 'none',
            secure: true
          })
          .status(201)
          .json({
            access_token: accessToken,
            username: user.username
          })
      } else {
        res
          .cookie('jwtToken', accessToken, {
            expires: expirationDate,
            httpOnly: true,
            sameSite: 'Lax',
            secure: false
          })
          .status(201)
          .json({
            access_token: accessToken,
            username: user.username
          })
      }
    } catch (error) {
      // Authentication failed.
      const err = createError(401)
      err.cause = error

      next(err)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })

      await user.save()

      res
        .status(201)
        .json({ id: user.id })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
        err.cause = error
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.cause = error
      }

      next(err)
    }
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async checkCookie (req, res, next) {
    try {
      const jwtToken = req.cookies.jwtToken
      const payload = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256'
      })
      req.user = {
        username: payload.sub,
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email
      }

      res
        .status(201)
        .json({
          access_token: jwtToken,
          username: req.user.username
        })
    } catch (err) {
      const error = createError(401)
      error.cause = err
      next(error)
    }
  }

  /**
   * Will clear set cookie.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async logOut (req, res, next) {
    try {
      if (req.app.get('env') !== 'development') {
        res
          .clearCookie('jwtToken', {
            sameSite: 'none',
            secure: true
          })
          .status(200)
          .send()
      } else {
        res
          .clearCookie('jwtToken')
          .status(200)
          .send()
      }
    } catch (error) {
      next(error)
    }
  }
}
