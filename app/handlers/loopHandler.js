class LoopHandlerSingleton {
	constructor() {
		this.loopQueue = false;
		this.loopSong = false;
	}

	static isBoolean(value) {
		return typeof value === 'boolean';
	}
	getQueueLoopStatus() {
		return this.loopQueue;
	}

	getSongLoopStatus() {
		return this.loopSong;
	}

	stopQueueLoop() {
		this.loopQueue = false;
	}

	stopSongLoop() {
		this.loopSong = false;
	}

	toggleSongLoopStatus() {
		if (this.getQueueLoopStatus()) {
			this.toggleQueueLoopStatus();
		}
		this.loopSong = !this.loopSong;
	}

	toggleQueueLoopStatus() {
		if (this.getSongLoopStatus()) {
			this.toggleSongLoopStatus();
		}
		this.loopQueue = !this.loopQueue;
	}
}

export default new LoopHandlerSingleton();
