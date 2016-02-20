if(!window.ttt) window.ttt = {};

(function(){

	var GameGraphics = function(){
		// Call parent constructor
		window.sft.GraphicsLibrary.call(this);
	};

	window.sft.util.objects.inherit(GameGraphics, window.sft.GraphicsLibrary);

	window.ttt.gamefx = GameGraphics;
})();