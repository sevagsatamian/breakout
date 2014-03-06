game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                
                
                
                
                // *** App Academy ***
                // Load the level you created in the program Tiled
                me.levelDirector.loadLevel("level012");
               
                var ball = new game.BallEntity(200,200, {});
                me.game.add(ball, 4);
                
                var brickList = me.game.getEntityByName("brick");
                console.log(brickList.length);
                
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        
        update: function() {
            if(brickList.length === 0 )  {
                console.log(brickList.length);
                me.levelDirector.nextLevel();
                me.levelDirector.loadLevel("level04");   
                
            }
    }
      
});
