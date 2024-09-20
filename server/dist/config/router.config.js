"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passportJwt = _interopRequireDefault(require("passport-jwt"));
var _allModels = require("../database/allModels");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const JWTStrategy = _passportJwt.default.Strategy;
const ExtractJwt = _passportJwt.default.ExtractJwt;

// Head:{
//  Authorization: "Bearer sadfaervfr4356sdfvasdr34cvasd4"
//}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoApp"
};
var _default = passport => {
  passport.use(new JWTStrategy(options, async (jwt__payload, done) => {
    try {
      const doesUserExist = await _allModels.UserModel.findById(jwt__payload.user);
      if (!doesUserExist) return done(null, false);
      return done(null, doesUserExist);
    } catch (error) {
      throw new Error(error);
    }
  }));
};
exports.default = _default;