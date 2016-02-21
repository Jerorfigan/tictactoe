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
		this.BOARD_FX_TOP_LEFT = window.sft.Point(10,10);
		this.BOARD_FX_WIDTH_PX = 580;
		this.BOARD_FX_HEIGHT_PX = 580;
		this.BOARD_FX_LINE_WIDTH_PX = 10;
		this.BOARD_FX_LINE_STYLE = "#000";
	};

	window.ttt.settings = new Settings();
})();