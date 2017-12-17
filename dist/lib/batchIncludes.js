"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var strings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var searchString = arguments[1];

  for (var i = 0; i < strings.length; i += 1) {
    var string = strings[i];
    if (searchString.includes(string)) return true;
  }
  return false;
};