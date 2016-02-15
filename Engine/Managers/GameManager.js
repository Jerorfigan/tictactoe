if(!window.sft) window.sft = {};

(function(){
	var GameManager = function(bootstrapper){
		this.bootstrapper = bootstrapper;
		// This is the contract between the game engine and the bootstrapper object owned by the game files. 
		// The bootstrapper must implement a function called 'initGame' that takes no arguments and sets up 
		// the game's initial state.
		if(this.bootstrapper.initGame == undefined) throw "Bootstrapper does not implement 'initGame' function";
		this.bootstrapper.initGame();
	};

	GameManager.prototype.draw = function(){
		var renderList = window.sft.objMgr.getAllWithClassOrAttr("basic", "_attrRender");
		renderList.forEach(function(obj){ obj._attrRender.render(); });
	};

	GameManager.prototype.update = function(){
		var managerUpdateList = window.sft.objMgr.getAllWithClassOrAttr("manager", "_attrUpdate");
		managerUpdateList.forEach(function(obj){ obj._attrUpdate.update(); });
	};

	window.sft.GameManager = GameManager;
})();