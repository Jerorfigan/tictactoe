if(!window.ttt) window.ttt = {};

(function(){

	function registerCanvasClickListener(){
		var canvas = window.sft.fx.canvas(),
			gameBoardFxMgr = this;
		canvas.addEventListener("click", function(evt){
			var canvasClickTarget = window.sft.fx.windowCoords2canvasPoint(evt.clientX, evt.clientY);
			if(gameBoardFxMgr.isCanvasPointWithinBoardBoundary(canvasClickTarget)){
				var targetSquare = gameBoardFxMgr.getSquareEnclosingCanvasPoint(canvasClickTarget);
				window.sft.evt.fire("BoardClicked", targetSquare);
			}
		});
	}

	/***************/
	/* Constructor */
	/***************/
	var GameBoardGraphicsManager = function(){
		this._boardGraphicsObj = null;
		registerCanvasClickListener.call(this);
	};

	GameBoardGraphicsManager.prototype.update = function(){
		if(window.sft.objMgr.has("board")){ // Logical board exists, need to create corresponding graphics object
			// Instantiate the board graphics object if it doesn't already exist
			if(!this._boardGraphicsObj){
				this._boardGraphicsObj = new window.ttt.GameBoardGraphics(this.renderBoard, this);
				window.sft.objMgr.track("boardFx", this._boardGraphicsObj);
			}
			// Update board graphics object state based on logical object state.
			// Currently nothing to do here since board graphics object has no dynamic state.
 
		}else{ // No logical board object exists, therefore nothing to draw, so destroy board graphics object
			window.sft.objMgr.forget("boardFx");
			this._boardGraphicsObj = null;
		}
	};

	GameBoardGraphicsManager.prototype.renderBoard = function(){
		window.sft.fx.drawGrid({
			topLeft: this._boardGraphicsObj._topLeftPoint,
			width: this._boardGraphicsObj._width,
			height: this._boardGraphicsObj._height,
			cols: this._boardGraphicsObj._cols,
			rows: this._boardGraphicsObj._rows,
			lineWidth: this._boardGraphicsObj._lineWidth,
			lineStyle: this._boardGraphicsObj._lineStyle
		});

		// Iterate through board._boardData and draw marks for each marked square
		var board = window.sft.objMgr.get("board");
		for(var coli = 0; coli < board._cols; coli++){
			for(var rowi = 0; rowi < board._rows; rowi++){
				if(board._boardData[coli][rowi].mark){
					var markType = board._boardData[coli][rowi].mark;
					window.ttt.gamefx.drawMark({
						mark: {
							type: markType,
							lineWidth: this._boardGraphicsObj._lineWidth,
							lineStyle: this._boardGraphicsObj._markLineStyle,
							radius: markType == "X" ? this._boardGraphicsObj._xMarkRadius : this._boardGraphicsObj._oMarkRadius,
							xSideAngle: this._boardGraphicsObj._xMarkSideAngle
						},
						target: this.getSquareCenterPoint(coli + 1, rowi + 1)
					});
				}
			}
		}
	};

	/* Finds the the center point in canvas coords of a particular square of the game board */
	GameBoardGraphicsManager.prototype.getSquareCenterPoint = function(col, row){
		var colWidth = this._boardGraphicsObj._width / this._boardGraphicsObj._cols,
			colHalfWidth = colWidth / 2,
			rowWidth = this._boardGraphicsObj._height / this._boardGraphicsObj._rows,
			rowHalfWidth = rowWidth / 2;

		return new window.sft.Point(
				this._boardGraphicsObj._topLeftPoint.x() + colHalfWidth + (col - 1) * colWidth,
				this._boardGraphicsObj._topLeftPoint.y() + rowHalfWidth + (row - 1) * rowWidth
			);
	};

	/* Gets the row and column of the board square enclosing a particular point on the canvas. */
	GameBoardGraphicsManager.prototype.getSquareEnclosingCanvasPoint = function(canvasPoint){
		if(!this.isCanvasPointWithinBoardBoundary(canvasPoint)) throw "Point not contained by board";
		var leftBoardBoundry = this._boardGraphicsObj._topLeftPoint.x();
		var topBoardBoundry = this._boardGraphicsObj._topLeftPoint.y();
		var col = Math.floor((canvasPoint.x() - leftBoardBoundry) / this._boardGraphicsObj._colWidth) + 1,
			row = Math.floor((canvasPoint.y() - topBoardBoundry) / this._boardGraphicsObj._rowWidth) + 1;

		return {col: col, row: row};
	};

	GameBoardGraphicsManager.prototype.isCanvasPointWithinBoardBoundary = function(canvasPoint){
		return canvasPoint.x() >= this._boardGraphicsObj._topLeftPoint.x() &&
			canvasPoint.x() <= this._boardGraphicsObj._bottomRightPoint.x() &&
			canvasPoint.y() >= this._boardGraphicsObj._topLeftPoint.y() &&
			canvasPoint.y() <= this._boardGraphicsObj._bottomRightPoint.y();
	};

	window.ttt.GameBoardGraphicsManager = GameBoardGraphicsManager;
})();