"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var StHeader = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: 40px;\n  font-weight: 900;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 120px;\n  width: 100%;\n  background-color: #ffffffcc;\n"], ["\n  font-size: 40px;\n  font-weight: 900;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 120px;\n  width: 100%;\n  background-color: #ffffffcc;\n"])));
var Header = function () {
    return <StHeader>TO DO LIST</StHeader>;
};
exports.default = Header;
var templateObject_1;
