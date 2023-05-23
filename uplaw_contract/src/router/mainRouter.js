"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1.Router)();
var apiRouter_1 = require("./api/apiRouter");
// setup apiRouter
try {
    router.use('/api', apiRouter_1["default"]);
}
catch (e) {
    console.log(e.message);
}
exports["default"] = router;
