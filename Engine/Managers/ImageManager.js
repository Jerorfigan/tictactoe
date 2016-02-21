if(!window.sft) window.sft = {};

(function(){
	var ImageState = {
		"NOTLOADED": 1,
		"LOADING": 2,
		"LOADED": 3
	};

	function _storeImgMetadata(imgMetadata){
		imgMetadata.forEach(function(imgMetadatum){
			if(!imgMetadatum.name) throw "Image must have non-empty name";
			if(!imgMetadatum.path) throw "Image must have non-empty path";
			if(this._imgs[imgMetadatum.name]) throw "Duplicate image name. Name must be unique.";
			this._imgs[imgMetadatum.name] = {
				img: null,
				state: ImageState.NOTLOADED,
				path: imgMetadatum.path
			};
		}, this);
	}

	function _validateImgName(name){
		if(!this._imgs[name]) throw "Unknown image name";
	}

	/***************/
	/* Constructor */
	/***************/
	/*
		imgMetadata =
			[
				{name: "img1", path: "myimgs/img1.png"},
				{name: "img2", path: "myimgs/img2.png"},
				{name: "img3", path: "myimgs/img3.png"},
				...
			]
	*/
	var ImageManager = function(imgMetadata){
		this._imgs = {};
		_storeImgMetadata.call(this, imgMetadata);
	};

	ImageManager.prototype.get = function(name){
		_validateImgName.call(this, name);
		if(this._imgs[name].state == ImageState.LOADED){
			return this._imgs[name].img;
		}else if(this._imgs[name].state == ImageState.LOADING){
			console.log("WARNING (ImageManager): Attempt to retrieve image \"" + name + "\" but image is still loading.");
		}else{
			throw "Image has not been loaded.";
		}
	};

	ImageManager.prototype.load = function(name){
		_validateImgName.call(this, name);
		var img = new Image();
		img.addEventListener("load", function() {
			this._imgs[name].img = img;
			this._imgs[name].state = ImageState.LOADED;
		}, false);
		img.src = this._imgs[name].path;
		this._imgs[name].state = ImageState.LOADING;
	};

	ImageManager.prototype.unload = function(name){
		_validateImgName.call(this, name);
		delete this._imgs[name];
	};

	window.sft.imgs = new ImageManager();
})();