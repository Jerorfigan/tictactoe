if(!window.sft) window.sft = {};

(function(){
	var GraphicsLibrary = function(){
		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
	};

	GraphicsLibrary.prototype.clearFrame = function(){
		ctx.clearRect(0, 0, window.sft.Settings.CANVAS_WIDTH_PX, window.sft.Settings.CANVAS_HEIGHT_PX);
	};

	GraphicsLibrary.prototype.drawCircle = function(centerPoint, radius){
		this.ctx.save();

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = "#000";
		this.ctx.beginPath();
		this.ctx.arc(centerPoint.x, centerPoint.y, radius, 0, 2*Math.PI);
		this.ctx.stroke();

		this.ctx.restore();
	};

	window.sft.fx = new GraphicsLibrary();
})();