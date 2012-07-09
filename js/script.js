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

	this.attachjPlayer($("#jPlayer"), $("div.toolbar ul.player"), $("#Playlist"));

	this.attachDomEvents();
	this.fadeInContent();
	this.attachBubble();

	//$.firefly();

	this.runHash();
	// Do we want to check for hash changes?
	//window.onhashchange = $.proxy(this.runHash, this);

}

Page.prototype.runHash = function() {
	var hash = window.location.hash;
	hash = hash.substr(1, hash.length-1);
	console.info("hash", hash);
	if (!hash) { return false; }

	var actionIndex = hash.indexOf(" ");
	if (actionIndex == -1) { actionIndex = hash.length; }

	var action = hash.substr(0, actionIndex);
	var params = hash.substr(actionIndex + 1, hash.length - 1);

	this.runAction(action, params, true);

};

Page.prototype.isIE = function() {
	return /MSIE/.test(window.navigator.userAgent);
}

Page.prototype.hasTransitions = function() {
	return $("html").hasClass("csstransitions");
}


Page.prototype.attachBreathing = function($parent) {

	this.$breathing_el = $('<img src="img/backgrounds/breathing.png" class="Breathing" />');

	var self = this;

	self.$breathing_el.appendTo($parent);
	
	var fadeIn;
	if(!this.hasTransitions()) {
	
		fadeIn = function($parent, t) {
			$parent.fadeIn(t);
		};

	} else {

		fadeIn = function($parent, t) {
			$parent.removeClass("fade_out");
			setInterval(function() {
				$parent.removeClass("fade2s");
				$parent.addClass("breathing");
			}, t);
		};		
	}
	
	fadeIn($parent, 2000);

	var colors = ["#00bb33", "#FFD900", "#BB20E6", "#E62020", "#2055E6"];
	var i = 0;
	this.breathing = function() {

		$parent.css('background-color', colors[i]);
		i++;
		if (i == colors.length) { i = 0; }
	};

	this.animate_start();
}

Page.prototype.attachBubble = function() {
	var $B = $("#Bubble");
	this.$Bubble = $B;
	var $b = $("img.bubble");

	//start state = stopped
	$B.bouncingBall().pause();

	this.$B_inner = $(".innerBubble", $B);
	this.$B_outer = $(".outerBubble", $B);

	$("div#Bubble").fadeIn(1000);
	//must go after
	this.$B_inner.magnification('li');

	this.$B_outer
	.mouseleave(function() {
	    $B.removeClass("big");
	    $B.unpause();
	})
	.mouseover(function() {
	    $B.addClass('big');
	    $B.pause();
	});
};

Page.prototype.animate_start = function() {
	if (this.breathingAnimationTaskId != null) { return false; } //only run once
	this.breathingAnimationTaskId = setInterval(this.breathing, 8010);
};

Page.prototype.animate_stop = function() {
	clearTimeout(this.breathingAnimationTaskId);
	this.breathingAnimationTaskId = null;
};

Page.prototype.attachjPlayer = function($parent, $interface, $playlist) {
	if (typeof jPlayer != 'function') { console.info("jPlayer class not found"); return false; } // ensure plugin is installed

	var options = {
		songs: [
			 "Writes Itself-Just One Look"
			,"Writes Itself-Waiting"
		]
	};

	this.jPlayer = new jPlayer($parent, $interface, $playlist, options);
};

Page.prototype.urlEncode = function(url) {
	return Common.urlEncode(url);
};

Page.prototype.audio_play = function(param) {

	this.animate_start();

	var name = param;
	if (typeof param == 'object' && param.jquery) {
		var name = param.data('file');
	}

	this.jPlayer.play(name);
};

Page.prototype.audio_stop = function() {
	this.jPlayer.stop()
};
Page.prototype.audio_pause = function() {
	this.jPlayer.pause()
};
Page.prototype.audio_next = function() {
	this.jPlayer.next()
};
Page.prototype.audio_prev = function() {
	this.jPlayer.prev()
};
Page.prototype.audio_playlist_open = function() {
	if (!this.jPlayer.$playlist.hasClass("open")) {
		this.jPlayer.togglePlaylist();
	}
}
Page.prototype.audio_playlist_close = function() {
	if (this.jPlayer.$playlist.hasClass("open")) {
		this.jPlayer.togglePlaylist();
	}
}

Page.prototype.bubble_pause = function() {
	this.$Bubble.pause();
};

Page.prototype.attachDomEvents = function() {
	var self = this;

	//player
	$("#cloak ul.player")
		.on('click', 'a.play', function() { self.audio_play();})
		.on('click', 'a.pause', function() { self.audio_pause();})
		.on('click', 'a.next', function() { self.audio_next();})
		.on('click', 'a.prev', function() { self.audio_prev();})
	;


	var $delegate = $('#container, #Bubble');

	var self = this;

	$delegate.on('click', 'a[data-action]', function(i) {
		var $el = $(this);
		var action = $el.data('action') || "";

		self.runAction(action, $el);		
	});
};

Page.prototype.runAction = function(action, $el, isFromHash) {
	if (action == 'runAction') { return; }

	if (typeof this[action] == 'function') {
		this[action]($el);
	} else {
		console.error("Sorry, but \""+action+"\" is not a valid method name.");
	}
};

Page.prototype.fadeInContent = function() {
	setTimeout(function() {
		//$("#container").fadeIn(1000);
		$("div#cloak").fadeIn(1000);

		
	}, 1000);
};