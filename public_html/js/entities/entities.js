// *** App Academy ***
// Create a game.PaddleEntity
game.PaddleEntity = me.ObjectEntity.extend({
    init: function(x, y, settings){
        settings.image = "paddle";
        settings.spritewidth = "48";
        settings.spriteheight = "16";
        this.parent(x, y, settings);
        
        this.setVelocity(7, 0);
        
        	this.fullSize = {
x: 0,
w: 48,
y: 0,
h: 16
};

this.miniSize = {
x: 8,
w: 40,
y: 0,
h: 16
};

// to cancel the power down
this.timer = -1;
this.isPaddle = true;
this.powerDownLength = 10; // sec


        this.type = "paddle";
        this.collidable = true;
    },
       
   update: function(dt) {
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
        
        if(this.vel.x !== 0)  
            return true;

// check if we have a timer active
if (this.timer > 0) {
this.timer -= dt;
if (this.timer < 0) {
// restore the normal paddle
this.onPowerDownEnd();
}
}

// return true if we moved
return true;
},

onPowerUp: function() {
// add a new ball
var ball = new EntityBall(50, me.game.viewport.height/2, {});
ball.active = true;
me.game.world.addChild(ball, this.z);

},

onPowerDown: function() {
if (this.renderable.isCurrentAnimation('idle')) {
this.renderable.setCurrentAnimation("mini");
// adjust the bounding box
this.getShape().pos.set(this.miniSize.x, this.miniSize.y);
this.getShape().resize(this.miniSize.w,this.miniSize.h);
this.timer = this.powerDownLength * 1000;
}
},

onPowerDownEnd: function() {
if (this.renderable.isCurrentAnimation('mini')) {
this.timer = -1;
this.renderable.setCurrentAnimation("idle");
// adjust the bounding box
this.getShape().pos.set(this.fullSize.x, this.fullSize.y);
this.getShape().resize(this.fullSize.w,this.fullSize.h);
me.audio.play('recover');
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
        	this.dying = false;
                
// and power down/up flags
this.hasPowerUp = settings.hasPowerUp===true;
this.hasPowerDown = settings.hasPowerDown===true;
    },
       
    update: function() {

    },

    onCollision: function(){
       me.game.remove(this);   
   
   	if (!this.dying) {
this.dying = true;
this.collidable = false;
me.game.world.removeChild(this);
// add score and decrease brick count
me.state.current().addScore(this.type);
me.state.current().countBrick();
// check for power-up/power-down
	if (this.hasPowerUp) {
me.game.world.addChild(new EntityPowerUp(this.pos.x, this.pos.y), this.z);
} else if(this.hasPowerDown) {
me.game.world.addChild(new EntityPowerDown(this.pos.x,this.pos.y), this.z);
	// and power down/up flags
this.hasPowerUp = settings.hasPowerUp===true;
this.hasPowerDown = settings.hasPowerDown===true;
}
}
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
       	// check if we miss the paddle and went out
       if (this.pos.y > this.viewportHeight) {
       // force immediate object destruction (true parameter)
              me.game.world.removeChildNow(this);
              me.state.current().onBallDeath();
       return true;
    }
       
       this.previousVelocity = this.vel.clone();
       
       return true;
    
   if (this.pos.y > this.viewportHeight) {
// force immediate object destruction (true parameter)
me.game.world.removeChildNow(this);
me.state.current().onBallDeath();
return true;
}

// check for collision with paddle & bricks
var res = me.game.collide(this);
if (res) {
if (res.obj.isPaddle) {
if (res.y !== 0) {
this.vel.x = this._determineBounceVelocity(res.obj);
this.vel.y *= - 1;
} else if (res.x !== 0) {
this.vel.x *= - 1;
}
} else if (res.obj.type === 'brick') {

var dx = res.obj.pos.x - this.pos.x;
if (this.hWidth < res.obj.hWidth) {
dx -= this.width;
} else {
dx += res.obj.width;
}

var dy = res.obj.pos.y - this.pos.y;
if (this.hHeight < res.obj.hHeight) {
dy -= this.height;
} else {
dy += res.obj.height;
}

if (Math.abs(dx) < Math.abs(dy)) {
this.pos.x = this.prev.x;
this.vel.x *= -1;
} else {
this.pos.y = this.prev.y;
this.vel.y *= -1;
}
}
}
return true;
},
    	_determineBounceVelocity: function(paddle) {
// check for distance to the paddle

     this.cacheBounds = paddle.getBounds(this.cacheBounds).translateV(paddle.pos);

          var distance = this.distanceTo(paddle) - this.hHeight - this.cacheBounds.hHeight;

          var ratio = distance / this.cacheBounds.hWidth * 2.5;

      if((this.pos.x + this.hWidth) < (this.cacheBounds.pos.x + this.cacheBounds.hWidth)) {
          // send the ball to the left if hit on the left side of the paddle, and vice versa
          ratio = -ratio;
    }
       return (this.speed * ratio);
    }
    
    });
    EntityPowerDown = me.ObjectEntity.extend({
init: function(x, y) {
var settings = {};
settings.image = "tiles16";
settings.width = 16;
settings.height = 16;
settings.spritewidth = 16;
settings.spriteheight = 16;
settings.name = 'power-down';
this.parent(x, y, settings);

this.renderable.addAnimation('idle', [79]);
this.renderable.setCurrentAnimation('idle');

this.collidable = true;
this.vel.x = 0;
this.vel.y = 80 / me.sys.fps;
},

update: function(dt) {
this.pos.y += this.vel.y;
if(this.pos.y > me.game.viewport.height) {
me.game.world.removeChild(this);
return false;
}

// check for collision with the paddle
var res = me.game.collideType(this, 'paddle');
// just check if res is defined since we have only 1 paddle
if (res) {
this.collidable = false;
me.audio.play('powerdown');
res.obj.onPowerDown();
me.game.world.removeChild(this);
}
return true;
}
});

EntityPowerUp = me.ObjectEntity.extend({
init: function(x, y) {
var settings = {};
settings.image = "tiles16";
settings.width = 16;
settings.height = 16;
settings.spritewidth = 16;
settings.spriteheight = 16;
settings.name = 'power-up';
this.parent(x, y, settings);

this.renderable.addAnimation('idle', [78]);
this.renderable.setCurrentAnimation('idle');

this.collidable = true;
this.vel.x = 0;
this.vel.y = 80 / me.sys.fps;
},

update: function(dt) {
this.pos.y += this.vel.y;
if(this.pos.y > me.game.viewport.height) {
me.game.world.removeChild(this);
return false;
}

// check for collision with the paddle
var res = me.game.collideType(this, 'paddle');
// just check if res is defined since we have only 1 paddle
if (res) {
this.collidable = false;
me.audio.play('powerup');
res.obj.onPowerUp();
me.game.world.removeChild(this);
}
return true;
}
});