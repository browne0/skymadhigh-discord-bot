'use strict';

var _discord = require('discord.js');

var _keys = require('../keys');

var _config = require('../config.json');

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var client = new _discord.Client();

client.once('ready', function () {
  console.log('Bot has started, with ' + client.users.size + ' channels of ' + client.guilds.size + ' servers.');

  client.user.setPresence({ game: { name: 'custom playlists!', type: 0 } });
});

client.on('guildCreate', function (guild) {
  // This event triggers when the bot joins a guild.
  console.log('New guild joined: ' + guild.name + ' (id: ' + guild.id + '). This guild has ' + guild.memberCount + ' members!');
});

client.on('message', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
    var command;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!message.author.bot) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            if (message.content.startsWith(_config.prefix)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return');

          case 4:
            command = message.content.toLowerCase().slice(_config.prefix.length).split(' ')[0];

            if (_commands2.default.hasOwnProperty(command)) {
              _commands2.default[command](message, client);
            }

          case 6:
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

client.login(_keys.discordToken);