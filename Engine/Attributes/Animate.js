if(!window.sft) window.sft = {};
if(!window.sft.attrs) window.sft.attrs = {};

(function(){
	function _loadAnimations(animations){
		animations.forEach(function(animation){
			this._animations[animation.name] = {
				name: animation.name,
				spritesheet: animation.spritesheet,
				numFrames: animation.numFrames,
				currFrame: 1,
				lastFrameUpdate: null, // unixtime of last frame update in milliseconds
				fps: animation.fps ? animation.fps : 24,
				framePeriodMilli: (1 / fps) * 1000,
				frameRect: animation.frameRect,
				loop: animation.loop ? animation.loop : false,
				complete: false,
				syncWithLogic: animation.syncWithLogic ? animation.syncWithLogic : false,
				isSynced: false
			};
		}, this);
	}

	function _validateAnimationName(animationName){
		if(!this._animations[animationName]) throw "Invalid animation name";
	}

	/***************/
	/* Constructor */
	/***************/
	/*
		settings = 
			{
				animations: [
					{
						name: "animation1", // name of animation
						spritesheet: "spritesheet1", // name of spritesheet img
						numFrames: 10, // the number of frames in the spritesheet
						fps: 24, // the target frame rate for the animation, default is 24
						frameRect: new window.sft.BoundingBox(), // the dimensions of each frame
						loop: false, // flag indicating whether to loop animation or just play it once, default is play it once,
						syncWithLogic: false, // flag indicating whether to sync animation with game logic, which can be used to
											  // halt game logic until animation is complete
					}
				]
			}
	*/
	var Animate = function(settings){
		this._animations = {};
		this._animationPlayList = [];
		_loadAnimations.call(this, settings);
	};

	Animate.prototype.animate = function(){
		// Update the current frame of each animation in the animationPlayList
		this._animationPlayList.forEach(function(animation, index){
			if(Date.now() - animation.lastFrameUpdate > animation.framePeriodMilli){
				// Update frame
				if(animation.currFrame == animation.numFrames){
					if(animation.loop){
						animation.currFrame = 1;
					}else{
						animation.complete = true;
						if(animation.syncWithLogic){
							animation.isSynced = true;
						}
					}
				}else{
					animation.currFrame++;
				}
			}
		}, this);

		// Remove completed animations from animationPlayList
		this._animationPlayList.filter(function(animation){ return !animation.complete; });
	};

	Animate.prototype.isAnimationPlaying = function(animationName){
		_validateAnimationName.call(animationName);
		return this._animationPlayList.find(function(animation){ return animation.name == animationName; }) !== undefined;
	};

	Animate.prototype.playAnimation = function(animationName){
		_validateAnimationName.call(animationName);
		var targetAnimation = this._animations[animationName];
		targetAnimation.currFrame = 1; 
		targetAnimation.lastFrameUpdate = Date.now();
		targetAnimation.complete = false;
		if(targetAnimation.syncWithLogic) targetAnimation.isSynced = false;
		this._animationPlayList.push(targetAnimation);
	};

	Animate.prototype.stopAnimation = function(animationName){
		_validateAnimationName.call(animationName);
		this._animationPlayList.filter(function(animation){ return animation.name != animationName; });
	};

	/* Returns an array of each frame that currently needs to be rendered
	   for every playing animation. */
	Animate.prototype.getPlayingAnimationRenderFrames = function(){
		return this._animationPlayList.map(function(animation){
			var frameWidth = animation.frameRect.width();
			var frameOffset = new window.sft.Point(frameWidth * (animation.currFrame - 1), 0);
			return {
				animationName: animation.name,
				frameImg: animation.spritesheet,
				frameClippingRect: new window.sft.BoundingBox(
					animation.frameRect.topLeft().add(frameOffset),
					animation.frameRect.bottomRight().add(frameOffset)
				)
			}; 
		}, this);
	};

	window.sft.attrs.Animate = Animate;
})();