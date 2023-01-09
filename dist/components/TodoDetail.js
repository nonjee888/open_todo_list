"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var storage_1 = require("../utils/storage");
var date_1 = require("../utils/date");
var todos_1 = require("../redux/modules/todos");
var EditTodoModal_1 = require("./EditTodoModal");
var Button_1 = require("./Button");
var StDetailDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 500px;\n  height: 300px;\n  margin: 150px auto;\n  display: flex;\n  border-radius: 10px;\n  background-color: #a4ceee;\n  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);\n"], ["\n  width: 500px;\n  height: 300px;\n  margin: 150px auto;\n  display: flex;\n  border-radius: 10px;\n  background-color: #a4ceee;\n  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);\n"])));
var StWrapperDiv = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 400px;\n  height: 200px;\n  margin: auto;\n  word-break: break-all;\n  justify-content: space-between;\n  align-content: center;\n"], ["\n  width: 400px;\n  height: 200px;\n  margin: auto;\n  word-break: break-all;\n  justify-content: space-between;\n  align-content: center;\n"])));
var StIdDiv = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-top: 20px;\n"], ["\n  margin-top: 20px;\n"])));
var StTextDiv = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 400px;\n  margin-top: 60px;\n"], ["\n  width: 400px;\n  margin-top: 60px;\n"])));
var StDeadLineDiv = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-top: 20px;\n  font-weight: 600;\n"], ["\n  margin-top: 20px;\n  font-weight: 600;\n"])));
var StyledButtonsDiv = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n"], ["\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n"])));
var TodoDetail = function () {
    var _a, _b, _c, _d;
    var _e = (0, react_redux_1.useSelector)(function (state) { return state === null || state === void 0 ? void 0 : state.todos; }), error = _e.error, detail = _e.detail;
    var dispatch = (0, react_redux_1.useDispatch)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var id = (0, react_router_dom_1.useParams)().id;
    var _f = (0, react_1.useState)(false), modal = _f[0], setModal = _f[1];
    var localTodosDetail = storage_1.storage.selectById(id);
    (0, react_1.useEffect)(function () {
        dispatch((0, todos_1.getTodos)(id));
        return function () {
            dispatch(todos_1.default.actions.clearDetail());
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        date_1.date.alertfrom3DaysLeft(detail === null || detail === void 0 ? void 0 : detail.deadLine);
        if ((error === null || error === void 0 ? void 0 : error.message) === "Network Error") {
            date_1.date.alertfrom3DaysLeft((_a = localTodosDetail[0]) === null || _a === void 0 ? void 0 : _a.deadLine);
        }
    }, [(error && ((_a = localTodosDetail[0]) === null || _a === void 0 ? void 0 : _a.deadLine)) || detail.deadLine]);
    var closeModal = function () {
        setModal(false);
    };
    return (<>
      <StDetailDiv>
        <StWrapperDiv>
          {modal ? (<EditTodoModal_1.default detail={detail} localTodosDetail={localTodosDetail} closeModal={closeModal} error={error}/>) : null}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <StIdDiv>{error ? (_b = localTodosDetail[0]) === null || _b === void 0 ? void 0 : _b.id : detail.id}</StIdDiv>
            <StDeadLineDiv>
              D-Day: {error ? (_c = localTodosDetail[0]) === null || _c === void 0 ? void 0 : _c.deadLine : detail.deadLine}
            </StDeadLineDiv>
          </div>
          <StTextDiv>
            {error ? (_d = localTodosDetail[0]) === null || _d === void 0 ? void 0 : _d.text : detail.text}
          </StTextDiv>
          <StyledButtonsDiv>
            <Button_1.default onClick={function () {
            setModal(true);
        }}>
              수정
            </Button_1.default>
            <Button_1.default onClick={function () {
            navigate("/");
        }}>
              이전
            </Button_1.default>
          </StyledButtonsDiv>
        </StWrapperDiv>
      </StDetailDiv>
    </>);
};
exports.default = TodoDetail;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
