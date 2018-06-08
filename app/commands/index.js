import add from './player/Add';
import play from './player/Play';
import loop from './player/Loop';

import join from './bot/Join';
import setnick from './bot/setNickname';
import queue from './bot/ViewQueue';
import clear from './bot/ClearMessages';
import current from './bot/NowPlaying';
import history from './bot/History';
import help from './bot/Help';
import invite from './bot/Invite';

export default {
	add,
	play,
	join,
	setnick,
	queue,
	clear,
	current,
	history,
	invite,
	help,
	loop,
};
