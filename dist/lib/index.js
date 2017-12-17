'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _batchIncludes = require('./batchIncludes');

var _batchIncludes2 = _interopRequireDefault(_batchIncludes);

var _addFromUrl = require('./addFromUrl');

var _addFromUrl2 = _interopRequireDefault(_addFromUrl);

var _dispatchSong = require('./dispatchSong');

var _dispatchSong2 = _interopRequireDefault(_dispatchSong);

var _replaceFirstSong = require('./replaceFirstSong');

var _replaceFirstSong2 = _interopRequireDefault(_replaceFirstSong);

var _addToHistory = require('./addToHistory');

var _addToHistory2 = _interopRequireDefault(_addToHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  batchIncludes: _batchIncludes2.default,
  addFromUrl: _addFromUrl2.default,
  dispatchSong: _dispatchSong2.default,
  replaceFirstSong: _replaceFirstSong2.default,
  addToHistory: _addToHistory2.default
};