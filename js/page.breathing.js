


Page.prototype.animate_start = function() {
	if (this.breathingAnimationTaskId != null) { return false; } //only run once
	this.breathingAnimationTaskId = setInterval(this.breathing, 8010);
};

Page.prototype.animate_stop = function() {
	clearTimeout(this.breathingAnimationTaskId);
	this.breathingAnimationTaskId = null;
};

// set ups the breathing on page load
Page.prototype.attachBreathing = function($parent, src) {

	this.$breathing_el = $parent;
	this.$breathing_img = $('<img class="Breathing" />');

	src = src ||  "img/backgrounds/breathing.png";
	

	var self = this;

	this.setBreathingImage(src);
	
	this.$breathing_img.appendTo($parent);
	this.fadeInBreathing();

	
	

	var colors = ["#00bb33", "#FFD900", "#BB20E6", "#E62020", "#2055E6"];
	var i = 0;
	this.breathing = function() {

		self.$breathing_el.css('background-color', colors[i]);
		i++;
		if (i == colors.length) { i = 0; }
	};

	this.animate_start();
}

Page.prototype.setBreathingImage = function(src) {

	this.$breathing_el[0].src = src;
}

Page.prototype.fadeInBreathing = function() {

	// during the first call define the fade in function

	var t = 2000;

	// check if css transitions are unsupported
	if(this.hasTransitions()) {

		Page.prototype.fadeInBreathing = function() {
			var self = this;

			this.$breathing_el.removeClass("fade_out");

			setTimeout(function() {
				self.$breathing_el
					.removeClass("fade2s");
					.addClass("breathing");
			}, t);
		};

	} else {

		//if not use jquery animate

		Page.prototype.fadeInBreathing = function() {

			this.$breathing_el.fadeIn(t);
		};
				
	}

	this.fadeInBreathing();
}