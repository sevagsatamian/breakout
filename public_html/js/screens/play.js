game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
        
        init: function() {
            this.parent(true);
            this.onResetEvent(true);
            this.resetBall(true);
             // setup a callback
      me.loader.onProgress = this.onProgressUpdate.bind(this);
        },
   // will be fired by the loader each time a resource is loaded
   onProgressUpdate: function(progress)
   {
      this.invalidate = true;
   },
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                game.data.lives = 3;
                
                
                
                // *** App Academy ***
                // Load the level you created in the program Tiled
                me.levelDirector.loadLevel("level02");
               
                var ball = new game.BallEntity(200,200, {});
                me.game.add(ball, 4);
              
                var brickList = me.game.getEntityByName("brick");
                
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


                
//game.data.bricks -=1;
        update: function() {
            brickList = me.game.getEntityByName("brick");
            console.log(brickList.length);
            
            if(brickList.length === 0 )  {
                me.levelDirector.loadLevel("level05");   
                this.nextLevel();
                this.resetBall();
            }
    },
            resetBall: function(){
            var ball = new game.BallEntity(200,200, {});
                me.game.add(ball, 4);
                },
      
    	// called by EntityBrick 

	countBrick: function () {

		this.bricks -=1;

		//if (this.bricks === 0) {
                 if(brickList.length === 0 )  {
			// all balls should be deactivated

			game.ball.active = false;

			this.nextLevel();
                        var ball = new game.BallEntity(200,200, {});
                            me.game.add(ball, 4);
                             this.resetBall();
		}
            brickList = me.game.getEntityByName("brick");
            console.log(brickList.length);
	},
/* call by EntityBall
    onBallDeath: function () {
               if (me.game.world.getChildByName('ball').length === 0) {
               if (game.data.lives -1 <= 0) {
           me.state.change(me.state.GAMEOVER);
                      } else {
           game.data.lives--;
           me.levelDirector.reloadLevel();
           this._reset();
     }
  }
},*/

   nextLevel: function() {
         game.data.level++;
   // -1 is to remove the title screen
         if (game.data.level === me.levelDirector.levelCount()-1) {
            me.state.change(me.state.PLAY);
         }
            me.levelDirector.loadLevel("level"+game.data.level);
            var ball = new game.BallEntity(200,200, {});
            me.game.add(ball, 4);
            this.resetBall();
  }
});
