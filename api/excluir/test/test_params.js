require('../config/database.js')("mongodb://localhost/raterestaurant_test"); 

var app = require("../config/express")()
exports.app = app
exports.request = require("supertest-as-promised"),
exports.mongoose = require('mongoose'),
exports.restaurant = app.models.restaurant
