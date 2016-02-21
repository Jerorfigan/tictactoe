if(!window.ttt) window.ttt = {};

(function(){

	var GameGraphics = function(){
		// Call parent constructor
		window.sft.GraphicsLibrary.call(this);
	};

	window.sft.util.objects.inherit(GameGraphics, window.sft.GraphicsLibrary);

	/*
		settings = {
			mark: {
				type: "X", // "X" or "O"
				lineWidth: 2, // the line width of the mark
				lineStyle: "#FF0000", // the line style of the mark
				radius: 10, // the radius of the encompassing circle
				xSideAngle: 3*PI/8 // the angle between the horizontal and the top right tip of the X
			},
			target: new window.sft.Point(10,15) // target point to draw mark
		}
	*/
	GameGraphics.prototype.drawMark = function(settings){
		if(settings.mark.type == "O"){
			this.drawCircle({
				center: settings.target,
				radius: settings.mark.radius,
				lineWidth: settings.mark.lineWidth,
				lineStyle: settings.mark.lineStyle
			});
		}else{	// Draw X
			// Find the offset from target that lies on the encompassing circle at xSideAngle.
			// We'll use this to derive the top right point of the X mark.
			var topRightOffset = new window.sft.Point(
					settings.mark.radius * Math.cos(settings.mark.xSideAngle),
					settings.mark.radius * Math.sin(settings.mark.xSideAngle)
				);
			// Derive topLeftOffset, bottomLeftOffset, bottomRightOffset from topRightOffset
			var topLeftOffset = new window.sft.Point(-topRightOffset.x(), topRightOffset.y());
			var bottomLeftOffset = new window.sft.Point(-topRightOffset.x(), -topRightOffset.y());
			var bottomRightOffset = new window.sft.Point(topRightOffset.x(), -topRightOffset.y());
			// Derive points from offsets
			var topRight = settings.target.add(topRightOffset);
			var topLeft = settings.target.add(topLeftOffset);
			var bottomLeft = settings.target.add(bottomLeftOffset);
			var bottomRight = settings.target.add(bottomRightOffset);
			// Draw line from topLeft to bottomRight
			this.drawLine({
				start: topLeft,
				end: bottomRight,
				width: settings.mark.lineWidth,
				style: settings.mark.lineStyle
			});
			// Draw line from bottomLeft to topRight
			this.drawLine({
				start: bottomLeft,
				end: topRight,
				width: settings.mark.lineWidth,
				style: settings.mark.lineStyle
			});
		}
	};

	window.ttt.GameGraphics = GameGraphics;
	window.ttt.gamefx = new GameGraphics();
})();