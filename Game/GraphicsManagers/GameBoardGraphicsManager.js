if(!window.ttt) window.ttt = {};

(function(){

	var GameBoardGraphicsManager = function(){
		this._boardGraphicsObj = null;
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
					window.ttt.gamefx.drawMark({
						mark: {
							type: board._boardData[coli][rowi].mark,
							lineWidth: this._boardGraphicsObj._lineWidth,
							lineStyle: this._boardGraphicsObj._lineStyle,
							radius: this._boardGraphicsObj._markRadius,
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

	window.ttt.GameBoardGraphicsManager = GameBoardGraphicsManager;
})();