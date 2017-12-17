'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _queueList = require('../data/queueList.json');

var _queueList2 = _interopRequireDefault(_queueList);

var _history = require('../data/history.json');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (id) {
    return new Promise(function (resolve) {
        var song = _queueList2.default[id][0];
        if (!_history2.default[id]) {
            _history2.default[id] = [];
        }

        if (_history2.default[id].length >= 5) {
            _history2.default[id].pop();
        }
        _history2.default[id].unshift(song);

        var newHistory = _history2.default;

        var newJSONList = JSON.stringify(newHistory, null, '\t');

        _fs2.default.writeFileSync('./app/data/history.json', newJSONList);

        resolve();
    });
};