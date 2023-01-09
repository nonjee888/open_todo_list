"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TodoList_1 = require("./TodoList");
var styled_components_1 = require("styled-components");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var todos_1 = require("../redux/modules/todos");
var date_1 = require("../utils/date");
var storage_1 = require("../utils/storage");
var react_id_generator_1 = require("react-id-generator");
var Button_1 = require("./Button");
var Input_1 = require("./Input");
var StForm = styled_components_1.default.form(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: #ececec;\n  height: 100px;\n"], ["\n  background-color: #ececec;\n  height: 100px;\n"])));
var StElementsDiv = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  margin-left: 10px;\n  gap: 20px;\n"], ["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  margin-left: 10px;\n  gap: 20px;\n"])));
var Form = function () {
    var id = (0, react_id_generator_1.default)();
    var _a = (0, react_1.useState)(""), text = _a[0], setText = _a[1];
    var _b = (0, react_1.useState)(""), deadLine = _b[0], setDeadLine = _b[1];
    var _c = (0, react_1.useState)([]), checkedItems = _c[0], setCheckedItems = _c[1];
    var _d = (0, react_1.useState)(function () { return localStorage.getItem("search"); }), query = _d[0], setQuery = _d[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var onSubmitHandler = function (e) {
        e.preventDefault();
        var req = {
            id: id,
            text: text,
            deadLine: deadLine,
        };
        // LocalStorage에 todo 추가
        storage_1.storage.addTodo("allTodos", req);
        // API Post 요청
        dispatch((0, todos_1.createTodos)(req));
        setText("");
        setDeadLine("");
    };
    var onDeleteHandler = function () {
        if (checkedItems.length > 0 && window.confirm("삭제할까요?") === true) {
            // LocalStorage Delete
            storage_1.storage.deleteById(checkedItems);
            // API Delete
            dispatch((0, todos_1.deleteTodos)(checkedItems));
            setCheckedItems([]);
        }
        else {
            setCheckedItems([]);
            return false;
        }
    };
    var handleSearch = function (e) {
        setQuery(e.target.value);
        storage_1.storage.saveQuery("search", e.target.value);
    };
    return (<>
      <StForm onSubmit={onSubmitHandler}>
        <StElementsDiv>
          <Input_1.default type={"text"} required value={text} placeholder={"투두를 입력하세요"} onChange={function (e) { return setText(e.target.value); }}/>
          <Input_1.default style={{ cursor: "pointer" }} type={"date"} value={deadLine} required min={date_1.todaysDate} onChange={function (e) { return setDeadLine(e.target.value); }}/>
          <Button_1.default type={"submit"}>등록</Button_1.default>
          <Button_1.default type={"button"} onClick={onDeleteHandler}>
            삭제
          </Button_1.default>
          <Input_1.default type="search" value={query || ""} onChange={handleSearch} placeholder="검색어를 입력하세요"/>
        </StElementsDiv>
      </StForm>
      <TodoList_1.default checkedItems={checkedItems} setCheckedItems={setCheckedItems} query={query}/>
    </>);
};
exports.default = Form;
var templateObject_1, templateObject_2;
