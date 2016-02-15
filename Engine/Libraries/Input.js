if(!window.sft) window.sft = {};

(function(){
	var _keys = {
		"ArrowUp": {isDown: false, keyCode: 38, key: "Up"},
		"ArrowDown": {isDown: false, keyCode: 40, key: "Down"},
		"ArrowLeft": {isDown: false, keyCode: 37, key: "Left"},
		"ArrowRight": {isDown: false, keyCode: 39, key: "Right"}
	};

	function _handleKeyToggle(event, keydown){
		if(!keydown) keydown = true;
		if(event.defaultPrevented) return; // Should do nothing if the default action has been cancelled
		
		var handled = false;

		if(event.key !== undefined){
			comparator = function(key){ return key.key == event.key; };
		}else if(event.keyCode !== undefined){
		    comparator = function(key){ return key.keyCode == event.keyCode; };
		}

		for(var i = 0; i < _keys.length; i++){
			if(comparator(_keys[i])){
				_keys[i].isDown = keydown ? true : false; 
				handled = true;
				break;
			}
		}

		if (handled) event.preventDefault(); // Suppress "double action" if event handled
	}

	var Input = function(){
		window.addEventListener("keydown", function (event) {
			_handleKeyToggle(event, true);
		}, true);
		window.addEventListener("keyup", function (event) {
			_handleKeyToggle(event, false);
		}, true);
	};

	Input.prototype.isKeyDown = function(key){
		if(!_keys[key]) throw "Unknown key";
		return _keys[key].isDown;
	};

	Input.prototype.waitForMouseInput = function(elementID, callback, context){
		var element = document.getElementById(elementID);
		if(!element) throw "Invalid elementID";
		var clicked = false;
		element.addEventListener("click", function(){
			callback.apply(context, arguments);
			clicked = true;	
		});
		while(!clicked){}
	};

	window.sft.input = new Input();
})();