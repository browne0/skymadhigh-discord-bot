'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _history = require('../../data/history.json');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(msg) {
    var historyList, shortHistoryList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!_history2.default[msg.guild.id] || _history2.default[msg.guild.id].length === 0)) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return msg.reply('There are currently no songs in the history.');

          case 3:
            return _context.abrupt('return');

          case 4:
            historyList = _history2.default[msg.guild.id].map(function (song, index) {
              return index + 1 + '.\n**Title:** ' + song.title + '\n**URL:** <' + song.url + '>\n**Requested by:** ' + song.user + '\n\n';
            }).reduce(function (prev, curr) {
              return '' + prev + curr;
            }, '');
            shortHistoryList = _history2.default[msg.guild.id].map(function (song, index) {
              if (index <= 4) {
                return index + 1 + '.\n**Title:** ' + song.title + '\n**URL:** <' + song.url + '>\n**Requested by:** ' + song.user + '\n\n';
              }
              return '';
            }).reduce(function (prev, curr) {
              return '' + prev + curr;
            }, '');

            if (!(historyList.length > 2000)) {
              _context.next = 11;
              break;
            }

            _context.next = 9;
            return msg.channel.send('Here are the last five songs:\n\n' + shortHistoryList);

          case 9:
            _context.next = 13;
            break;

          case 11:
            _context.next = 13;
            return msg.channel.send('Here\'s the current song history:\n\n' + historyList);

          case 13:
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