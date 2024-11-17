/**
 * Module for the OutfitController.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import { Outfit } from '../../models/outfit.js'

/**
 * Encapsulates a controller.
 */
export class OutfitController {
  /**
   * Sends a JSON response containing all tasks.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const pageSize = 10 // Number of documents per page
      const page = parseInt(req.query.page) || 1 // Current page number
      const outfits = await Outfit.find({ owner: `${req.user.username}` })
        .skip((page - 1) * pageSize)
        .limit(pageSize)

      const totalDocuments = await Outfit.countDocuments({ owner: `${req.user.username}` })
      const totalPages = Math.ceil(totalDocuments / pageSize)

      const response = {
        outfits,
        totalDocuments,
        totalPages
      }

      // if more pages, set url to next page and send to the client.
      if (page < totalPages) {
        const nextPage = page + 1
        response.nextPageUrl = `http://localhost:5000/api/v1/outfits?page=${nextPage}`
      }

      // set header with total amount of documents.
      res.set('X-Total-Count', totalDocuments)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a certain piece of outfit.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    try {
      const outfit = await Outfit.find({ _id: `${req.params.id}` })

      res.json(outfit)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new task.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      const outfits = new Outfit({
        top: req.body.tops,
        pants: req.body.pants,
        shoes: req.body.shoes,
        owner: req.user.username
      })

      await outfits.save()

      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${outfits._id}`
      )

      res
        .location(location.href)
        .status(201)
        .json(outfits)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified clothing piece.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    try {
      await Outfit.deleteOne({ _id: `${req.params.id}` })
      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified clothing piece.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteAllByUser (req, res, next) {
    try {
      await Outfit.deleteMany({ owner: `${req.user.username}` })
      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes the specified clothing piece.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAndDelete (req, res, next) {
    try {
      await Outfit.deleteMany({ pants: `${req.params.id}` })
      await Outfit.deleteMany({ top: `${req.params.id}` })
      await Outfit.deleteMany({ shoes: `${req.params.id}` })
      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}
