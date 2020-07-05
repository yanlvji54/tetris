"use strict";
exports.__esModule = true;
exports.border = void 0;
var jquery_ts_1 = require("jquery-ts");
var border = /** @class */ (function () {
    function border(el, config) {
        this.length = config.length || 100;
        this.height = config.height || 200;
        this.el = el;
    }
    border.prototype.init = function () {
        jquery_ts_1["default"](this.el).append(this.createBorder());
    };
    ;
    border.prototype.createBorder = function () {
        // const nets = new Array(200).fill(`<div class="net"></div>`).join('/n');
        var nets;
        for (var i = 0; i < 200; i++) {
            nets += "<div class=\"net\"></div>";
        }
        var element = "<div class=\"border\">\n      <div class=\"box\">" + nets + "</div>\n    </div>";
        return element;
    };
    return border;
}());
exports.border = border;
