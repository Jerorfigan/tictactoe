if(!window.ttt) window.ttt = {};

(function(){

	function render(){
		window.sft.fx.drawGrid({
			topLeft: this._topLeftPoint,
			width: this._width,
			height: this._height,
			cols: this._cols,
			rows: this._rows,
			lineWidth: this._lineWidth,
			lineStyle: this._lineStyle
		});
	}

	var GameBoardGraphics = function(){
		// Attrs
		this._attrRender = new window.sft.attrs.Render(this, render);
		// Graphical properties (static)
		this._topLeftPoint = window.ttt.settings.BOARD_FX_TOP_LEFT; // units px
		this._width = window.ttt.settings.BOARD_FX_WIDTH_PX;
		this._height = window.ttt.settings.BOARD_FX_HEIGHT_PX;
		this._lineWidth = window.ttt.settings.BOARD_FX_LINE_WIDTH_PX;
		this._lineStyle = window.ttt.settings.BOARD_FX_LINE_STYLE; 
		this._cols = window.ttt.settings.BOARD_COLS;
		this._rows = window.ttt.settings.BOARD_ROWS;
	};

	window.ttt.GameBoardGraphics = GameBoardGraphics;
})();