// script.js

/* usefuls */

// dummy console.info & console.error
// you know, in case they aren't defined by the browser
if (!window.console) {
	window.console = {};
	window.console.info = function() {};
	window.console.error = function() {};
}

Page.prototype.init = function() {

	this.attachjPlayer($("#jPlayer"));

	this.attachDomEvents();
	this.fadeInContent();

	this.runHash();

}

Page.prototype.runHash = function() {
	var hash = window.location.hash;
	hash = hash.substr(1, hash.length-1);
	console.info(hash);
	if (!hash) { return false; }

	var actionIndex = hash.indexOf(" ");
	if (actionIndex == -1) { actionIndex = hash.length; }

	var action = hash.substr(0, actionIndex);
	var rest = hash.substr(actionIndex + 1, hash.length - 1);

	this.runAction(action, rest);

};

Page.prototype.attachBreathing = function($parent) {

	this.$breathing_el = $('<img src="img/backgrounds/breathing.png" class="Breathing" />');

	var self = this;

	self.$breathing_el.appendTo($parent);
	$parent.fadeIn(500, function() {
		$parent.trigger('loadBackground');
	});

	var colors = ["#00bb33", "#FFD900", "#BB20E6", "#E62020", "#2055E6"];
	var i = 0;
	this.breathing = function() {

		$parent.css('background-color', colors[i]);
		i++;
		if (i == colors.length) { i = 0; }
	};

	this.animate_start();
}

Page.prototype.animate_start = function() {
	if (this.breathingAnimationTaskId != null) { return false; } //only run once
	this.breathingAnimationTaskId = setInterval(this.breathing, 8010);
};

Page.prototype.animate_stop = function() {
	clearTimeout(this.breathingAnimationTaskId);
	this.breathingAnimationTaskId = null;
};

Page.prototype.attachjPlayer = function($parent) {
	if (!$.fn.jPlayer) { console.info("jPlayer not installed"); return false; } // ensure plugin is installed

	var options = {};

	//TODO add options here

	$parent.jPlayer(options);

	this.$jPlayer = $parent;
	var self = this;

	// loop over all audio play tags & generate href
	$("a[data-audio-url][data-audio-url!='']").each(function(i) {
		$el = $(this);
		var descr = "#" + ($el.data('action')||"") + " " + ($el.data('file')||"");
		$el.attr("href", descr);
	});
	
};

Page.prototype.urlEncode = function(url) {
	return url.replace(' ', '%20');
};
Page.prototype.getMp3Url = function(name) {
	return this.root + "audio/" + this.urlEncode(name) + '.mp3';
};

Page.prototype.audio_play = function(param) {

	this.animate_start();

	var name = param;
	if (typeof param == 'object' && param.jquery) {
		var name = param.data('file');
	}

	var options = {
		mp3: this.getMp3Url(name)
	}
	
	console.info(options);

	this.$jPlayer.jPlayer('setMedia', options).jPlayer('play');
};

Page.prototype.audio_stop = function() {
	this.$jPlayer.jPlayer('setMedia', {}).jPlayer('play');
};

Page.prototype.attachDomEvents = function() {
	var $delegate = $('#container');

	var self = this;

	$delegate.on('click', 'a[data-action]', function(i) {
		var $el = $(this);
		var action = $el.data('action') || "";

		self.runAction(action, $el);		
	});

	$delegate.on('click', 'a[data-action-two]', function(i) {
		var $el = $(this);
		var action = $el.data('action-two');

		self.runAction(action, $el);	
	});
/*
	$("#Breathing").on('loadBackground', function() {
		
	});
*/
};

Page.prototype.runAction = function(action, $el) {
	if (action == 'runAction') { return; }

	if (typeof this[action] == 'function') {
		this[action]($el);
	} else {
		console.error("Sorry, but \""+action+"\" is not a valid method name.");
	}
};

Page.prototype.fadeInContent = function() {
	setTimeout(function() {
		$("#container").fadeIn(1000);
		$("#cloak").fadeIn(1000);
	}, 1000);
};