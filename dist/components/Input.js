"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var StyledInput = styled_components_1.default.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 35px 0 20px 0;\n  width: 200px;\n  height: 30px;\n  border: none;\n  border-radius: 5px;\n"], ["\n  margin: 35px 0 20px 0;\n  width: 200px;\n  height: 30px;\n  border: none;\n  border-radius: 5px;\n"])));
var Input = function (props) {
    return (<StyledInput style={props.style} type={props.type} required={props.required} value={props.value || ""} onChange={props.onChange} placeholder={props.placeholder} min={props.min}/>);
};
exports.default = Input;
var templateObject_1;
