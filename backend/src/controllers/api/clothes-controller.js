/**
 * Module for the ClothesController.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import { Clothes } from '../../models/clothes.js'
import createError from 'http-errors'
import { OutfitController } from './outfit-controller.js'

/**
 * Encapsulates a controller.
 */
export class ClothesController {
  /**
   * Provide req.clothes to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the clothing to load.
   */
  async loadClothes (req, res, next, id) {
    try {
      const clothes = await Clothes.findById(id)

      // If no clothing with this id found send a 404 (Not Found).
      if (!clothes) {
        next(createError(404))
        return
      }

      // Provide the clothing id to req.
      req.clothes = clothes

      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all clothes.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const pageSize = 10 // Number of documents per page
      const page = parseInt(req.query.page) || 1 // Current page number

      const clothes = await Clothes.find({ owner: `${req.user.username}` })
        .skip((page - 1) * pageSize)
        .limit(pageSize)

      const totalDocuments = await Clothes.countDocuments({ owner: `${req.user.username}` })
      const totalPages = Math.ceil(totalDocuments / pageSize)

      const response = {
        clothes,
        totalDocuments,
        totalPages
      }

      // if more pages, set url to next page and send to the client.
      if (page < totalPages) {
        const nextPage = page + 1
        response.nextPageUrl = `http://localhost:5000/api/v1/clothes?page=${nextPage}`
      }

      // set header with total amount of documents.
      res.set('X-Total-Count', totalDocuments)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a certain piece of clothing.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    res.json(req.clothes)
  }

  /**
   * Sends a JSON response containing all shoes.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findShoes (req, res, next) {
    try {
      const pageSize = 10 // Number of documents per page
      const page = parseInt(req.query.page) || 1 // Current page number

      const shoes = await Clothes.find({ owner: `${req.user.username}`, category: 'shoes' })
        .skip((page - 1) * pageSize)
        .limit(pageSize)

      const totalDocuments = await Clothes.countDocuments({ owner: `${req.user.username}`, category: 'shoes' })
      const totalPages = Math.ceil(totalDocuments / pageSize)

      const response = {
        shoes,
        totalDocuments,
        totalPages
      }

      // if more pages, set url to next page and send to the client.
      if (page < totalPages) {
        const nextPage = page + 1
        response.nextPageUrl = `http://localhost:5000/api/v1/clothes/shoes?page=${nextPage}`
      }

      // set header with total amount of documents.
      res.set('X-Total-Count', totalDocuments)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all pants.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findPants (req, res, next) {
    try {
      const pageSize = 10 // Number of documents per page
      const page = parseInt(req.query.page) || 1 // Current page number

      const pants = await Clothes.find({ owner: `${req.user.username}`, category: 'pants' })
        .skip((page - 1) * pageSize)
        .limit(pageSize)

      const totalDocuments = await Clothes.countDocuments({ owner: `${req.user.username}`, category: 'pants' })
      const totalPages = Math.ceil(totalDocuments / pageSize)

      const response = {
        pants,
        totalDocuments,
        totalPages
      }

      // if more pages, set url to next page and send to the client.
      if (page < totalPages) {
        const nextPage = page + 1
        response.nextPageUrl = `http://localhost:5000/api/v1/clothes/pants?page=${nextPage}`
      }

      // set header with total amount of documents.
      res.set('X-Total-Count', totalDocuments)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all tops.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findTops (req, res, next) {
    try {
      const pageSize = 10 // Number of documents per page
      const page = parseInt(req.query.page) || 1 // Current page number

      const tops = await Clothes.find({ owner: `${req.user.username}`, category: 'tops' })
        .skip((page - 1) * pageSize)
        .limit(pageSize)

      const totalDocuments = await Clothes.countDocuments({ owner: `${req.user.username}`, category: 'tops' })
      const totalPages = Math.ceil(totalDocuments / pageSize)

      const response = {
        tops,
        totalDocuments,
        totalPages
      }

      // if more pages, set url to next page and send to the client.
      if (page < totalPages) {
        const nextPage = page + 1
        response.nextPageUrl = `http://localhost:5000/api/v1/clothes/tops?page=${nextPage}`
      }

      // set header with total amount of documents.
      res.set('X-Total-Count', totalDocuments)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new piece of clothing.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      const clothes = new Clothes({
        src: req.body.src,
        category: req.body.category,
        owner: req.user.username
      })

      await clothes.save()

      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${clothes._id}`
      )

      res
        .location(location.href)
        .status(201)
        .json(clothes)
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
      const outfitController = new OutfitController()
      await outfitController.findAndDelete(req, res, next)

      await Clothes.deleteOne({ _id: `${req.params.id}` })
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
      await Clothes.deleteMany({ owner: `${req.user.username}` })
      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}
