"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Footer_1 = require("../components/Footer");
var Header_1 = require("../components/Header");
var Layout_1 = require("../components/Layout");
var TodoDetail_1 = require("../components/TodoDetail");
var DetailPage = function () {
    return (<Layout_1.default>
      <Header_1.default />
      <TodoDetail_1.default />
      <Footer_1.default />
    </Layout_1.default>);
};
exports.default = DetailPage;
