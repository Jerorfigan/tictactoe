if(!window.sft) window.sft = {};

(function(){
	var _objects = {};
	var _objectsArry = [];
	var _objClassList = {
		"basic": 1,
		"manager": 2
	};

	var ObjectManager = function(){

	};

	ObjectManager.prototype.get = function(key){
		if(!_objects[key]) throw "unknown key";
		return _objects[key].data;
	};

	/* Retrieves all objects with a given attribute and/or class. Pass a blank string "" for
	   objClass or attr to filter by attr or objClass only respectively. */
	ObjectManager.prototype.getAllWithClassOrAttr = function(objClass, attr){
		var comparator = null;
		if(attr && objClass){
			if(!_objClassList[objClass]) throw "unknown object class";
			comparator = function(objContainer){ return !!objContainer.data[attr] && objContainer.objClass == objClass; };
		}else if(attr && !objClass){
			comparator = function(objContainer){ return !!objContainer.data[attr]; };
		}else if(!attr && objClass){
			if(!_objClassList[objClass]) throw "unknown object class";
			comparator = function(objContainer){ return objContainer.objClass == objClass; };
		}else{
			// Return everything
			comparator = function(objContainer){ return true; };
		}
		return _objectsArry.filter(comparator).map(function(objContainer){ return objContainer.data; });
	};

	ObjectManager.prototype.track = function(key, object, objClass){
		if(!objClass) objClass = "basic";
		if(_objects[key]) throw "duplicate key";
		if(!_objClassList[objClass]) throw "unknown object class";
		var objectContainer = {
			objClass: objClass,
			data: object
		};
		_objects[key] = objectContainer;
		_objectsArry.push(objectContainer);
	};

	ObjectManager.prototype.forget = function(key){
		if(!_objects[key]) throw "unknown key";
		_objectsArry = _objectsArry.filter(function(objContainer){ return objContainer.data != _objects[key].data; });
		delete _objects[key];
	};

	window.sft.objMgr = new ObjectManager();
})();