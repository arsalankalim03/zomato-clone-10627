"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _multer = _interopRequireDefault(require("multer"));
var _allModels = require("../../allModels");
var _s = require("../../../utils/s3");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Router = _express.default.Router();

// multer configure
const storage = _multer.default.memoryStorage();
const upload = (0, _multer.default)({
  storage
});

/**
 * Route     /:_id
 * Des       Get image details
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    const image = await _allModels.ImageModel.findById(req.params._id);
    return res.json({
      image
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /
 * Des       Upload given image to s3 bucket and save file link to mongoDB
 * Params    _id
 * Access    Public
 * Method    POST
 */
Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const bucketOptions = {
      Bucket: "zomato-clone-10627",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read" // Access Control List
    };
    const uploadImage = await (0, _s.s3Upload)(bucketOptions);
    const dbUpload = await _allModels.ImageModel.create({
      images: [{
        location: uploadImage.Location
      }]
    });
    return res.status(200).json({
      dbUpload
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = exports.default = Router;