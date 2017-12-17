'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _discord = require('discord.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(msg) {
    var embed, helpMessage, collector;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            embed = new _discord.RichEmbed().setColor('ORANGE').setTitle(':question: Help').setTimestamp(new Date()).setFooter('© Sky Mad High Bot').setDescription("I'm here to help! Here's a list of all my commands. Click the corresponding number for more information about the command.").addField('1 - Main Menu', 'Takes you back to the main menu.').addField('2 - Play', 'Play a song from YouTube.').addField('3 - Add', 'Add a song to the queue.').addField('4 - View Queue', 'Shows the current song queue.').addField('5 - Now Playing', 'Shows the currently playing song.').addField('6 - View History', 'Shows the last five songs that were played.').addField('7 - Music Controls', 'Shows the available commands when listening to music.');
            _context2.next = 3;
            return msg.channel.send(embed);

          case 3:
            helpMessage = _context2.sent;
            _context2.next = 6;
            return helpMessage.react('1⃣');

          case 6:
            _context2.next = 8;
            return helpMessage.react('2⃣');

          case 8:
            _context2.next = 10;
            return helpMessage.react('3⃣');

          case 10:
            _context2.next = 12;
            return helpMessage.react('4⃣');

          case 12:
            _context2.next = 14;
            return helpMessage.react('5⃣');

          case 14:
            _context2.next = 16;
            return helpMessage.react('6⃣');

          case 16:
            _context2.next = 18;
            return helpMessage.react('7⃣');

          case 18:
            _context2.next = 20;
            return helpMessage.react('⛔');

          case 20:
            _context2.next = 22;
            return helpMessage.createReactionCollector(function (reaction, user) {
              return !user.bot;
            });

          case 22:
            collector = _context2.sent;


            collector.on('collect', function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(r) {
                var newEmbed, users, user;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        newEmbed = new _discord.RichEmbed().setColor('ORANGE').setTimestamp(new Date()).setFooter('© Sky Mad High Bot');
                        users = r.users.array();
                        user = users[1];

                        if (!(r.emoji.name === '1⃣')) {
                          _context.next = 10;
                          break;
                        }

                        _context.next = 6;
                        return helpMessage.edit(embed);

                      case 6:
                        _context.next = 8;
                        return r.remove(user);

                      case 8:
                        _context.next = 59;
                        break;

                      case 10:
                        if (!(r.emoji.name === '2⃣')) {
                          _context.next = 18;
                          break;
                        }

                        newEmbed.setTitle(':headphones: Play').addField('Description', 'The play command is used to play a song from the queue. There are three different ways this command can be used:').addField('!play', 'Plays the first song from the queue if no music is playing.').addField('!play [youtube url]', 'Plays a song given a YouTube url.').addField('!play [position in queue]', 'Plays a specific song from your queue given the position of the song.');
                        _context.next = 14;
                        return helpMessage.edit(newEmbed);

                      case 14:
                        _context.next = 16;
                        return r.remove(user);

                      case 16:
                        _context.next = 59;
                        break;

                      case 18:
                        if (!(r.emoji.name === '3⃣')) {
                          _context.next = 26;
                          break;
                        }

                        newEmbed.setTitle(':headphones: Add').addField('Description', 'The add command is used to add a song to the queue.').addField('!add [youtube url]', 'Adds a YouTube video to the queue.');
                        _context.next = 22;
                        return helpMessage.edit(newEmbed);

                      case 22:
                        _context.next = 24;
                        return r.remove(user);

                      case 24:
                        _context.next = 59;
                        break;

                      case 26:
                        if (!(r.emoji.name === '4⃣')) {
                          _context.next = 34;
                          break;
                        }

                        newEmbed.setTitle(':headphones: View Queue').addField('Description', 'The queue command is used to list the upcoming songs in the queue.').addField('!queue', 'Lists the current song queue.');
                        _context.next = 30;
                        return helpMessage.edit(newEmbed);

                      case 30:
                        _context.next = 32;
                        return r.remove(user);

                      case 32:
                        _context.next = 59;
                        break;

                      case 34:
                        if (!(r.emoji.name === '5⃣')) {
                          _context.next = 42;
                          break;
                        }

                        newEmbed.setTitle(':headphones: Now Playing').addField('Description', 'Displays the current playing song, if any.').addField('!np', 'Lists the current playing song.');
                        _context.next = 38;
                        return helpMessage.edit(newEmbed);

                      case 38:
                        _context.next = 40;
                        return r.remove(user);

                      case 40:
                        _context.next = 59;
                        break;

                      case 42:
                        if (!(r.emoji.name === '6⃣')) {
                          _context.next = 50;
                          break;
                        }

                        newEmbed.setTitle(':headphones: View History').addField('Description', 'The history command is used to display the last five songs that were played.').addField('!history', 'Shows the last five songs that I played for you.');
                        _context.next = 46;
                        return helpMessage.edit(newEmbed);

                      case 46:
                        _context.next = 48;
                        return r.remove(user);

                      case 48:
                        _context.next = 59;
                        break;

                      case 50:
                        if (!(r.emoji.name === '7⃣')) {
                          _context.next = 58;
                          break;
                        }

                        newEmbed.setTitle(':headphones: Music Controls').setDescription('There are several different commands that you can use while listening to music. Here are the ones that are currently available:').addField('!pause', 'Pauses the current song.').addField('!resume', 'Resumes a paused song.').addField('!skip', 'Skips the currently playing song.').addField('!stop', 'Stops the current playing song. \n **NOTE:** This makes the bot leave the channel.').addField('!volume [number between 0 and 50]', 'Sets the volume of the player.').addField('!time', "Displays the current time in the song you're listening to.");
                        _context.next = 54;
                        return helpMessage.edit(newEmbed);

                      case 54:
                        _context.next = 56;
                        return r.remove(user);

                      case 56:
                        _context.next = 59;
                        break;

                      case 58:
                        if (r.emoji.name === '⛔') {
                          collector.stop();
                          helpMessage.delete();
                        }

                      case 59:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 24:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();