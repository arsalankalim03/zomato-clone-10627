"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth2"));
var _allModels = require("../database/allModels");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const GoogleStrategy = _passportGoogleOauth.default.Strategy;
var _default = passport => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      fullName: profile.displayName,
      email: profile.emails[0].value,
      profilePic: profile.photos[0].value
    };
    try {
      const user = await _allModels.UserModel.findOne({
        email: newUser.email
      });
      if (user) {
        const token = user.generateJwtToken();
        done(null, {
          user,
          token
        });
      } else {
        const user = await _allModels.UserModel.create(newUser);
        const token = user.generateJwtToken();
        done(null, {
          user,
          token
        });
      }
    } catch (error) {
      done(error, null);
    }
  }));
  passport.serializeUser((userData, done) => done(null, {
    ...userData
  }));
  passport.deserializeUser((id, done) => done(null, id));
};
exports.default = _default;