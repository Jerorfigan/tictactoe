if(!window.ttt) window.ttt = {};

(function(){
	/***************/
	/* Constructor */
	/***************/
	var GraphicsManager = function(){
		// Attrs
		this._attrUpdate = new window.sft.attrs.Update(this, this.update);
		// Sub Managers
		this._gameBoardGraphicsMgr = new window.ttt.GameBoardGraphicsManager();
	};

	GraphicsManager.prototype.update = function(){
		this._gameBoardGraphicsMgr.update();
	};

	window.ttt.GraphicsManager = GraphicsManager;
})();