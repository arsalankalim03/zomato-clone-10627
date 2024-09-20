"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviewModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ReviewSchema = _mongoose.default.Schema({
  food: {
    type: _mongoose.default.Types.ObjectId,
    ref: "foods"
  },
  restaurant: {
    type: _mongoose.default.Types.ObjectId,
    ref: "restaurants"
  },
  user: {
    type: _mongoose.default.Types.ObjectId,
    ref: "users"
  },
  rating: {
    type: Number,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  isRestaurantReview: Boolean,
  isFoodReview: Boolean,
  photos: {
    type: _mongoose.default.Types.ObjectId,
    ref: "images"
  }
}, {
  timestamps: true
});
const ReviewModel = exports.ReviewModel = _mongoose.default.model("reviews", ReviewSchema);