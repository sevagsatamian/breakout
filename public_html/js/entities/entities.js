// *** App Academy ***
// Create a game.PaddleEntity
game.PaddleEntity = me.ObjectEntity.extend({
    init: function(x, y, settings){
        settings.image = "paddle";
        settings.spritewidth = "48";
        settings.spriteheight = "16";
        this.parent(x, y, settings);
        
        this.setVelocity(7, 0);
        
        this.type = "paddle";
        this.collidable = true;
    },
       
   update: function() {
        if(me.input.isKeyPressed("left"))  {
            this.vel.x-= this.accel.x* me.timer.tick;
        }
        else if(me.input.isKeyPressed("right"))  {
            this.vel.x+= this.accel.x* me.timer.tick;
        }
        else{
            this.vel.x = 0;
        }
        this.updateMovement();
        
        if(this.vel.x !== 0)  {
            return true;
       
        }
    }
    });

game.BrickEntity = me.ObjectEntity.extend({
    init: function(x, y, settings){
        settings.image = "brick";
        settings.spritewidth = "32";
        settings.spriteheight = "16";
        this.parent(x, y, settings);
         
        this.type = "brick";
        this.collidable = true;
    },
       
    update: function() {

    },

    onCollision: function(){
       me.game.remove(this);   

    }
   
    });

game.BallEntity = me.ObjectEntity.extend({
    init: function(x, y, settings){
        settings.image = "ball";
        settings.spritewidth = "16";
        settings.spriteheight = "16";
        this.parent(x, y, settings);
        
        this.setVelocity(2,2);
        this.vel.x += this.accel.x * me.timer.tick;
        this.vel.y += this.accel.y * me.timer.tick;
        
        this.previousVelocity = this.vel.clone();
        
        this.collidable = true;
    },
       
    update: function() {
        var collision = this.collide();
        
        if(collision){
            if(collision.type === "paddle"){
                this.vel.y *= -1;
                me.audio.play("paddle-sfx");
            }
            else if(collision.type === "brick"){
                this.vel.y *= -1;
                game.data.score += 100;
            }
        }
        // check if we miss the paddle and went out

		if (this.pos.y > this.viewportHeight) {

			// force immediate object destruction (true parameter)

			me.game.remove(this, true);

			me.state.current().onBallDeath();

		}
        
        
        collision = this.updateMovement();
       
       if(collision){
           if(this.vel.x === 0){
             this.vel.x = -this.previousVelocity.x;
           }
           if(this.vel.y === 0){
               this.vel.y = -this.previousVelocity.y;
           }
       }
       
       this.previousVelocity = this.vel.clone();
       
       return true;
    },
            _determineBounceVelocity: function(paddle) {

		// check for distance to the paddle

		//var distance = this.distanceToPoint({x:paddle.pos.x+paddle.collisionBox.hWidth,y:paddle.pos.y});

		var distance = this.distanceTo(paddle) - this.hHeight - paddle.hHeight;

		

		var ratio = distance / paddle.collisionBox.hWidth * 2.5;

		

		if((this.pos.x + this.hWidth) < (paddle.pos.x + paddle.collisionBox.hWidth)) {

			// send the ball to the left if hit on the left side of the paddle, and vice versa

			ratio = -ratio;

		}

		return (this.speed * ratio);

	}
    
    });
    