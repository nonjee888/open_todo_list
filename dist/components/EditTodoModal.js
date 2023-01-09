"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var storage_1 = require("../utils/storage");
var date_1 = require("../utils/date");
var api_1 = require("../utils/api");
var styled_components_1 = require("styled-components");
var Input_1 = require("./Input");
var Button_1 = require("./Button");
var StyledEditTodoForm = styled_components_1.default.form(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  z-index: 99;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.3);\n"], ["\n  z-index: 99;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.3);\n"])));
var StyledEditBox = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 30px;\n  position: absolute;\n  top: calc(50vh - 220px);\n  left: calc(50vw - 230px);\n  background-color: #d9d9d9;\n  display: block;\n  text-align: center;\n  justify-content: center;\n  border-radius: 10px;\n  width: 400px;\n  height: 300px;\n"], ["\n  padding: 30px;\n  position: absolute;\n  top: calc(50vh - 220px);\n  left: calc(50vw - 230px);\n  background-color: #d9d9d9;\n  display: block;\n  text-align: center;\n  justify-content: center;\n  border-radius: 10px;\n  width: 400px;\n  height: 300px;\n"])));
var StyledIdDiv = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-bottom: 20px;\n"], ["\n  margin-bottom: 20px;\n"])));
var StyledButtonsDiv = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n"], ["\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n"])));
var EditTodoModal = function (props) {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var detail = props.detail, closeModal = props.closeModal, error = props.error, localTodosDetail = props.localTodosDetail;
    var initialState = {
        id: error === null ? detail.id : localTodosDetail[0].id,
        text: error === null ? detail.text : localTodosDetail[0].text,
        deadLine: error === null ? detail.deadLine : localTodosDetail[0].deadLine,
    };
    var _a = (0, react_1.useState)(initialState.text), text = _a[0], setText = _a[1];
    var _b = (0, react_1.useState)(initialState.deadLine), deadLine = _b[0], setDeadLine = _b[1];
    var onUpdateHandler = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var req, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    req = {
                        id: initialState.id,
                        text: text,
                        deadLine: deadLine,
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, api_1.updateTodoById)(initialState.id, req)];
                case 2:
                    data = _b.sent();
                    if (data.statusText === "OK") {
                        navigate("/");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    // LocalStorage todo 수정
                    storage_1.storage.updateById("allTodos", initialState.id, req);
                    navigate("/");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<StyledEditTodoForm onSubmit={onUpdateHandler}>
      <StyledEditBox>
        <StyledIdDiv>No.{initialState.id}</StyledIdDiv>
        <div>
          <Input_1.default required onChange={function (e) {
            setText(e.target.value);
        }} value={text}/>
        </div>
        <div>
          <Input_1.default type="date" required onChange={function (e) {
            setDeadLine(e.target.value);
        }} value={deadLine} min={date_1.todaysDate}/>
        </div>
        <StyledButtonsDiv>
          <Button_1.default type={"submit"}>수정</Button_1.default>
          <Button_1.default type={"button"} onClick={function () {
            closeModal(true);
        }}>
            닫기
          </Button_1.default>
        </StyledButtonsDiv>
      </StyledEditBox>
    </StyledEditTodoForm>);
};
exports.default = EditTodoModal;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
