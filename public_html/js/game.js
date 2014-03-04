
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
                brickcounter : 0        
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen", 480, 320, true, 'auto')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(debugPanel, "debug");
		});
	}

	// Initialize the audio.
	 me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	 me.loader.onload = this.loaded.bind(this);

         // Enable the Keyboard
         me.input.bindKey(me.input.KEY.LEFT, "left");
         me.input.bindKey(me.input.KEY.RIGHT, "right");
         
         //disable the gravity
         me.sys.gravity = 0;
	// Load the resources.
	 me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	 me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
                
                // *** App Academy ***
                // Add the paddle entity into the entityPool
                me.entityPool.add("paddle", game.PaddleEntity);
                 me.entityPool.add("brick", game.BrickEntity);
                  me.entityPool.add("ball", game.BallEntity);
		// *** App Academy ***
                // Change the state of the game to PLAY
		me.state.change(me.state.PLAY);
	}
};