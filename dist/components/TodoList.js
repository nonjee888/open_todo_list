"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var Todo_1 = require("./Todo");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var todos_1 = require("../redux/modules/todos");
var storage_1 = require("../utils/storage");
var page_1 = require("../utils/page");
var Pagination_1 = require("./Pagination");
var StPageNumberUl = styled_components_1.default.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  margin-block-start: 0;\n  margin-block-end: 0;\n  list-style: none;\n  padding: 0;\n  gap: 10px;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  background-color: aliceblue;\n"], ["\n  display: flex;\n  justify-content: center;\n  margin-block-start: 0;\n  margin-block-end: 0;\n  list-style: none;\n  padding: 0;\n  gap: 10px;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  background-color: aliceblue;\n"])));
var TodoList = function (props) {
    var _a = (0, react_redux_1.useSelector)(function (state) { return state.todos; }), todos = _a.todos, error = _a.error;
    var query = props.query || "";
    var dispatch = (0, react_redux_1.useDispatch)();
    var _b = (0, react_1.useState)(1), currentPage = _b[0], setCurrentPage = _b[1];
    var paginate = function (pageNumber) { return setCurrentPage(pageNumber); };
    var localTodos = storage_1.storage.parseToArray("allTodos");
    // 각 페이지에서 보여질 투두 배열
    var currentTodos = page_1.page.showCurrentTodos(page_1.page.indexOfFirstTodo(currentPage), page_1.page.indexOfLastTodo(currentPage), error ? localTodos : todos, query);
    // 페이지 나누기
    var pageNumber = [];
    page_1.page.numberArray(error ? localTodos : todos, pageNumber);
    (0, react_1.useEffect)(function () {
        dispatch((0, todos_1.fetchTodos)());
    }, []);
    return (<>
      {currentTodos &&
            currentTodos.map(function (todo) {
                return <Todo_1.default props={props} todo={todo} key={todo.id} error={error}/>;
            })}
      <StPageNumberUl>
        {pageNumber.map(function (pageNum) {
            return (<Pagination_1.default pageNum={pageNum} key={pageNum} paginate={paginate} selected={currentPage}/>);
        })}
      </StPageNumberUl>
    </>);
};
exports.default = TodoList;
var templateObject_1;
