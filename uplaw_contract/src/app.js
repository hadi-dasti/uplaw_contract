"use strict";
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
//mongodb
var mongo_1 = require("./config/mongo");
(0, mongo_1["default"])();
// main router app
var mainRouter_1 = require("./router/mainRouter");
// setup  environment variable
dotenv.config();
var port = process.env.PORT || 3000;
//start app
var app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', mainRouter_1["default"]);
// SETUP API 
app.listen(port, function () {
    console.log("running application on port ".concat(port));
});
