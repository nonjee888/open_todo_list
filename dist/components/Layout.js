"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var StyledLayout = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-width: 900px;\n  height: 100%;\n  margin: 0 auto;\n  font-family: -apple-system, BlinkMacSystemFont, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n"], ["\n  max-width: 900px;\n  height: 100%;\n  margin: 0 auto;\n  font-family: -apple-system, BlinkMacSystemFont, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n"])));
var Layout = function (props) {
    return <StyledLayout>{props.children}</StyledLayout>;
};
exports.default = Layout;
var templateObject_1;
