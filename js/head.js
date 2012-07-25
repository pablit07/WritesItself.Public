/* overall page level stuff */
var Page = function() {};

Page.prototype.preloadImage = function(args) {
	args = args || {};
	var preloader = new Image();
	preloader.onload = function() {
		args.callback(preloader);
	};
	preloader.src = args.src;
}
Page.prototype.preloadImages = function(args) {

	var self = this;
	var args = args || {};
	//hold on to the objects to notify after loading has finished
	this.listeners = args.listeners || null;

	// do fade in effect after image has loaded
	//TODO ~add the imgs to an array

	this.preloadImage({
		callback: function(background) {
			// notify listeners when finished
			// ~ try and use the default listener if the list isn't set
			var listeners = self.listeners || [self];

			for (var i = 0; i < listeners.length; i++) {
				listeners[i].onAfterPreloadImages({background: background});
			}			
		},
		src: "img/backgrounds/breathing_small.png"
	});
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
	var timer = setInterval(onFinishedLoading, 50);
	onFinishedLoading();

}

page.preloadImages();

