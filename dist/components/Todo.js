"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var react_router_dom_1 = require("react-router-dom");
var StTodoUl = styled_components_1.default.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  list-style: none;\n  padding-inline-start: 0;\n  margin-block-start: 0;\n  margin-block-end: 0;\n"], ["\n  list-style: none;\n  padding-inline-start: 0;\n  margin-block-start: 0;\n  margin-block-end: 0;\n"])));
var StTodoLi = styled_components_1.default.li(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 100px;\n  list-style: none;\n  align-items: center;\n  padding-left: 10px;\n  cursor: pointer;\n  background-color: aliceblue;\n  display: grid;\n  grid-template-columns: 5% 70% 20%;\n  gap: 20px;\n"], ["\n  height: 100px;\n  list-style: none;\n  align-items: center;\n  padding-left: 10px;\n  cursor: pointer;\n  background-color: aliceblue;\n  display: grid;\n  grid-template-columns: 5% 70% 20%;\n  gap: 20px;\n"])));
var StInput = styled_components_1.default.input(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 20px;\n  height: 20px;\n"], ["\n  width: 20px;\n  height: 20px;\n"])));
var StTextdiv = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  &:hover {\n    color: #0071ce;\n  }\n"], ["\n  &:hover {\n    color: #0071ce;\n  }\n"])));
var Todo = function (_a) {
    var props = _a.props, todo = _a.todo;
    var checkedItems = props.checkedItems, setCheckedItems = props.setCheckedItems;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleSingleCheck = function (checked, id) {
        if (checked) {
            setCheckedItems(function (prev) { return __spreadArray(__spreadArray([], prev, true), [id], false); });
        }
        else {
            // checkedItems에서 선택 해제시 선택한 todo의 id와 다른 요소들만 checkeItems에 담기
            setCheckedItems(checkedItems.filter(function (el) { return el !== id; }));
        }
    };
    return (<>
      <StTodoUl>
        <StTodoLi>
          <StInput id={todo.id} type="checkbox" name={"select-".concat(todo.id)} onChange={function (e) {
            handleSingleCheck(e.target.checked, todo.id);
        }} checked={checkedItems.includes(todo.id) ? true : false}/>
          <StTextdiv onClick={function () {
            navigate("/" + todo.id);
        }}>
            {todo.text}
          </StTextdiv>
          <div>D-Day : {todo.deadLine}</div>
        </StTodoLi>
      </StTodoUl>
    </>);
};
exports.default = Todo;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
