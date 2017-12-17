'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ytdlCore = require('ytdl-core');

var _ytdlCore2 = _interopRequireDefault(_ytdlCore);

var _lodash = require('lodash');

var _queueList = require('../data/queueList.json');

var _queueList2 = _interopRequireDefault(_queueList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (message, url) {
  var addAtFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return new Promise(function (resolve) {
    _ytdlCore2.default.getInfo(url, {}, function (err, info) {
      if (err) {
        return message.channel.send(':no_entry_sign: Invalid YouTube Link: ' + err);
      }

      if (addAtFirst) {
        _queueList2.default[message.guild.id].splice(0, 0, {
          id: (0, _lodash.uniqueId)(),
          url: url,
          title: info.title,
          time: info.length_seconds,
          thumbnail: info.thumbnail_url,
          user: message.author.username
        });
      } else {
        _queueList2.default[message.guild.id].splice(1, 0, {
          id: (0, _lodash.uniqueId)(),
          url: url,
          title: info.title,
          time: info.length_seconds,
          thumbnail: info.thumbnail_url,
          user: message.author.username
        });
      }

      var newJSONList = JSON.stringify(_queueList2.default, null, '\t');

      _fs2.default.writeFileSync('./app/data/queueList.json', newJSONList);

      resolve();
    });
  });
};