"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var DetailPage_1 = require("./pages/DetailPage");
var MainPage_1 = require("./pages/MainPage");
function App() {
    return (<div className="App">
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<MainPage_1.default />}/>
          <react_router_dom_1.Route path=":id" element={<DetailPage_1.default />}/>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </div>);
}
exports.default = App;
