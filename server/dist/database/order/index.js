"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const OrderSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Types.ObjectId,
    ref: "users"
  },
  orderDetails: [{
    food: [{
      details: {
        type: _mongoose.default.Types.ObjectId,
        ref: "foods"
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    paymode: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Placed"
    },
    paymentDetails: {
      itemTotal: {
        type: Number,
        required: true
      },
      promo: {
        type: Number,
        required: true
      },
      tax: {
        type: Number,
        require: true
      },
      razorpay_payment_id: {
        type: String,
        required: true
      }
    }
  }]
}, {
  timestamps: true
});
const OrderModel = exports.OrderModel = _mongoose.default.model("orders", OrderSchema);