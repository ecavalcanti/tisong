var recommendations = require('recommendations');

function tabOnSelected(e){
	if (e.index == 1) {
		recommendations.haltAudio();	
	}
}

$.index.open();
