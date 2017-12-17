'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Add = require('./player/Add');

var _Add2 = _interopRequireDefault(_Add);

var _Play = require('./player/Play');

var _Play2 = _interopRequireDefault(_Play);

var _Join = require('./bot/Join');

var _Join2 = _interopRequireDefault(_Join);

var _setNickname = require('./bot/setNickname');

var _setNickname2 = _interopRequireDefault(_setNickname);

var _ViewQueue = require('./bot/ViewQueue');

var _ViewQueue2 = _interopRequireDefault(_ViewQueue);

var _ClearMessages = require('./bot/ClearMessages');

var _ClearMessages2 = _interopRequireDefault(_ClearMessages);

var _NowPlaying = require('./bot/NowPlaying');

var _NowPlaying2 = _interopRequireDefault(_NowPlaying);

var _History = require('./bot/History');

var _History2 = _interopRequireDefault(_History);

var _Help = require('./bot/Help');

var _Help2 = _interopRequireDefault(_Help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  add: _Add2.default,
  play: _Play2.default,
  join: _Join2.default,
  setnick: _setNickname2.default,
  queue: _ViewQueue2.default,
  clear: _ClearMessages2.default,
  np: _NowPlaying2.default,
  history: _History2.default,
  help: _Help2.default
};