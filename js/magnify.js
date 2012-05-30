

(function($) {

	$.fn.magnification = function(selector) {

		selector = selector || "a";

		$(this).each(function(i, el) {

			var $el = $(el);
			var items = $(selector, $el[0]);

			var height = $el.height();
			var width = $el.width();

			 var getDistance = function(d, h, w) {
			        var a, b, c;        // use pythagorean theroum
			        c = h/2; a=c-d;
			        b = Math.sqrt((c*c) - (a*a));

			        return ((w/2)-b );
			    };

			$.each(items, function(i, e) {
			    
			    var $e = $(e);
			    
			    var offset = $e.position().top + 1;
			    var right = Math.round(getDistance(offset, height, width));
			    
			    $e  .addClass('bubbleItem')
			    	.css('right', right+'px')
			    	.on('mouseover', function() {
				        $e = $(this);
				        
				        $e.prev().addClass('once');//.prev().addClass('once');
				        $e.next().addClass('once');//.next().addClass('once');
				        
				        $e.addClass('thrice');
			    	})
			    	.on('mouseout', function() {
				        $e = $(this);
				        
				        $e.prev().removeClass('once');//.prev().removeClass('once');
				        $e.next().removeClass('once');//.next().removeClass('once');
				        
				        $e.removeClass('thrice');
			    	});			    
			});

		});

		return this;
	}
})(jQuery);
/*
var items = $(selector, $el[0]);

var height = $el.height();
var width = $el.width();

 var getDistance = function(d, h, w) {
        var a, b, c;        // use pythagorean theroum
        c = h/2; a=c-d;
        b = Math.sqrt((c*c) - (a*a));

        return ((w/2)-b );
    };

$.each(items, function(i, e) {
    
    var $e = $(e);
    
    var offset = $e.position().top + 1;
    var right = Math.round(getDistance(offset, height, width));
    
    ​$e.addClass('bubbleItem');
    $e.css('right', right+'px');
    $e.on('mouseover', function() {
        $e = $(this);
        
        $e.prev().addClass('twice').prev().addClass('once');
        $e.next().addClass('twice').next().addClass('once');
        
        $e.addClass('thrice');
    });
    $e.on('mouseout', function() {
        $e = $(this);
        
        $e.prev().removeClass('twice').prev().removeClass('once');
        $e.next().removeClass('twice').next().removeClass('once');
        
        $e.removeClass('thrice');
    });
    
});*/