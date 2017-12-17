'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queueList = require('../../data/queueList.json');

var _queueList2 = _interopRequireDefault(_queueList);

var _config = require('../../../config.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(msg) {
    var listOfTitles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!msg.content.startsWith(_config.prefix + 'queue')) {
              _context.next = 8;
              break;
            }

            if (!(_queueList2.default[msg.guild.id].length === 0)) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return msg.reply('There are currently no songs in the queue.');

          case 4:
            _context.next = 8;
            break;

          case 6:
            listOfTitles = _queueList2.default[msg.guild.id].map(function (song, index) {
              return '**' + (index + 1) + '.** *' + song.title + '* from **' + song.user + '**';
            }).reduce(function (prev, curr) {
              return prev + ' \n' + curr;
            }, '');

            msg.channel.send(listOfTitles);

          case 8:
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