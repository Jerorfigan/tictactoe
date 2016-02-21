if(!window.ttt) window.ttt = {};

(function(){

	var GameBoardGraphics = function(renderer, rendererContext){
		// Attrs
		this._attrRender = new window.sft.attrs.Render(rendererContext, renderer);
		// Graphical properties (static)
		this._topLeftPoint = window.ttt.settings.BOARD_FX_TOP_LEFT; // units px
		this._width = window.ttt.settings.BOARD_FX_WIDTH_PX;
		this._height = window.ttt.settings.BOARD_FX_HEIGHT_PX;
		this._bottomRightPoint = new window.sft.Point(
			this._topLeftPoint.x() + this._width, 
			this._topLeftPoint.y() + this._height
		);
		this._lineWidth = window.ttt.settings.BOARD_FX_LINE_WIDTH_PX;
		this._lineStyle = window.ttt.settings.BOARD_FX_LINE_STYLE; 
		this._cols = window.ttt.settings.BOARD_COLS;
		this._rows = window.ttt.settings.BOARD_ROWS;
		this._markRadius = window.ttt.settings.BOARD_FX_MARK_RADIUS;
		this._xMarkSideAngle = window.ttt.settings.BOARD_FX_X_MARK_SIDE_ANGLE;
		this._colWidth = this._width / this._cols;
		this._rowWidth = this._height / this._rows;
	};

	window.ttt.GameBoardGraphics = GameBoardGraphics;
})();