//ball.js


(function ($) {

	$.fn.bouncingBall = function(options) {

		this.each(function(i, e) {

			var pi = 3.1415;
			var v = 4;
			var v_temp = v;
			var self = this;

			var $ball = $(e);

			e.pause = function() {
				v = 0;
			};
			e.unpause = function() {
				v = v_temp;
			};

			console.info($ball);

			var ball = {
				x:3,
				y:3,
				$ball: $ball,
				getLeft: function() {
					return this.x;
				},
				getRight: function() {
					return this.x + this.$ball.width();
				},
				getTop: function() {
					return this.y;
				},
				getBottom: function() {
					return this.y + this.$ball.height();
				}
			};

			var theta = {};

			theta.deg = 350;
			theta.rad = function() {
				return (this.deg * pi) / 180;
			};
			theta.radToDeg = function(r) {
				var result = (r * 180) / pi;
				return (result < 0)? 360+result : result;
			}
			theta.getXY = function() {
				return {x: Math.cos(this.rad()), y: Math.sin(this.rad())};
			}
			theta.setXY = function(x,y) {
				var quad;
				if (x>0 && y>=0) {
					quad = 0;
				} else if (x<=0 && y>0){
					quad = 1;
					var temp = x; x = y; y = temp;
				} else if (x<0 && y<=0) {
					quad = 2;
				} else if (x>=0 && y<0) {
					quad = 3;
					var temp = x; x = y; y = temp;
				} else { theta.deg = NaN; return; }

				if (x == 0) {
					// special case to avoid divide by 0
					theta.deg = quad*90;
				} else {
					theta.deg = Math.round(this.radToDeg(Math.atan(Math.abs(y)/Math.abs(x)))+(quad*90));
				}
			}
			theta.negateX = function() {
				var xy = this.getXY();
				this.setXY(-1*xy.x, xy.y);
			}
			theta.negateY = function() {
				var xy = this.getXY();
				this.setXY(xy.x,-1*xy.y);
			}

			var randomize = function(pos) {

				var x_coef = 1, y_coef = 1;

				if (Math.random() > 0.7) { x_coef=0; }
				if (Math.random() > 0.7) { y_coef=0; }

				pos.x = pos.x * x_coef;
				pos.y = pos.y * y_coef;
			}

			var move = function() {

				var d = {};
				d.x = v*Math.cos(theta.rad());
				d.y = v*Math.sin(theta.rad());

				randomize(d);
				updatePos(d);
			};

			var updatePos = function(d) {
				var x, y;

				var old = ball;
				checkBoundary({x:old.x,y:old.y*-1});

				ball.x = old.x + (d.x);
				ball.y = old.y + (-1 * d.y);

				//console.info('new pos', ball);
				
				x = (Math.round(ball.x))+'px';
				y = (Math.round(ball.y))+'px';

				$ball.css('left',x);
				$ball.css('top', y);
			};

			var checkBoundary = function(pos) {

				var walls = [
					{ pos: {x:500}},
					{ pos: {x:-100}},
					{ pos: {y:2}},
					{ pos: {y:500}}
				];

				for (var i = 0; i < walls.length; i++) {
					var wall = walls[i];

					// to do - check each side of the ball
					if (wall.pos.x &&
						(ball.getLeft() < wall.pos.x && ball.getRight() > wall.pos.x)) {
						//give the ball a little bump out of the wall
						ball.x += v * ((theta.getXY().x > 0) ? -2 : 2);
						theta.negateX(); 			
					}
					else if (wall.pos.y &&
						(ball.getTop() < wall.pos.y && ball.getBottom() > wall.pos.y)) {

						ball.y += v * ((theta.getXY().y < 0) ? -2 : 2);
						theta.negateY();
					}
				}
				
			};

			var timer = setInterval(move, 39);

		});
	};
	$.fn.pause = function() {
		this.each(function(i,e) {
			this.pause();
		});
	};
	$.fn.unpause = function() {
		this.each(function(i,e) {
			this.unpause();
		});
	};
})($);
