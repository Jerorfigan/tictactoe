if(!window.ttt) window.ttt = {};

(function(){

	var GameBoardGraphicsManager = function(){
		this._boardGraphicsObj = null;
	};

	GameBoardGraphicsManager.prototype.update = function(){
		if(window.sft.objMgr.has("board")){ // Logical board exists, need to create corresponding graphics object
			// Instantiate the board graphics object if it doesn't already exist
			if(!this._boardGraphicsObj){
				this._boardGraphicsObj = new window.ttt.GameBoardGraphics();
				window.sft.objMgr.track("boardFx", this._boardGraphicsObj);
			}
			// Update board graphics object state based on logical object state.
			// Currently, no updating needed since board is not dynamic.
		}else{ // No logical board object exists, therefore nothing to draw, so destroy board graphics object
			window.sft.objMgr.forget("boardFx");
			this._boardGraphicsObj = null;
		}
	};

	window.ttt.GameBoardGraphicsManager = GameBoardGraphicsManager;
})();