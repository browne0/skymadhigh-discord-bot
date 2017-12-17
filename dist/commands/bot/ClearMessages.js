'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../../config.json');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(msg) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!msg.content.startsWith(_config.prefix + 'clear')) {
              _context.next = 7;
              break;
            }

            if (!msg.channel.permissionsFor(msg.author).has('MANAGE_MESSAGES')) {
              _context.next = 5;
              break;
            }

            if (msg.channel.type == 'text') {
              msg.channel.fetchMessages().then(function (messages) {
                msg.channel.bulkDelete(messages);
                var messagesDeleted = messages.array().length; // number of messages deleted

                // Logging the number of messages deleted on both the channel and console.
                msg.channel.send('Deletion of messages successful. Total messages deleted: ' + messagesDeleted);
              }).catch(function (err) {
                console.log('Error while doing Bulk Delete');
                console.log(err);
              });
            }
            _context.next = 7;
            break;

          case 5:
            _context.next = 7;
            return msg.reply("You don't have the permission to delete messages. Please speak to admin to get these priveleges.");

          case 7:
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