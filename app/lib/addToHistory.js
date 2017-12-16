import fs from 'fs';

import queueList from '../data/queueList.json';
import history from '../data/history.json';

export default id =>
  new Promise(resolve => {
    const song = queueList[id][0];
    if (!history[id]) {
      history[id] = [];
    }

    if (history[id].length >= 20) {
      history[id].pop();
    }
    history[id].unshift(song);

    const newHistory = history;

    const newJSONList = JSON.stringify(newHistory, null, '\t');

    fs.writeFileSync('./app/data/history.json', newJSONList);

    resolve();
  });
