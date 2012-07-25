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

	this.content = new ContentController();
	this.contact = new ContactController();

	//$.firefly();

	this.runHash();
	// Do we want to check for hash changes?
	//window.onhashchange = $.proxy(this.runHash, this);

}

Page.prototype.runHash = function() {
	var hash = window.location.hash;
	hash = hash.substr(1, hash.length-1);
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


Page.prototype.attachjPlayer = function($parent, $interface, $playlist) {
	if (typeof jPlayer != 'function') { console.info("jPlayer class not found"); return false; } // ensure plugin is installed

	var options = {
		songs: [
			 "Writes Itself - Just One Look"
			,"Writes Itself - Waiting"
			,"Writes Itself - After All"
			,"Writes Itself - Bridge"
			,"Writes Itself - Deep Waters"
			,"Writes Itself - Deep waters Live"
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
Page.prototype.audio_playlist_clear = function() {
	this.jPlayer.clearQ();
}
Page.prototype.audio_playlist_add = function(param) {
	var name = param;
	if (typeof param == 'object' && param.jquery) {
		var name = param.data('file');
	}

	this.audio_playlist_open();
	this.jPlayer.enqueue(name);
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
		.on('click', 'a.playlist', function() { self.jPlayer.togglePlaylist();})
	;
	
	//playlist
	$("#Playlist")
		.on('click', 'td.remove span', function() { self.jPlayer.remove($(this).closest("tr").data("index")); })
		.on('click', 'a.clear', function() { self.audio_playlist_clear(); })
		.on('click', 'td.name', function() {
			self.jPlayer.play(null, {index: $(this).closest("tr").data("index")});
		})
		.on('click', 'a.close', function() { self.audio_playlist_close(); })
	;

	$(".toolbar .banner").on('click', function() {
		self.content_load("shows");
	});


	var $delegate = $('#ContentModule, #Bubble, .toolbar');

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
		$(".toolbar").fadeIn(1000);

		
	}, 1000);
};

Page.prototype.content_load = function(param) {

	var page = param;
	if (typeof param == 'object' && param.jquery) {
		page = param.data('page');
	}

	this.cycleBreathingImage();

	this.content.loadPage(page);
};


