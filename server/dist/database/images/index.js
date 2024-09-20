"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ImageSchema = new _mongoose.default.Schema({
  images: [{
    location: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});
const ImageModel = exports.ImageModel = _mongoose.default.model("images", ImageSchema);