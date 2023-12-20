"use strict";
exports.__esModule = true;
var express_1 = require("express");
var auth_1 = require("./auth");
var router = (0, express_1.Router)();
router.use('/auth', auth_1["default"]);
exports["default"] = router;
