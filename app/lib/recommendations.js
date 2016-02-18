const SERVER_URL = 'https://ionic-songhop.herokuapp.com';
var self = {
	queue : []
};
var audioPlayer;

self.getNextSongs = function (callback) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function (e) {
		self.queue = self.queue.concat(JSON.parse(this.responseText));
		if (callback) {
			callback();	
		}
	};
	xhr.open('GET', SERVER_URL + '/recommendations');
	xhr.send();
};

self.playCurrentSong = function () {
	audioPlayer = Ti.Media.createAudioPlayer({
		url:self.queue[0].preview_url		
	});
	audioPlayer.play();
};

self.nextSound = function () {
	// remove o item 0 da fila
	self.queue.shift();
	// finaliza o som
	audioPlayer.stop();
	
	if (OS_ANDROID) {
		audioPlayer.release();
	}
	
	// a fila está com poucos elementos, vamos preenche-la com mais
	if (self.queue.length < 3) {
		self.getNextSongs();
	}
	
};

// Usado quando trocamos para a aba de favoritos
self.haltAudio = function () {
	if (audioPlayer.playing) {
		audioPlayer.pause();
	}	
};

module.exports = self;