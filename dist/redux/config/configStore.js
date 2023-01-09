"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var todos_1 = require("../modules/todos");
exports.default = (0, toolkit_1.configureStore)({
    reducer: {
        todos: todos_1.default.reducer,
    },
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    },
});
