"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _allModels = require("../../allModels");
var _common = require("../../../validation/common.validation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Router = _express.default.Router();

/**
 * Route     /:_id
 * Des       Create New Food Item
 * Params    none
 * Access    Public
 * Method    POST
 */
// Homework

/**
 * Route     /:_id
 * Des       Get food based on id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.validateId)(req.params);
    const foods = _allModels.FoodModel.findById(_id);
    return res.json({
      foods
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /r/:_id
 * Des       Get all food based on particular restaurant
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/r/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.validateId)(req.params);
    const foods = await _allModels.FoodModel.find({
      restaurant: _id
    });
    return res.json({
      foods
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /c/:category
 * Des       Get all food based on particular category
 * Params    category
 * Access    Public
 * Method    GET
 */
Router.get("/c/:category", async (req, res) => {
  try {
    const {
      category
    } = req.params;
    await (0, _common.validateCategory)(req.params);
    const foods = await _allModels.FoodModel.find({
      category: {
        $regex: category,
        $options: "i"
      }
    });
    if (!foods) return res.status(404).json({
      error: `No food matched with ${category}`
    });
    return res.json({
      foods
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = exports.default = Router;