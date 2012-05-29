


var jPlayer = function($parent, $interface, options) {
	if (!$) { console.info("jQuery ($) not found."); return false; }
	if (!$.fn.jPlayer) { console.info("jPlayer download failed."); return false; } // ensure plugin is installed

	options = options || {};
	var self = this;

	//TODO add options here
	options.timeupdate = $.proxy(this.timeUpdate, this);

	$parent.jPlayer(options);

	this.$jPlayer = $parent;
	this.$interface = $interface;

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

var minutes=1000*60;
var hours=minutes*60;
var days=hours*24;
var years=days*365;
var t=new Date(self.getTime()).getTime()

var y=Math.round(t/years);
var m=(t/minutes);
var s=Math.round(m*60);


		$(this).find('input').val(s);
	});



	this.setState("stopped");

	this.clearQ();

	if (options.songs) {
		this.q = options.songs;
	}
};

jPlayer.prototype.timeUpdate = function(time) {
	//console.info(time);
	this.setTime(time);
	this.$("lcd").trigger("update");
}
jPlayer.prototype.setTime = function(time) {
	if (this.t > 0) {
		this.t_d = time.timeStamp - this.t;
	} else {
			//first time
		this.t = time.timeStamp;
		this.t_d = 0;
	}	
}
jPlayer.prototype.getTime = function() {
	return this.t_d || 0;
};
jPlayer.prototype.clearQ = function() {
	this.q = [];
	this.qHead = 0;
};
jPlayer.prototype.enqueue = function(item) {
	this.q.push(item);
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
	return this.q.pop();
}
//affect the head
jPlayer.prototype.get_from_head = function(index) {
	if (!this.q.length) {return false;}

	if (index && !this.q[index]) { return false; }

	this.qHead = index || this.qHead;

	return this.q[this.qHead];
}
jPlayer.prototype.move_head_by = function(amt) {
	if (!this.q.length) {return false;}

	var tentativeResult = this.qHead + amt;

	if ( tentativeResult >= this.q.length || tentativeResult < 0) { return false; }

	this.qHead = tentativeResult;
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

jPlayer.prototype.play = function(name, args) {

	args = args || {};

	if (!name) {

		if (args.index) {
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
};

jPlayer.prototype.stop = function() {
	this.$jPlayer.jPlayer('setMedia', {}).jPlayer('play');
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