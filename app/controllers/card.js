var song = arguments[0] || {};

$.coverImageView.image = song.image_medium;
$.titleLabel.text = song.title;
$.artistLabel.text = song.artist;
$.skipButton.title = '  ' + L('Skip');
$.favoriteButton.title = '  ' + L('Favorite');

function skip() {
	$.container.fireEvent('skip');
}

function favorite() {
	var favorite = Alloy.createModel('favorite', {
		id:song.song_id,
		title:song.title,
		artist:song.artist,
		image:song.image_small
	});
	favorite.save();
	$.container.fireEvent('favorite');
}
