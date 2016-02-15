if(!window.sft) window.sft = {};
if(!window.sft.attrs) window.sft.attrs = {};

(function(){
	var Update = function(owner, updateFunc){
		this.owner = owner;
		this.updateFunc = updateFunc;
	};

	Update.prototype.update = function(){
		this.updateFunc.apply(this.owner, arguments);
	};

	window.sft.attrs.Update = Update;
})();