


var jPlayer = function($parent, $interface, $playlist, options) {
	//failsafe checks
	if (!$) { console.info("jQuery ($) not found."); return false; }
	if (!$.fn.jPlayer) { console.info("jPlayer download failed."); return false; } // ensure plugin is installed

	options = options || {};
	var self = this;

	// add options below

	//add time update event
	options.timeupdate = $.proxy(this.timeUpdate, this);
	//add song end event
	options.ended = function() { self.t = 0; self.next(); }

	$parent.jPlayer(options);

	this.$jPlayer = $parent;
	this.$interface = $interface;

	this.attachListeners();
	this.attachPlaylist($playlist);

	this.setState("stopped");

	

	if (options.songs) {
		this.setQ(options.songs);
	} else {
		this.clearQ();
	}
};

jPlayer.prototype.attachPlaylist = function($playlist) {
	if (typeof $playlist == 'undefined') {
			//create dummy playlist element
		this.$playlist = $("<div></div>");
		return;
	}

	var self = this;

	this.$playlist = $playlist;

	this.$playlist.bind('update', function() {
		var $playlistTable = $(".body table tbody");
		$playlistTable.html("");
		console.info(self.qHead);
		$.each(self.q, function(i, songName) {
			var row = self.getPlaylistRowEl(i, songName);
			if (i == self.qHead) {
				row.addClass("active");
			}
			$playlistTable.append(row);
		})
	});
}
jPlayer.prototype.togglePlaylist = function() {
	var self = this;
	var top_end = this.$playlist.hasClass("open")
		? -180
		: 35;
	this.$playlist.animate({top: top_end}, 500, function() {
		self.$playlist.toggleClass("open");
	});
	
}

jPlayer.prototype.attachListeners = function() {
	var self = this;

	//play button event listener
	this.$("play,pause").bind('update', function() { 
		if (self.isPlaying()) {
			$(this).addClass('pause');
			$(this).removeClass('play');
		} else {
			$(this).addClass('play');
			$(this).removeClass('pause');
		}
	});

	//lcd event listener
	this.$("lcd").bind('update', function() { 
			//update time
		var s =	Math.round(self.t);
		var m = Math.floor(s / 60);
		s = s % 60;

		if (s < 10) { s = "0" + s; }

		$(this).find('div.time').text(m+":"+s);
	});


};

jPlayer.prototype.timeUpdate = function(e) {
	//console.info(e);
	if (!e.jPlayer || !e.jPlayer.status || !e.jPlayer.status.currentTime) { return; }

	this.t = e.jPlayer.status.currentTime;
	this.$("lcd").trigger("update");
}
jPlayer.prototype.getTime = function() {
	return this.t_d || 0;
};
jPlayer.prototype.clearQ = function() {
	this.q = [];
	this.qHead = 0;
	this.$playlist.trigger("update");
};
jPlayer.prototype.setQ = function(q) {
	this.q = q;
	this.qHead = 0;
	this.$playlist.trigger("update");
}
jPlayer.prototype.enqueue = function(item) {
	this.q.push(item);
	this.$playlist.trigger("update");
}
jPlayer.prototype.dequeue = function() {
	if (!this.q.length) {return false;}

	var self = this;

	function isLast() {
		return self.qHead == self.q.length - 1;
	}
	if (isLast()) {
		this.move_head_by(-1);
	}
	this.$playlist.trigger("update");
	return this.q.pop();
}
jPlayer.prototype.remove = function(index) {
	this.q.splice(index, 1);
	this.$playlist.trigger("update");
}
//affect the head
jPlayer.prototype.get_from_head = function(index) {
	if (!this.q.length) {return false;}

	if (typeof index != 'undefined' && !this.q[index]) { return false; }

	this.qHead = typeof index != 'undefined' ? index : this.qHead;

	return this.q[this.qHead];
}
jPlayer.prototype.move_head_by = function(amt) {
	if (!this.q.length) {return false;}

	var tentativeResult = this.qHead + amt;

	if ( tentativeResult >= this.q.length || tentativeResult < 0) { return false; }

	this.qHead = tentativeResult;
	return true;
}

jPlayer.prototype.$ = function(name) {

	var selector = "a."+name;

	this._cache_jq = this._cache_jq || {};

	if (this._cache_jq[selector]) {
		return this._cache_jq[selector];
	} else {
		var $result = $(selector, this.$interface);

		if ($result.length) {
			this._cache_jq[selector] = $result;
		}

		return $result;
	}
};

jPlayer.prototype.next = function(args) {
	if (!this.move_head_by(1)) { 
		this.stop();
		return false;
	}
	this.setState('changing');
	this.play();
}
jPlayer.prototype.prev = function(args) {
	if (!this.move_head_by(-1)) { 
		this.setState('stopped');
		return false;
	}

	this.setState('changing');
	this.play();
}

jPlayer.prototype.play = function(name, args) {

	args = args || {};

	if (!name) {

		if (typeof args.index != 'undefined') {
			//jump to index if set
			var name = this.get_from_head(args.index);

		} else if (this.isPaused()) {
			//resume playback if paused
			this.setState('playing');
			this.$jPlayer.jPlayer('play');
			return;
		} else {
			//otherwise, play from queue
			var name = this.get_from_head();
		}
	}

	console.info(name);

	var options;


	try {
		options = {
			mp3: Common.getMp3Url(name)
		};
	} catch (e) { console.info("queue returned empty", e); return; }

	console.info(options);

	this.setState('playing');

	this.$jPlayer.jPlayer('setMedia', options).jPlayer('play');

	this.$playlist.trigger("update");

	this.$("lcd").find('div.name').text(name);
	this.$("lcd").find('div.time').html("<div class='loading'></div>");
};

jPlayer.prototype.stop = function() {
	this.$jPlayer.jPlayer('stopped');
	this.$jPlayer.jPlayer('setMedia', {}).jPlayer('play');
	this.$("lcd").find('div.name, div.time').text("");
};

jPlayer.prototype.pause = function() {
	this.$jPlayer.jPlayer('pause');
	this.setState("paused");
};

jPlayer.prototype.setState = function(state) {
	this.state = state;
	//TODO trigger listeners
	//this.listeners[state];
	this.$("play,pause").trigger('update');
}
jPlayer.prototype.isPaused = function() {
	return this.state == "paused";
};
jPlayer.prototype.isPlaying = function() {
	return this.state == "playing";
};