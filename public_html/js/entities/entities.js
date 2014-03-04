// *** App Academy ***
// Create a game.PaddleEntity
game.PaddleEntity = me.ObjectEntity.extend({
    init: function(x, y, settings){
        settings.image = "paddle";
        settings.spritewidth = "48";
        settings.spritehight = "16";
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
        settings.spritehight = "16";
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
        settings.spritehight = "16";
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
            }
            else if(collision.type === "brick"){
                this.vel.y *= -1;
            }
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
    } 
    
    });
    