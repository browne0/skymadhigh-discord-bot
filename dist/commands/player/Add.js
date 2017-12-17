'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../../config.json');

var _lib = require('../../lib');

var _lib2 = _interopRequireDefault(_lib);

var _youtubeStrings = require('../../data/youtubeStrings.json');

var _youtubeStrings2 = _interopRequireDefault(_youtubeStrings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(msg) {
    var url;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(msg.content === _config.prefix + 'add')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            url = msg.content.split(' ')[1];

            if (!url.includes('playlist')) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return msg.channel.send(':no_entry_sign: You can only add songs with this command.');

          case 6:
            if (!_lib2.default.batchIncludes(_youtubeStrings2.default, url)) {
              _context.next = 13;
              break;
            }

            _context.next = 9;
            return _lib2.default.addFromUrl(msg, url);

          case 9:
            _context.next = 11;
            return msg.reply('Your song has been added.');

          case 11:
            _context.next = 15;
            break;

          case 13:
            _context.next = 15;
            return msg.channel.send('You must provide a valid YouTube url.');

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();