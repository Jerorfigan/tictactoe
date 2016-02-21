if(!window.ttt) window.ttt = {};

(function(){
	/***************/
	/* Constructor */
	/***************/
	var TurnManager = function(){
		this._lastClickedSquare = null;
		window.sft.evt.subscribe("BoardClicked", function(targetSquare){
			this._lastClickedSquare = {
				col: targetSquare.col,
				row: targetSquare.row
			};
		}, this);
	};

	TurnManager.prototype.getBoxChoice = function(whosTurn, boardMgr){
		if(whosTurn == 'X'){
			// X is the player, so poll for player input by checking to see if _lastClickedSquare is set.
			// If it is, return that as the chosen square. Otherwise return null, indicating no square 
			// has been chosen as of yet.
			var chosenSquare = null;
			if(this._lastClickedSquare){
				chosenSquare = window.sft.util.objects.clone(this._lastClickedSquare);
				this._lastClickedSquare = null;	
			}
			return chosenSquare;
		}else{
			// O is the computer, so determine move with algorithm. Algorithm:
			// Place mark at first empty square encountered, starting at top left box of board,
			// and searching each row left to right before moving to next row
			var boxChoice = {col: null, row: null};
			for(var row = 1; row <= window.ttt.settings.BOARD_ROWS; row++){
				for(var col=1; col <= window.ttt.settings.BOARD_COLS; col++){
					if(boardMgr.isBoxEmpty({col: col, row: row})){
						boxChoice.col = col;
						boxChoice.row = row;
						return boxChoice;
					}
				}
			}
			return boxChoice;
		}
	};	

	window.ttt.TurnManager = TurnManager;
})();