if(!window.ttt) window.ttt = {};

(function(){
	var Settings = function(){
		/*
			1. Board Settings
		*/

		/************************************
			1. Board Settings
		************************************/
		// Logical
		this.BOARD_COLS = 3;
		this.BOARD_ROWS = 3;
		// Graphical
		this.BOARD_FX_TOP_LEFT = new window.sft.Point(10,10);
		this.BOARD_FX_WIDTH_PX = 580;
		this.BOARD_FX_HEIGHT_PX = 580;
		this.BOARD_FX_LINE_WIDTH_PX = 10;
		this.BOARD_FX_LINE_STYLE = "#000";
		this.BOARD_FX_MARK_LINE_STYLE = "#F00";
		this.BOARD_FX_O_MARK_RADIUS = 0.3 * Math.min(this.BOARD_FX_WIDTH_PX / this.BOARD_COLS, this.BOARD_FX_HEIGHT_PX / this.BOARD_ROWS);
		this.BOARD_FX_X_MARK_RADIUS = 0.4 * Math.min(this.BOARD_FX_WIDTH_PX / this.BOARD_COLS, this.BOARD_FX_HEIGHT_PX / this.BOARD_ROWS);
		this.BOARD_FX_X_MARK_SIDE_ANGLE = Math.PI/4;
	};

	window.ttt.settings = new Settings();
})();