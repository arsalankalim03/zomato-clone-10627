"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateId = exports.validateCategory = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// export const validRequiredString = (string) => {
//   const Schema = joi.object({
//     string: joi.string().required(),
//   });

//   return Schema.validateAsync(string);
// };

const validateId = id => {
  const Schema = _joi.default.object({
    _id: _joi.default.string().required()
  });
  return Schema.validateAsync(id);
};
exports.validateId = validateId;
const validateCategory = category => {
  const Schema = _joi.default.object({
    category: _joi.default.string().required()
  });
  return Schema.validateAsync(id);
};
exports.validateCategory = validateCategory;