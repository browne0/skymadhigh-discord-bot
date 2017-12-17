'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _youtubeNode = require('youtube-node');

var _youtubeNode2 = _interopRequireDefault(_youtubeNode);

var _keys = require('../../keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var singleton = void 0;

exports.default = {
  getInstance: function getInstance() {
    if (singleton) return singleton;
    singleton = new _youtubeNode2.default();
    singleton.setKey(_keys.youtubeKey);

    return singleton;
  }
};