"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MILLISECONDS = exports.date = exports.today = exports.todaysDate = void 0;
var todaysDate = new Date().toISOString().split("T")[0];
exports.todaysDate = todaysDate;
var today = Date.parse(new Date().toISOString().split("T")[0]);
exports.today = today;
var MILLISECONDS = 24 * 60 * 60 * 1000;
exports.MILLISECONDS = MILLISECONDS;
var date = {
    parseByDate: function (value) {
        return Date.parse(value);
    },
    calculateDaysLeft: function (selectedDate, today) {
        return Math.ceil((selectedDate - today) / MILLISECONDS);
    },
    alertfrom3DaysLeft: function (value) {
        var selectedDate = date.parseByDate(value);
        var daysLeft = date.calculateDaysLeft(selectedDate, today);
        setTimeout(function () {
            if (value !== undefined) {
                if (0 < daysLeft && daysLeft < 4) {
                    alert("D-day \uAE4C\uC9C0 ".concat(daysLeft, "\uC77C \uB0A8\uC558\uC2B5\uB2C8\uB2E4"));
                }
                else if (daysLeft === 0) {
                    alert("D-day입니다");
                }
            }
        }, 500);
    },
};
exports.date = date;
