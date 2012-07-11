/* overall page level stuff */
var Page = function() {};

Page.prototype.preloadImages = function(args) {

	var self = this;
	var args = args || {};
	//hold on to the objects to notify after loading has finished
	this.listeners = args.listeners || null;

	// do fade in effect after image has loaded
	//TODO ~add the imgs to an array
	var background = new Image();

	background.onload = function() {

		// notify listeners when finished
		// ~ try and use the default listener if the list isn't set
		var listeners = self.listeners || [self];


		for (var i = 0; i < listeners.length; i++) {
			listeners[i].onAfterPreloadImages({background: background});
		}
		
		
	};

	background.src = "img/backgrounds/breathing.png";
}

var page = new Page();

Page.prototype.onAfterPreloadImages = function(args) {

	var self = this;

	var onFinishedLoading = function() {
		if (self.attachBreathing) {
			clearInterval(timer);

			$(args.background).trigger("preload");
			self.attachBreathing($("#Background"));
		}
	};

	//poll
	var timer = setInterval(onFinishedLoading, 50); //adds delay


}

page.preloadImages();

