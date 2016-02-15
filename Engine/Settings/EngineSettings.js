if(!window.sft) window.sft = {};

(function(){

	var EngineSettings = function(){
		/*
			1. FPS Settings
			2. Canvas
		*/

		/************************************
			1. FPS Settings
		************************************/
		this.FRAME_RATE = 30;
		this.FRAME_PERIOD_SECONDS = 1/this.FRAME_RATE;
		this.FRAME_PERIOD_MILLI = this.FRAME_PERIOD_SECONDS * 1000;

		/************************************
			2. Canvas
		************************************/
		this.CANVAS_WIDTH_PX = 600;
		this.CANVAS_HEIGHT_PX = 600;
	};

	window.sft.EngineSettings = EngineSettings;
})();