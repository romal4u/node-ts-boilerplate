"use strict";
exports.__esModule = true;
exports.appDataSource = void 0;
var typeorm_1 = require("typeorm");
var ormconfig_1 = require("./config/ormconfig");
exports.appDataSource = new typeorm_1.DataSource(ormconfig_1["default"]);
