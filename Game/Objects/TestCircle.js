if(!window.sft) window.sft = {};

(function(){
	var TestCircle = function(center, radius){
		// Attrs
		this.renderAttr = new window.sft.attrs.Render(this, this.drawCircle);
		// End Attrs
		this.center = center;
		this.radius = radius;
	};

	TestCircle.prototype.drawCircle = function(){
		window.sft.fx.drawCircle(this.center, this.radius);
	};

	window.sft.TestCircle = TestCircle;
})();