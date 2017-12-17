'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ytdlCore = require('ytdl-core');

var _ytdlCore2 = _interopRequireDefault(_ytdlCore);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../../config.json');

var _queueList = require('../data/queueList.json');

var _queueList2 = _interopRequireDefault(_queueList);

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(connection, message, song) {
    var dispatcher, collector;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return message.channel.send('Now Playing: **' + song.title + '** from **' + song.user + '**.');

          case 2:
            dispatcher = connection.playStream((0, _ytdlCore2.default)(song.url, { audioonly: true }), {
              volume: 0.05
            });
            collector = message.channel.createMessageCollector(function (m) {
              return m;
            });


            collector.on('collect', function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(m) {
                var currentVol, vol;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!m.content.startsWith(_config.prefix + 'pause')) {
                          _context.next = 6;
                          break;
                        }

                        _context.next = 3;
                        return message.channel.send(':pause_button: Paused.');

                      case 3:
                        dispatcher.pause();
                        _context.next = 44;
                        break;

                      case 6:
                        if (!m.content.startsWith(_config.prefix + 'resume')) {
                          _context.next = 12;
                          break;
                        }

                        _context.next = 9;
                        return message.channel.send(':play_pause: Resumed.');

                      case 9:
                        dispatcher.resume();
                        _context.next = 44;
                        break;

                      case 12:
                        if (!m.content.startsWith(_config.prefix + 'skip')) {
                          _context.next = 18;
                          break;
                        }

                        _context.next = 15;
                        return message.channel.send(':arrow_forward: Skipped.');

                      case 15:
                        dispatcher.end('skip');
                        _context.next = 44;
                        break;

                      case 18:
                        if (!m.content.startsWith(_config.prefix + 'stop')) {
                          _context.next = 24;
                          break;
                        }

                        _context.next = 21;
                        return message.channel.send(':octagonal_sign: Music Stopped.');

                      case 21:
                        dispatcher.end('stop');
                        _context.next = 44;
                        break;

                      case 24:
                        if (!m.content.startsWith(_config.prefix + 'volume')) {
                          _context.next = 41;
                          break;
                        }

                        if (!(m.content === _config.prefix + 'volume')) {
                          _context.next = 30;
                          break;
                        }

                        currentVol = dispatcher.volume;
                        _context.next = 29;
                        return message.channel.send(':speaker: Current volume: ' + currentVol * 100 + '/100.');

                      case 29:
                        return _context.abrupt('return');

                      case 30:
                        vol = m.content.split(' ')[1];

                        if (!parseInt(vol, 10)) {
                          _context.next = 39;
                          break;
                        }

                        if (!(Number(vol) < 0 || Number(vol) > 50)) {
                          _context.next = 36;
                          break;
                        }

                        _context.next = 35;
                        return m.reply('The new volume has to be between 1 and 50.');

                      case 35:
                        return _context.abrupt('return');

                      case 36:
                        dispatcher.setVolume(Number(vol) / 100);
                        _context.next = 39;
                        return message.channel.send(':speaker: Volume has now been set ');

                      case 39:
                        _context.next = 44;
                        break;

                      case 41:
                        if (!m.content.startsWith(_config.prefix + 'time')) {
                          _context.next = 44;
                          break;
                        }

                        _context.next = 44;
                        return message.channel.send(':clock1: Time: ' + Math.floor(dispatcher.time / 60000) + ':' + (Math.floor(dispatcher.time % 60000 / 1000) < 10 ? '0' + Math.floor(dispatcher.time % 60000 / 1000) : Math.floor(dispatcher.time % 60000 / 1000)));

                      case 44:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());
            dispatcher.on('end', function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(reason) {
                var index, newJSONList, _newJSONList;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        collector.stop();
                        // on stop or skip we do different things

                        if (!(reason === 'stop')) {
                          _context2.next = 5;
                          break;
                        }

                        return _context2.abrupt('return', message.member.voiceChannel.leave());

                      case 5:
                        if (!(reason === 'skip')) {
                          _context2.next = 18;
                          break;
                        }

                        _context2.next = 8;
                        return _lib2.default.addToHistory(message.guild.id);

                      case 8:
                        index = _queueList2.default[message.guild.id].findIndex(function (item) {
                          return item.id === song.id;
                        });


                        _queueList2.default[message.guild.id].splice(index, 1);
                        newJSONList = JSON.stringify(_queueList2.default, null, '\t');


                        _fs2.default.writeFileSync('./app/data/queueList.json', newJSONList);

                        if (!(_queueList2.default[message.guild.id].length === 0)) {
                          _context2.next = 15;
                          break;
                        }

                        message.channel.send("The song queue is now empty. Add more songs when you're ready!");
                        return _context2.abrupt('return', message.member.voiceChannel.leave());

                      case 15:
                        _lib2.default.dispatchSong(connection, message, _queueList2.default[message.guild.id][0]);
                        _context2.next = 27;
                        break;

                      case 18:
                        _context2.next = 20;
                        return _lib2.default.addToHistory(message.guild.id);

                      case 20:
                        _queueList2.default[message.guild.id].shift();
                        _newJSONList = JSON.stringify(_queueList2.default, null, '\t');


                        _fs2.default.writeFileSync('./app/data/queueList.json', _newJSONList);

                        if (!(_queueList2.default[message.guild.id].length === 0)) {
                          _context2.next = 26;
                          break;
                        }

                        message.channel.send("The song queue is now empty. Add more songs when you're ready!");
                        return _context2.abrupt('return', message.member.voiceChannel.leave());

                      case 26:
                        _lib2.default.dispatchSong(connection, message, _queueList2.default[message.guild.id][0]);

                      case 27:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }());
            dispatcher.on('error', function (err) {
              return message.channel.send('error: ' + err).then(function () {
                collector.stop();
                // stop trying to play songs
              });
            });

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();