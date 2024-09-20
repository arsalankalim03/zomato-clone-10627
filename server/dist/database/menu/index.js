"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MenuSchema = new _mongoose.default.Schema({
  menus: [{
    name: {
      type: String,
      required: true
    },
    items: [{
      type: _mongoose.default.Types.ObjectId,
      ref: "foods"
    }]
  }],
  recommended: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "foods",
    unique: true
  }]
}, {
  timestamps: true
});
const MenuModel = exports.MenuModel = _mongoose.default.model("menus", MenuSchema);