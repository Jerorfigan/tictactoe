if(!window.sft) window.sft = {};

(function(){
	var GraphicsLibrary = function(){
		this._canvas = document.getElementById("canvas");
		this._ctx = canvas.getContext("2d");
	};

	// Getters
	GraphicsLibrary.prototype.canvas = function(){ return this._canvas; };

	GraphicsLibrary.prototype.windowCoords2canvasPoint = function(windowX, windowY){
		var canvasBoundingRect = this._canvas.getBoundingClientRect();
		return new window.sft.Point(
			windowX - canvasBoundingRect.left,
			windowY - canvasBoundingRect.top
		);
	};

	GraphicsLibrary.prototype.clearFrame = function(){
		this._ctx.clearRect(0, 0, window.sft.EngineSettings.CANVAS_WIDTH_PX, window.sft.EngineSettings.CANVAS_HEIGHT_PX);
	};

	/*
		settings = 
			{
				center: new window.sft.Point(100,100), // center point of circle
				radius: 10, // radius of circle in px
				lineWidth: 2, // line width of circle
				lineStyle: "#FF0000" // line style of circle
			}
	*/
	GraphicsLibrary.prototype.drawCircle = function(settings){
		this._ctx.save();

		this._ctx.lineWidth = settings.lineWidth;
		this._ctx.strokeStyle = settings.lineStyle;

		this._ctx.beginPath();
		this._ctx.arc(settings.center.x(), settings.center.y(), settings.radius, 0, 2*Math.PI);
		this._ctx.stroke();

		this._ctx.restore();
	};

	/*
		settings =
			{
				topLeft: new window.sft.Point(50,100), // top left point of grid
				width: 100, // grid width in px
				height: 100, // grid height in px
				cols: 10, // number of columns
				rows: 10, // number of rows
				lineWidth: 2, // grid line width in px
				lineStyle: "#FF0000" // grid line style
			}
	*/
	GraphicsLibrary.prototype.drawGrid = function(settings){
		this._ctx.save();

		var lineEnd = new window.sft.Point(0,0);
		var colWidth = Math.floor(settings.width / settings.cols);
		var rowWidth = Math.floor(settings.height / settings.rows);

		// Draw grid perimeter
		this.drawRect({
			topLeft: settings.topLeft,
			width: settings.width,
			height: settings.height,
			lineWidth: settings.lineWidth,
			lineStyle: settings.lineStyle
		});

		// Draw column lines
		var lineStart = window.sft.util.objects.clone(settings.topLeft);
		lineStart.x(lineStart.x() + colWidth);
		lineEnd.x(lineStart.x());
		lineEnd.y(lineStart.y() + settings.height);
		for(var col = 2; col <= settings.cols; col++){
			this.drawLine({
				start: lineStart,
				end: lineEnd,
				width: settings.lineWidth,
				style: settings.lineStyle
			});

			lineStart.x(lineStart.x() + colWidth);
			lineEnd.x(lineStart.x());
		}

		// Draw row lines
		lineStart = window.sft.util.objects.clone(settings.topLeft);
		lineStart.y(lineStart.y() + rowWidth);
		lineEnd.x(lineStart.x() + settings.width);
		lineEnd.y(lineStart.y());
		for(var row = 2; row <= settings.rows; row++){
			this.drawLine({
				start: lineStart,
				end: lineEnd,
				width: settings.lineWidth,
				style: settings.lineStyle
			});

			lineStart.y(lineStart.y() + rowWidth);
			lineEnd.y(lineStart.y());
		}

		this._ctx.restore();
	};

	/*
		settings = 
			{
				topLeft: new window.sft.Point(0,0), // top left point of rectangle
				width: 100, // width of rectangle in px
				height: 200, // height of rectangle in px
				lineWidth: 2, // line width in px
				lineStyle: "#FF0000" // rectangle line style
			}
	*/
	GraphicsLibrary.prototype.drawRect = function(settings){
		this._ctx.save();

		this._ctx.lineWidth = settings.lineWidth;
		this._ctx.strokeStyle = settings.lineStyle;

		this._ctx.beginPath();
		this._ctx.rect(
			settings.topLeft.x(), 
			settings.topLeft.y(), 
			settings.width, 
			settings.height);
		this._ctx.stroke();

		this._ctx.restore();
	};

	/*
		settings = 
			{
				start: new window.sft.Point(0,0), // starting point of line
				end: new window.sft.Point(10,10), // ending point of line
				width: 2, // width of line in px
				style: "#FF0000" // line style
			}
	*/
	GraphicsLibrary.prototype.drawLine = function(settings){
		this._ctx.save();

		this._ctx.lineWidth = settings.width;
		this._ctx.strokeStyle = settings.style;

		this._ctx.beginPath();
		this._ctx.moveTo(settings.start.x(), settings.start.y());
		this._ctx.lineTo(settings.end.x(), settings.end.y());
		this._ctx.stroke();

		this._ctx.restore();
	};

	window.sft.GraphicsLibrary = GraphicsLibrary;
	window.sft.fx = new GraphicsLibrary();
})();