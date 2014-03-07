
/* Game namespace */
var game = {

	// an object where to store game information
		onResetEvent: function() {	
// reset the game data
game.data.lives = 3;
game.data.score = 0;
game.data.level = -1;
// # bricks in the level
game.data.bricks = 0;
                },
    data : {
		// score
		score : 0,
                brickcounter : 0   
               
   
                // # bricks in the level
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
         	{
	if (action === "right") {
_this.nextLevel();
} else if (action === 'left') {
_this.previousLevel();
}
};

// load next level
this.nextLevel();
},

// called by EntityBrick
addScore: function (type) {
game.data.score += 100;
},

// called by EntityBrick
countBrick: function (type) {
game.data.bricks -=1;
if (game.data.bricks === 0) {
// all balls should be deactivated
game.ball.active = false;
this.nextLevel();
}
},

// call by EntityBall
onBallDeath: function () {
if (me.game.world.getChildByName('ball').length === 0) {
if (game.data.lives -1 <= 0) {
me.state.change(me.state.GAMEOVER);
} else {
game.data.lives--;
this._reset();
}
}
},

nextLevel: function() {
game.data.level++;
// -1 is to remove the title screen
if (game.data.level === me.levelDirector.levelCount()-1) {
me.state.change(me.state.GAME_END);
return;
}
me.levelDirector.loadLevel("level"+game.data.level);

this._reset();
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
