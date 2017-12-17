'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ytdlCore = require('ytdl-core');

var _ytdlCore2 = _interopRequireDefault(_ytdlCore);

var _queueList = require('../data/queueList.json');

var _queueList2 = _interopRequireDefault(_queueList);

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (message, url) {
  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(url === '' || !url)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return message.channel.send('A YouTube video url is required after the command, ' + _config2.default + 'add');

            case 3:

              _ytdlCore2.default.getInfo(url, {}, function (err, info) {
                if (err) {
                  return message.channel.send(':no_entry_sign: Invalid YouTube Link: ' + err);
                }

                if (!_queueList2.default[message.guild.id]) {
                  _queueList2.default[message.guild.id] = [];
                }

                _queueList2.default[message.guild.id].push({
                  id: (0, _lodash.uniqueId)(),
                  url: url,
                  title: info.title,
                  time: info.length_seconds,
                  thumbnail: info.thumbnail_url,
                  user: message.author.username
                });

                var newJSONList = JSON.stringify(_queueList2.default, null, '\t');

                _fs2.default.writeFileSync('./app/data/queueList.json', newJSONList);

                resolve();
              });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};