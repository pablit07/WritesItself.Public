
/* overall page level stuff */
var Page = function() {};

Page.prototype.preloadImages = function(parent) {

	var self = this;

	// do fade in effect after image has loaded
	var background = new Image();

	background.onload = function() {

		var loadAfter = function() {
			if (typeof self.attachBreathing == 'function') {
				clearInterval(timer);

				$(background).trigger("preload");
				self.attachBreathing($("#Breathing"));
			}
		};
		//poll
		var timer = setInterval(loadAfter, 200); //adds delay
		
	};
	background.src = "img/backgrounds/breathing.png";
}

var page = new Page();

page.preloadImages();

