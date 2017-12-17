'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _youtubeHandler = require('../youtubeHandler');

var _youtubeHandler2 = _interopRequireDefault(_youtubeHandler);

var _lib = require('../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var youTube = _youtubeHandler2.default.getInstance();

exports.default = function (message, query) {
  youTube.search(query, 2, function (err, result) {
    if (err) {
      return message.channel.send(':no_entry_sign: **Error:**\n' + err);
    }

    var url = 'https://www.youtube.com/watch?v=' + result.items[0].id.videoId;
    (0, _lib.addFromUrl)(message, url);
  });
};