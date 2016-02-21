if(!window.ttt) window.ttt = {};

(function(){
	/***************/
	/* Constructor */
	/***************/
	var InitGameManager = function(){
	};

	InitGameManager.prototype.initGame = function(){
		var gameplayManager = new window.ttt.GameplayManager(); 
		window.sft.objMgr.track("gameplayMgr", gameplayManager, "manager");
		var graphicsManager = new window.ttt.GraphicsManager();
		window.sft.objMgr.track("graphicsMgr", graphicsManager, "manager");
		console.log("Game initialized");
	};

	window.ttt.InitGameManager = InitGameManager;
})();