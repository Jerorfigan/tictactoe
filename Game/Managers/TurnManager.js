if(!window.ttt) window.ttt = {};

(function(){
	/***************/
	/* Constructor */
	/***************/
	var TurnManager = function(){
	};

	TurnManager.prototype.getBoxChoice = function(whosTurn, boardMgr){
		if(whosTurn == 'X'){
			// X is the player, so prompt for player input
			/*window.sft.input.waitForMouseInput("canvas", function(evt){
				// TODO: translate mouse click to gameboard 
			}, this);*/
			var inputValid = false;
			var boxChoice = null;
			while(!inputValid){
				var boxChoiceStr = window.prompt("Choose a box to make a mark (ex: 1,3 => first column, third row):");
				boxChoice = boxChoiceStr.split(",").map(function(val){ return parseInt(val); });
				if(boxChoice.length == 2 && typeof boxChoice[0] == "number" && typeof boxChoice[1] == "number"){
					if(boardMgr.isBoxEmpty({col: boxChoice[0], row: boxChoice[1]})){
						inputValid = true;
					}else{
						console.log("Box is not empty.");
					}
				}else{
					console.log("Invalid box choice.");
				}
			}
			return {col: boxChoice[0], row: boxChoice[1]};
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