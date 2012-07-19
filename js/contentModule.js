

/* Module Controller */

var ContentController = function() {
	this.listeners = [];
	this.init();
};

ContentController.prototype.init = function() {
	
	this.module = new ContentModule($("#ContentModule"));
	this.moduleFrame = $("#ContentFrame");

	this.attachEvents();
};

ContentController.prototype.attachEvents = function() {

	var self = this;

	this.module.$adjust.on('mousedown', function(e) {

		if (!self.isAdjusting) {
			self.adjust_startX = e.clientX;
			self.adjust_startY = e.clientY;
		}

		self.isAdjusting = true;
	});

	$("body").on('mouseup', function() {
		self.isAdjusting = false;
		self.isResizing = false;
	});

	this.moduleFrame.on('mousemove', function(e) {
		if (self.isAdjusting) {

			self.module.adjust({
				left: e.clientX - self.adjust_startX,
				top: e.clientY - self.adjust_startY
			});

			self.adjust_startX = e.clientX;
			self.adjust_startY = e.clientY;
		} else if (self.isResizing) {

			self.module.resize({
				right: e.clientX - self.resize_startX,
				bottom: e.clientY - self.resize_startY
			});

			self.resize_startX = e.clientX;
			self.resize_startY = e.clientY;
		}
	});

	this.module.$resize.on('mousedown', function(e) {

		if (!self.isResizing) {
			self.resize_startX = e.clientX;
			self.resize_startY = e.clientY;
		}

		self.isResizing = true;
	});


};

// adds an object as a listener for content events
// @param eventName optionally sets a specific event name to listen for, default is all
// @param listener the object which owns the onContentUpdate method
ContentController.prototype.addListener = function(args) {

};

/* Module View */

var ContentModule = function(el) {

	if (!el.jQuery) { el = $(el); }

	this.$el = el;
	this.el = el[0];

	this.$header = $(".header", this.el);
	this.$footer = $(".footer", this.el);
	this.$body = $(".body", this.el);

	this.$adjust = $(".adjust", this.header);
	this.$resize = $(".resize", this.footer);
};


// loads an absolute or relative url into the content module
ContentModule.prototype.loadPage = function(url) {

	var options = {};

	this.body.load(url, options);
};

// accepts params: bottom, the new distance from bottom of the module to the toolbar,
// and right, the distance from the right size of the screen to the module
ContentModule.prototype.resize = function(args) {

	args = args || {};

	var bottom = args.bottom;
	var right = args.right;

	var pos = {
		right: parseInt(this.$el.css("right")),
		bottom: parseInt(this.$el.css("bottom"))
	};

	this.$el.css({
		right: pos.right - right + "px",
		bottom: pos.bottom - bottom + "px"
	});

};

// accepts params: top, the distance the module is from the top of the toolbar,
// and left, the distance from the left center page margin
ContentModule.prototype.adjust = function(args) {

	args = args || {};

	var left = args.left;
	var top = args.top;

	var pos = this.$el.position();

	this.$el.css({top: top + pos.top, left: left + pos.left});
};


