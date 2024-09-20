"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _allModels = require("../../allModels");
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Router = _express.default.Router();

/**
 * Route     /
 * Des       Get authorized user data
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get("/", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      email,
      fullName,
      phoneNumber,
      address
    } = req.user;
    return res.json({
      user: {
        email,
        fullName,
        phoneNumber,
        address
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /:_id
 * Des       Get user data (For the review system)
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const getUser = await _allModels.UserModel.findById(_id);
    if (!getUser) {
      return res.status(404).json({
        error: "User not found"
      });
    }
    const {
      fullName
    } = getUser;
    return res.json({
      user: {
        fullName
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /:_id
 * Des       Update user data
 * Params    _id
 * Access    Private
 * Method    PUT
 */
Router.put("/update/:_id", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const {
      userData
    } = req.body;
    userData.password = undefined;
    const updateUserData = await _allModels.UserModel.findByIdAndUpdate(_id, {
      $set: userData
    }, {
      new: true
    });
    return res.json({
      user: updateUserData
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = exports.default = Router;