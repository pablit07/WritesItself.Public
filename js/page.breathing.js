
Page.prototype.images = {
	Breathing: "breathing.png",
	LagoonFroth: "lagoon-froth.png"
};
Page.prototype.imageFolder = "img/backgrounds/";

/* actions */

Page.prototype.animate_start = function() {
	if (this.breathingAnimationTaskId != null) { return false; } //only run once
	this.breathingAnimationTaskId = setInterval(this.breathing, 8010);
};

Page.prototype.animate_stop = function() {
	clearTimeout(this.breathingAnimationTaskId);
	this.breathingAnimationTaskId = null;
};

/* end actions */

// set ups the breathing on page load
Page.prototype.attachBreathing = function($parent, src) {

	this.$breathing_el = $parent;
	this.$breathing_img = $('<img class="Breathing" />');

	src = src ||  "img/backgrounds/breathing.png";
	

	var self = this;

	this.setBreathingImage({src: src});
	
	this.$breathing_img.appendTo($parent);
	
	this.fadeInBreathing();
	
	this.$breathing_el.addClass("breathing");

	var colors = ["#00bb33", "#FFD900", "#BB20E6", "#E62020", "#2055E6"];
	var i = 0;
	this.breathing = function() {

		self.$breathing_el.css('background-color', colors[i]);
		i++;
		if (i == colors.length) { i = 0; }
	};

	this.animate_start();
}

Page.prototype.setBreathingImage = function(args) {
	var self = this;
	args = args || {};

	var src = '';

	if (args.src) {
		// src was provided
		src = args.src;

	} else if (args.name) {
		// name was provided, use lookup
		// check if lookup succeeds
		if (!this.images[args.name]) {
			console.warn("image path not found");
			return;
		}

		var img = this.images[args.name];
		src = this.imageFolder + img;
		this.activeImage = img;

		console.info(img);
	}

	this.preloadImage({
		src: src,
		callback: function() {
			self.$breathing_img[0].src = src;
		}
	});
}

// Fades in the breathing image animation
// ~uses css3 transitions if they are supported, otherwise uses jquery
//  animate
Page.prototype.fadeInBreathing = function() {

	// during the first call define the fade in function

	var t = 2000;

	// check if css transitions are unsupported
	if(this.hasTransitions()) {

		Page.prototype.fadeInBreathing = function() {
			var self = this;

			this.$breathing_el.removeClass("fade_out");			
		};

	} else {

		//if not use jquery animate
		this.$breathing_el.removeClass("fade_out");
		this.$breathing_el.removeClass("fade2s");
		this.$breathing_el.fadeOut(0);

		Page.prototype.fadeInBreathing = function() {

			this.$breathing_el.fadeIn(t);
		};
				
	}

	this.fadeInBreathing();
};
// Fades out the breathing image animation
// ~uses css3 transitions if they are supported, otherwise uses jquery
//  animate
Page.prototype.fadeOutBreathing = function() {

	// during the first call define the fade out function

	var t = 2000;

	// check if css transitions are unsupported
	if(this.hasTransitions()) {

		Page.prototype.fadeOutBreathing = function() {
			var self = this;

			this.$breathing_el.addClass("fade_out");
		};

	} else {

		//if not use jquery animate
		this.$breathing_el.removeClass("fade_out");
		this.$breathing_el.removeClass("fade2s");
		this.$breathing_el.fadeIn(0);

		Page.prototype.fadeOutBreathing = function() {

			this.$breathing_el.fadeOut(t);
		};
				
	}

	this.fadeOutBreathing();
};