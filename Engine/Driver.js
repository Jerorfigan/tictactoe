if(!window.sft) window.sft = {};

// Setup polyfill for window.requestAnimationFrame
(function(){
    var lastTime = 0;

    function requestAnimPolyfill(func) {
        var currTime = (new Date()).getTime();
        var timeToWait = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { func(currTime + timeToWait); }, timeToWait);
        lastTime = currTime + timeToWait;
        return id;
    }

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimPolyfill;
})();

// Setup and game driver
(function(){
    var Driver = function(){
        window.sft.EngineSettings = new window.sft.EngineSettings();
        this.lastUpdateTimeInMilliseconds = 0;
    };

    Driver.prototype.loadGameBootstrapper = function(bootstrapper){
        // Load GameManager with reference to bootstrapper. GameManager will invoke the bootstrapper object to init the game 
        // state.
        this.gameManager = new window.sft.GameManager(bootstrapper);
        // Start simulation
        this.loop(0);
    };

    Driver.prototype.loop = function (currTimeInMilliseconds){
        if(currTimeInMilliseconds - this.lastUpdateTimeInMilliseconds > window.sft.EngineSettings.FRAME_PERIOD_MILLI){
            this.gameManager.update();
            this.gameManager.draw();
            this.lastUpdateTimeInMilliseconds = currTimeInMilliseconds;
        }

        var thisObj = this;
        window.requestAnimationFrame(function(){
            Driver.prototype.loop.apply(thisObj, arguments);
        });
    };

    window.sft.driver = new Driver();
}());