if(!window.ttt) window.ttt = {};

(function(){

	function _initBoard(boardObj){
		// Init board data
		for(var col = 1; col <= this._boardObj._cols; col++){
			var colData = [];
			for(var row = 1; row <= this._boardObj._rows; row++){
				var newBoxData = window.sft.util.objects.clone(window.ttt.GameBoard.prototype.boxData);
				colData.push(
					newBoxData
					);				
			}
			boardObj._boardData.push(colData);
		}

		// Init row and col meta data
		for(var col = 1; col <= this._boardObj._cols; col++){
			var colMetaDatum = window.sft.util.objects.clone(window.ttt.GameBoard.prototype.rowColDiagMetaData);
			boardObj._colMetaData.push(colMetaDatum);
		}
		for(var row = 1; row <= this._boardObj._rows; row++){
			var rowMetaDatum = window.sft.util.objects.clone(window.ttt.GameBoard.prototype.rowColDiagMetaData);
			boardObj._rowMetaData.push(rowMetaDatum);
		}
		// Init diagonal meta data if its a square board
		if(this._boardObj._cols == this._boardObj._rows){
			var diagonals = ["TopLeftToBottomRight", "TopRightToBottomLeft"];
			diagonals.forEach(function(diagonal){
				var diagMetaDatum = window.sft.util.objects.clone(window.ttt.GameBoard.prototype.rowColDiagMetaData);
				boardObj._diagMetaData[diagonal] = diagMetaDatum;
			});
		}
	}

	function _validateRowCol(rowCol){
		if(
			rowCol.col < 1 || 
			rowCol.col > this._boardObj._cols ||
			rowCol.row < 1 || 
			rowCol.row > this._boardObj._rows
		){
			throw "Invalid row/column";
		}
	}

	/***************/
	/* Constructor */
	/***************/
	var GameBoardManager = function(){
		this._boardObj = new window.ttt.GameBoard();
		window.sft.objMgr.track("board", this._boardObj);
		_initBoard.call(this, this._boardObj);
	};

	GameBoardManager.prototype.addMark = function(mark, rowCol){
		_validateRowCol.call(this, rowCol);
		if(this._boardObj._boardData[rowCol.col - 1][rowCol.row - 1].mark){
			throw "Row/column not empty";
		}
		// Get boardData indices from rowCol
		var ci = rowCol.col - 1;
		var ri = rowCol.row - 1;
		this._boardObj._boardData[ci][ri].mark = mark;
		// Update row and col meta data
		this._boardObj._colMetaData[ci].markCnt[mark]++;
		this._boardObj._rowMetaData[ri].markCnt[mark]++;
		// If square board, update diagonal meta data
		if(this._boardObj._cols == this._boardObj._rows){
			if(rowCol.col == rowCol.row) this._boardObj._diagMetaData["TopLeftToBottomRight"].markCnt[mark]++;
			if(rowCol.col + rowCol.row == this._boardObj._cols + 1) this._boardObj._diagMetaData["TopRightToBottomLeft"].markCnt[mark]++;
		}
		// Check if we have a full row or column or diagonal
		if(
			this._boardObj._colMetaData[ci].markCnt[mark] == this._boardObj._rows || 
			this._boardObj._rowMetaData[ri].markCnt[mark] == this._boardObj._cols ||
			this._boardObj._diagMetaData["TopLeftToBottomRight"].markCnt[mark] == this._boardObj._cols ||
			this._boardObj._diagMetaData["TopRightToBottomLeft"].markCnt[mark] == this._boardObj._cols
		){
			this._boardObj._boardHasFullColRowOrDiag = true;
			this._boardObj._fullColRowOrDiagMark = mark;
		}
		// Update mark count, which we'll use to determine when board is full
		this._boardObj._totalMarkCnt++;
	};

	GameBoardManager.prototype.boardHasFullColRowOrDiag = function(){
		return this._boardObj._boardHasFullColRowOrDiag;
	};

	GameBoardManager.prototype.getFullColRowOrDiagMark = function(){
		return this._boardObj._fullColRowOrDiagMark;
	};

	GameBoardManager.prototype.isBoxEmpty = function(rowCol){
		_validateRowCol.call(this, rowCol);
		// Get boardData indices from rowCol
		var ci = rowCol.col - 1;
		var ri = rowCol.row - 1;
		return this._boardObj._boardData[ci][ri].mark == null;
	};

	GameBoardManager.prototype.isBoardFull = function(){
		return this._boardObj._totalMarkCnt == this._boardObj._rows * this._boardObj._cols;
	};

	GameBoardManager.prototype.getBoardString = function(){
		// Build board top border
		var boardString = "-";
		for(var col = 1; col <= this._boardObj._cols; col++){
			boardString = boardString + "--";
		}
		boardString = boardString + "\n";
		// Build board rows and cols
		for(var row = 1; row <= this._boardObj._rows; row++){
			var ri = row - 1;
			for(var col = 1; col <= this._boardObj._cols; col++){
				var ci = col - 1;
				var curMark = this._boardObj._boardData[ci][ri].mark;
				if(col == 1) boardString = boardString + "|";
				boardString = boardString + (curMark == null ? " " : curMark) + "|";
			}
			boardString = boardString + "\n";
		}
		// Build board bottom border
		boardString = boardString + "-";
		for(var col = 1; col <= this._boardObj._cols; col++){
			boardString = boardString + "--";
		}

		return boardString;
	};

	window.ttt.GameBoardManager = GameBoardManager;
})();