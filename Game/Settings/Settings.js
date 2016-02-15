if(!window.ttt) window.ttt = {};

(function(){
	var Settings = function(){
		/*
			1. Board Settings
		*/

		/************************************
			1. Board Settings
		************************************/
		this.BOARD_COLS = 3;
		this.BOARD_ROWS = 3;
	};

	window.ttt.settings = new Settings();
})();