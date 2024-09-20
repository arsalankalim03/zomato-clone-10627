"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _allModels = require("../../allModels");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Router = _express.default.Router();

/**
 * Route     /:resId
 * Des       Get all review for a particular restaurant
 * Params    resId
 * Access    Public
 * Method    GET
 */
Router.get("/:resId", async (req, res) => {
  try {
    const {
      resId
    } = req.params;
    const reviews = await _allModels.ReviewModel.find({
      restaurants: resId
    }).sort({
      createdAt: -1
    });
    return res.json({
      reviews
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /new
 * Des       Add new food/restaurant review and rating
 * Params    none
 * Access    Private
 * Method    POST
 */
Router.post("/new", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.user;
    const {
      reviewData
    } = req.body;
    const review = await _allModels.ReviewModel.create({
      ...reviewData,
      user: _id
    });
    return res.json({
      review
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /delete/:id
 * Des       Delete a specific review
 * Params    _id
 * Access    Private
 * Method    Delete
 */
Router.delete("/delete/:id", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const {
      id
    } = req.params;
    const data = await _allModels.ReviewModel.findOneAndDelete({
      _id: id,
      user: user._id
    });
    if (!data) {
      return res.json({
        message: "Review was not deleted"
      });
    }
    return res.json({
      message: "Successfully deleted the review.",
      data
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = exports.default = Router;