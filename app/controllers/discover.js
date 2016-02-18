var recommendations = require('recommendations');
var measurement = require('alloy/measurement');
var cardView;

// animations
var animateLeft = Ti.UI.createAnimation({
    left: -520,
    transform: Ti.UI.create2DMatrix({rotate: 60}),
    opacity: 0,
    duration: 300
});
var animateCenter = Ti.UI.createAnimation({
    transform: Ti.UI.create2DMatrix({rotate: 0}),
    opacity: 1,
    left:10,
    duration: 300
});
var animateRight = Ti.UI.createAnimation({
    left: 520,
    transform: Ti.UI.create2DMatrix({rotate: -60}),
    opacity: 0,
    duration: 300
});

function addCard() {
	var cardCtrl = Alloy.createController('card', recommendations.queue[0]);

	cardView = cardCtrl.getView();
	cardView.addEventListener('skip', skipSong);
	cardView.addEventListener('favorite', favoriteSong);
	cardView.setTransform(Ti.UI.create2DMatrix({rotate: 60}));

	cardView.applyProperties({
		left: -520,
		top: 20,
		bottom: 20,
		width:OS_ANDROID ? measurement.pxToDP(Ti.Platform.displayCaps.platformWidth) - 20 : Ti.Platform.displayCaps.platformWidth - 20	
	});

	recommendations.playCurrentSong();
	$.discoverWindow.add(cardView);
	setTimeout(function(){
		cardView.animate(animateCenter);
	}, 1000);
}

function skipSong() {
	nextSong(animateLeft);
}

function favoriteSong() {
	nextSong(animateRight);
}

function nextSong(animation) {
	recommendations.nextSound();
	cardView.animate(animation, function(e){
		$.discoverWindow.remove(cardView);
		addCard();
	});
}

function init() {
	recommendations.getNextSongs(function(){
		addCard();
		Alloy.Globals.loading.hide();
	});
}

function open() {
	Alloy.Globals.loading.show(L('Loading'), false);
		if (OS_IOS) {
		init();
			
	} else {
		// request storage permission
		var requestStoragePermission = function() {
		    var RSP = require("com.boxoutthinkers.reqstorageperm");
		    if (!RSP.hasStoragePermission()) {
		        RSP.requestStoragePermissions(function(e) {
		            if (e.success) {
		                // success
		                Ti.API.info('requestStoragePermission : success');
		                init();
		
		            } else {
		                Ti.API.error('requestStoragePermission : error');
		            }
		        });
		    } else {
		        Ti.API.info('requestStoragePermission : already have');
		        init();
		    }
		};
		
		requestStoragePermission();	
	}
}