'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _queueList = require('../../data/queueList.json');

var _queueList2 = _interopRequireDefault(_queueList);

var _config = require('../../../config.json');

var _Join = require('../bot/Join');

var _Join2 = _interopRequireDefault(_Join);

var _youtubeStrings = require('../../data/youtubeStrings.json');

var _youtubeStrings2 = _interopRequireDefault(_youtubeStrings);

var _lib = require('../../lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(msg) {
    var newJSONList, connection, secondWord, index, _newJSONList, _connection, _newJSONList2, url;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(msg.content === _config.prefix + 'play')) {
              _context.next = 24;
              break;
            }

            if (!_queueList2.default[msg.guild.id]) {
              _queueList2.default[msg.guild.id] = [];

              newJSONList = JSON.stringify(_queueList2.default, null, '\t');


              _fs2.default.writeFileSync('./app/data/queueList.json', newJSONList);
            }

            if (!(_queueList2.default[msg.guild.id].length === 0)) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return msg.reply('The list of songs is currently empty. You can play a new song with the following command:');

          case 5:
            _context.next = 7;
            return msg.channel.send('*!play [youtube video url here]*');

          case 7:
            return _context.abrupt('return');

          case 8:
            if (!msg.member.voiceChannel) {
              _context.next = 20;
              break;
            }

            if (msg.guild.voiceConnection) {
              _context.next = 15;
              break;
            }

            _context.next = 12;
            return (0, _Join2.default)(msg);

          case 12:
            connection = _context.sent;
            _context.next = 15;
            return _lib2.default.dispatchSong(connection, msg, _queueList2.default[msg.guild.id][0]);

          case 15:
            if (!msg.guild.voiceConnection.speaking) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return msg.reply('There is already a song playing!');

          case 18:
            _context.next = 22;
            break;

          case 20:
            _context.next = 22;
            return msg.reply('You have to join a channel first!');

          case 22:
            _context.next = 78;
            break;

          case 24:
            if (!msg.content.startsWith(_config.prefix + 'play ')) {
              _context.next = 78;
              break;
            }

            secondWord = msg.content.split(' ')[1];

            if (!parseInt(secondWord, 10)) {
              _context.next = 53;
              break;
            }

            index = Number(secondWord);

            if (!(index <= _queueList2.default[msg.guild.id].length && index >= 1)) {
              _context.next = 49;
              break;
            }

            if (!msg.guild.voiceConnection) {
              _context.next = 38;
              break;
            }

            _context.next = 32;
            return _lib2.default.replaceFirstSong(msg, _queueList2.default[msg.guild.id][index - 1].url, false);

          case 32:
            msg.guild.voiceConnection.dispatcher.end();

            _queueList2.default[msg.guild.id].splice(index - 1, 1);
            _newJSONList = JSON.stringify(_queueList2.default, null, '\t');


            _fs2.default.writeFileSync('./app/data/queueList.json', _newJSONList);
            _context.next = 47;
            break;

          case 38:
            _context.next = 40;
            return (0, _Join2.default)(msg);

          case 40:
            _connection = _context.sent;

            _lib2.default.dispatchSong(_connection, msg, _queueList2.default[msg.guild.id][index - 1]);
            _context.next = 44;
            return _lib2.default.replaceFirstSong(msg, _queueList2.default[msg.guild.id][index - 1].url);

          case 44:
            _queueList2.default[msg.guild.id].splice(index, 1);
            _newJSONList2 = JSON.stringify(_queueList2.default, null, '\t');


            _fs2.default.writeFileSync('./app/data/queueList.json', _newJSONList2);

          case 47:
            _context.next = 51;
            break;

          case 49:
            _context.next = 51;
            return msg.reply('Please choose a song from the queue, using `!play [position in list].` If you want to play the current song, just type `!play`.');

          case 51:
            _context.next = 78;
            break;

          case 53:
            url = secondWord;
            // check if valid url

            if (!_lib2.default.batchIncludes(_youtubeStrings2.default, url)) {
              _context.next = 76;
              break;
            }

            if (!msg.guild.voiceConnection) {
              _context.next = 66;
              break;
            }

            if (!(_queueList2.default[msg.guild.id].length === 0)) {
              _context.next = 62;
              break;
            }

            _context.next = 59;
            return _lib2.default.addFromUrl(msg, url);

          case 59:
            _context.next = 61;
            return _lib2.default.dispatchSong(msg.guild.voiceConnection, msg, _queueList2.default[msg.guild.id][0]);

          case 61:
            return _context.abrupt('return');

          case 62:
            _context.next = 64;
            return _lib2.default.replaceFirstSong(msg, url, false);

          case 64:
            msg.guild.voiceConnection.dispatcher.end();
            return _context.abrupt('return');

          case 66:
            if (!(_queueList2.default[msg.guild.id].length === 0)) {
              _context.next = 71;
              break;
            }

            _context.next = 69;
            return _lib2.default.addFromUrl(msg, url);

          case 69:
            _context.next = 73;
            break;

          case 71:
            _context.next = 73;
            return _lib2.default.replaceFirstSong(msg, url);

          case 73:
            (0, _Join2.default)(msg).then(function (connection) {
              _lib2.default.dispatchSong(connection, msg, _queueList2.default[msg.guild.id][0]);
            });
            _context.next = 78;
            break;

          case 76:
            _context.next = 78;
            return msg.channel.send('You must provide a valid YouTube url.');

          case 78:
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