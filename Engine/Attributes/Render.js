if(!window.sft) window.sft = {};
if(!window.sft.attrs) window.sft.attrs = {};

(function(){
	var Render = function(owner, renderFunc){
		this.owner = owner;
		this.renderFunc = renderFunc;
	};

	Render.prototype.render = function(){
		this.renderFunc.apply(this.owner, arguments);
	};

	window.sft.attrs.Render = Render;
})();