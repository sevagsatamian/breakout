game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
        
        init: function() {
            this.parent(true);
        },
        
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
            
                
                
                
                // *** App Academy ***
                // Load the level you created in the program Tiled
                me.levelDirector.loadLevel("level01");
               
                var ball = new game.BallEntity(200,200, {});
                me.game.add(ball, 4);
              
                var brickList = me.game.getEntityByName("brick");
                
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
/*	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
                	countBrick: function (type) {
                         if(brickList.length === 0 )  {
                me.levelDirector.nextLevel();
                me.levelDirector.loadLevel("level04");   
                game.ball.active = false;
                this.nextLevel();
            }
            brickList = me.game.getEntityByName("brick");
            console.log(brickList.length);
    },
                  */
//game.data.bricks -=1;
        update: function() {
            brickList = me.game.getEntityByName("brick");
            console.log(brickList.length);
            
            if(brickList.length === 0 )  {
                me.levelDirector.nextLevel();
                me.levelDirector.loadLevel("level02");   
                 me.levelDirector.nextLevel();
                me.levelDirector.loadLevel("level03");   
                 me.levelDirector.nextLevel();
                me.levelDirector.loadLevel("level04");   
                 me.levelDirector.nextLevel();
                me.levelDirector.loadLevel("level05");   
                game.ball.active = false;
                this.nextLevel();
            }
    },
      
    	// called by EntityBrick 

	countBrick: function () {

		this.bricks -=1;

		//if (this.bricks === 0) {
                 if(brickList.length === 0 )  {
			// all balls should be deactivated

			game.ball.active = false;

			this.nextLevel();

		}
            brickList = me.game.getEntityByName("brick");
            console.log(brickList.length);
	},
// call by EntityBall
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
  }
});
