if(!window.ttt) window.ttt = {};

(function(){
	var GameBoard = function(){
		// State variables
		this._colMetaData = [];
		this._rowMetaData = [];
		this._diagMetaData = {};
		this._boardData = [];
		this._cols = window.ttt.settings.BOARD_COLS;
		this._rows = window.ttt.settings.BOARD_ROWS;
		this._boardHasFullColRowOrDiag = false;
		this._fullColRowOrDiagMark = null;
		this._totalMarkCnt = 0;
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