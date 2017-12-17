'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../../config.json');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(msg, client) {
    var username;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(msg.content === _config.prefix + 'setnick')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            username = msg.content.split(' ')[1];

            client.user.setUsername(username).then(function (user) {
              return msg.channel.send('My name has been changed to ' + user.username + '.');
            }).catch(function (err) {
              return msg.reply(err);
            });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();