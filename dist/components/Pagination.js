"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var StNumber = styled_components_1.default.li(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-radius: 100%;\n  width: 30px;\n  height: 30px;\n  border: 1px solid none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1rem;\n  cursor: pointer;\n\n  :hover {\n    color: black;\n    font-weight: bold;\n    text-decoration: underline;\n  }\n"], ["\n  border-radius: 100%;\n  width: 30px;\n  height: 30px;\n  border: 1px solid none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1rem;\n  cursor: pointer;\n\n  :hover {\n    color: black;\n    font-weight: bold;\n    text-decoration: underline;\n  }\n"])));
var Pagination = function (_a) {
    var pageNum = _a.pageNum, paginate = _a.paginate, selected = _a.selected;
    return (<StNumber key={pageNum} onClick={function () { return paginate(pageNum); }} style={selected === pageNum
            ? { background: "#ececec", fontWeight: "900" }
            : { background: "#ffffff" }}>
      {pageNum}
    </StNumber>);
};
exports.default = Pagination;
var templateObject_1;
