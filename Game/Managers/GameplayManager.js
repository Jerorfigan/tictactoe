if(!window.ttt) window.ttt = {};

(function(){
	/***************/
	/* Constructor */
	/***************/
	var GameplayManager = function(){
		// Attrs
		this._attrUpdate = new window.sft.attrs.Update(this, this.update);
		// Sub Managers
		this._turnManager = new window.ttt.TurnManager();
		this._boardManager = new window.ttt.GameBoardManager();
		// State variables
		this._whosTurn = "X";
		this._firstUpdate = true;
	};

	GameplayManager.prototype.update = function(){
		// Since we immediately block on prompting player for turn action as first step of game logic, 
		// skip first invocation to allow initial game state to be drawn
		if(this._firstUpdate){
			this._firstUpdate = false;
			return;
		}
		if(!this.isGameOver()){
			var rowCol = this._turnManager.getBoxChoice(this._whosTurn, this._boardManager);
			if(!rowCol) return; // The player has yet to select a square, skip rest of update
			try{
				this._boardManager.addMark(this._whosTurn, rowCol);
				this._whosTurn = this._whosTurn == "X" ? "O" : "X";
			}catch(e){ 
				// Swallow error thrown by addMark when player chooses an already occupied square to place a mark,
				// player will be forced to repick next update
				if(e == "Row/column not empty"){
				}else{
					throw e;
				}
			}
		}else{
			this.handleGameEnd();
			window.sft.objMgr.forget("gameplayMgr");
		}
	};

	GameplayManager.prototype.isGameOver = function(){
		return this._boardManager.boardHasFullColRowOrDiag() || this._boardManager.isBoardFull();
	};

	GameplayManager.prototype.handleGameEnd = function(){
		if(this._boardManager.boardHasFullColRowOrDiag()){
			console.log("Game over. " + this._boardManager.getFullColRowOrDiagMark() + " wins.");
		}else{
			console.log("Game over. Draw.");
		}
	};

	window.ttt.GameplayManager = GameplayManager;
})();