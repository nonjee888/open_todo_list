"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var StyledButton = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: 35px;\n  width: 50px;\n  height: 30px;\n  border: none;\n  cursor: pointer;\n  border-radius: 5px;\n  background: aliceblue;\n"], ["\n  margin-top: 35px;\n  width: 50px;\n  height: 30px;\n  border: none;\n  cursor: pointer;\n  border-radius: 5px;\n  background: aliceblue;\n"])));
var Button = function (props) {
    return (<StyledButton type={props.type} onClick={props.onClick}>
      {props.children}
    </StyledButton>);
};
exports.default = Button;
var templateObject_1;
