"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1.Router)();
var v1_1 = require("./v1/v1");
// setup version 1 api
try {
    router.use('/v1', v1_1["default"]);
}
catch (err) {
    console.log(err.message);
}
exports["default"] = router;
