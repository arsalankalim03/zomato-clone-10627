"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _router = _interopRequireDefault(require("./config/router.config"));
var _google = _interopRequireDefault(require("./config/google.config"));
var _connection = _interopRequireDefault(require("./database/connection"));
var _auth = _interopRequireDefault(require("./database/api/auth"));
var _food = _interopRequireDefault(require("./database/api/food"));
var _restaurant = _interopRequireDefault(require("./database/api/restaurant"));
var _user = _interopRequireDefault(require("./database/api/user"));
var _menu = _interopRequireDefault(require("./database/api/menu"));
var _order = _interopRequireDefault(require("./database/api/order"));
var _review = _interopRequireDefault(require("./database/api/review"));
var _images = _interopRequireDefault(require("./database/api/images"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Private route authorization config

// Database connection

_dotenv.default.config();
(0, _router.default)(_passport.default);
(0, _google.default)(_passport.default);
const zomato = (0, _express.default)();

// adding additional passport configuration

zomato.use(_express.default.json());
zomato.use((0, _expressSession.default)({
  secret: process.env.JWTSECRET
}));
zomato.use(_passport.default.initialize());
zomato.use(_passport.default.session());
zomato.get("/", (req, res) => {
  res.json({
    message: "Server is running"
  });
});

// /auth/signup
zomato.use("/auth", _auth.default);
zomato.use("/food", _food.default);
zomato.use("/restaurant", _restaurant.default);
zomato.use("/user", _user.default);
zomato.use("/menu", _menu.default);
zomato.use("/order", _order.default);
zomato.use("/review", _review.default);
zomato.use("/image", _images.default);
const PORT = 4000;
zomato.listen(PORT, () => {
  (0, _connection.default)().then(() => {
    console.log("Server is running !!!");
  }).catch(error => {
    console.log("Server is running, but database connection failed...");
    console.log(error);
  });
});