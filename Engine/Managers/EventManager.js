if(!window.sft) window.sft = {};

(function(){
	var events = {
		"testEvent": []
	};

	var EventManager = function(){

	};

	EventManager.prototype.subscribe = function(evt, callback, context){
		if(!events[evt]) throw "unknown event";
		events[evt].push({
			handlerWrapper: function(){
				callback.apply(context, arguments)
			},
			handler: callback
		}); 
	};

	EventManager.prototype.unsubscribe = function(evt, callback){
		if(!events[evt]) throw "unknown event";
		events[evt].filter(function(subscriber){
			if(subscriber.handler == callback){
				return false;
			}
			return true;
		});
	};

	EventManager.prototype.fire = function(evt, data){
		if(!events[evt]) throw "unknown event";
		events[evt].forEach(function(subscriber){
			subscriber.handlerWrapper.call(evt, data);
		});
	};

	window.sft.evt = new EventManager();
})();