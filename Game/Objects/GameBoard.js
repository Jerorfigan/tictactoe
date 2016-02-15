if(!window.ttt) window.ttt = {};

(function(){
	var GameBoard = function(){
		// State variables
		this._colMetaData = [];
		this._rowMetaData = [];
		this._diagMetaData = {};
		this._boardData = [];
		this._cols = null;
		this._rows = null;
		this._boardHasFullColRowOrDiag = false;
		this._fullColRowOrDiagMark = null;
		this._isBoardFull = false;
	};

	// Template for box data
	GameBoard.prototype.boxData = {
		mark: null
	};

	// Template for row, col and diag meta data
	GameBoard.prototype.rowColDiagMetaData = {
		markCnt: {"X": 0, "O": 0}
	};

	window.ttt.GameBoard = GameBoard;
})();