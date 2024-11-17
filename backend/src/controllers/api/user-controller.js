/**
 * Module for the UserController.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import { User } from '../../models/user.js'
import createError from 'http-errors'
import { ClothesController } from './clothes-controller.js'
import { OutfitController } from './outfit-controller.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
  /**
   * Provide req.user to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the user to load.
   */
  async loadUser (req, res, next, id) {
    try {
      // Get the user.
      const user = await User.findById(id)

      // If no user found send a 404 (Not Found).
      if (!user) {
        next(createError(404))
        return
      }

      // Provide the user to req.
      req.user = user

      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    res.json(req.user)
  }

  /**
   * Deletes a user and all users outfits and clothes.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    try {
      // Note: Rather have this taken care of in clothes / outfit router
      const outfitController = new OutfitController()
      await outfitController.deleteAllByUser(req, res, next)

      const clothesController = new ClothesController()
      await clothesController.deleteAllByUser(req, res, next)

      await User.deleteOne({ username: `${req.user.username}` })
      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}
