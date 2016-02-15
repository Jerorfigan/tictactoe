if(!window.sft) window.sft = {};

(function(){
	var BoundingBox = function(topLeft, bottomRight){
		this._topLeft = topLeft;
		this._bottomRight = bottomRight;
	};

	// Getters / Setters
	BoundingBox.prototype.topLeft = function(newTopLeft){ if(!!newTopLeft){ this._topLeft = newTopLeft; }else{ return window.sft.util.objects.clone(this._topLeft); }};
	BoundingBox.prototype.bottomRight = function(newBottomRight) { if(!!newBottomRight){ this._bottomRight = newBottomRight; }else{ return window.sft.util.objects.clone(this._bottomRight); }};

	BoundingBox.prototype.toString = function(){ return "Top Left: " + this._topLeft.toString() + " Bottom Right: " + this._bottomRight.toString(); };

	window.sft.BoundingBox = BoundingBox;
})();