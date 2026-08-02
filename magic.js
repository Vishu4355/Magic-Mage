console.log("magic.js loaded");




window.addEventListener('load', function(){
    const canvas = document.getElementById('mycan1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 720;

    class Player {

        constructor(game){
            this.game = game;
            this.width = 64;
            this.height = 64;

            // Hitbox (physics body)

            this.hitboxWidth = 44;
            this.hitboxHeight = 60;

            this.hitboxOffsetX = 10;
            this.hitboxOffsetY = 4;
            
            this.x = this.game.width * 0.5;
            this.y = this.game.height * 0.5;
            this.speedy = 0;
            this.maxSpeed = 4;
            this.velocityX = 0;
            this.velocityY = 0;

            // Acccleration and Gravity

            this.groundAcceleration = 0.45;
            this.airAcceleration = 0.22;

            this.groundFriction = 0.35;
            this.airFriction = 0.04;
            this.gravity = 0.5;


            this.jumpForce = -16;
            this.maxJump = 2;
            this.onGround = false;
            this.jumpPressed = false;
            this.spritewidth = 128;
            this.spriteheight = 128;
            this.drawwidth = 128;
            this.drawheight = 128;
            this.drawOffsetX = -32;
            this.drawOffsetY = -64;
            this.facing = 1;  // 1 = right and -1 = left
            this.coyoteTime = 8;
            this.coyoteTimer = 0;
        



            // Animation

            this.frameX = 0;
            this.frametimer = 0;
            this.frameinterval = 5;

            // load Animation

            this.animations = {
                idle: { image: new Image(), frames: 8  },
                run : { image: new Image(), frames: 8  },
                jump : { image: new Image(), frames: 8  },
                walk : { image: new Image(), frames: 7  }
            }

            this.animations.idle.image.src = "assets/Wanderer Magican/Idle.png";
            this.animations.run.image.src = "assets/Wanderer Magican/Run.png";
            this.animations.jump.image.src = "assets/Wanderer Magican/Jump.png";
            this.animations.walk.image.src = "assets/Wanderer Magican/Walk.png";


            this.currentAnimation = this.animations.idle;
            this.previousAnimation = this.currentAnimation;


        }


        draw(context) {

            context.save();

            if (this.facing === -1) {
                context.scale(-1, 1);

                context.drawImage(
                    this.currentAnimation.image,
                    this.frameX * this.spritewidth,
                    0,
                    this.spritewidth,
                    this.spriteheight,

                    -(this.x + this.drawOffsetX + this.drawwidth),
                    this.y + this.drawOffsetY,
                    this.drawwidth,
                    this.drawheight
                );
            } else {
                context.drawImage(
                    this.currentAnimation.image,
                    this.frameX * this.spritewidth,
                    0,
                    this.spritewidth,
                    this.spriteheight,

                    this.x + this.drawOffsetX,
                    this.y + this.drawOffsetY,
                    this.drawwidth,
                    this.drawheight
                );
            }

            context.restore();
        }

           
        


        update(){


            const acceleration = this.onGround
                ? this.groundAcceleration
                : this.airAcceleration;

            const friction = this.onGround
                ? this.groundFriction
                : this.airFriction;

            if (this.game.keys.ArrowRight || this.game.keys.d) {

                this.velocityX += acceleration;
                this.facing = 1;

            }
            else if (this.game.keys.ArrowLeft || this.game.keys.a) {

                this.velocityX -= acceleration;
                this.facing = -1;

            }
            else {

                // Slow down when no key is held
                if (this.velocityX > 0) {
                    this.velocityX -= friction;
                    if (this.velocityX < 0) this.velocityX = 0;
                }

                if (this.velocityX < 0) {
                    this.velocityX += friction;
                    if (this.velocityX > 0) this.velocityX = 0;
                }

            }


            this.velocityX = Math.max(
                -this.maxSpeed,
                 Math.min(this.velocityX, this.maxSpeed)
            );




            
           if (this.game.keys[" "]) {

                if (!this.jumpPressed) {

                    // Ground jump or coyote jump
                    if (this.onGround || this.coyoteTimer > 0) {
                    this.velocityY = this.jumpForce;
                    this.onGround = false;
                    this.coyoteTimer = 0;
                    this.maxJump = 1;          // One jump remaining (double jump)
                    
                    }

                     // Double jump
                     else if (this.maxJump > 0) {
                     this.velocityY = this.jumpForce;
                     this.maxJump--;
                     }

                    this.jumpPressed = true;
                  }

            } else {
                this.jumpPressed = false;
            }




            this.velocityY += this.gravity;



            this.x += this.velocityX;
            this.y += this.velocityY;


            this.onGround = false;


            // collision logic

            this.game.Platforms.forEach(platform => {

            const playerTop = this.y + this.hitboxOffsetY;
            const playerBottom = playerTop + this.hitboxHeight;
            const playerLeft = this.x + this.hitboxOffsetX;
            const playerRight = playerLeft + this.hitboxWidth;

            const previousBottom = playerBottom - this.velocityY;
            const prevTop = playerTop - this.velocityY;
            const prevRight = playerRight - this.velocityX;
            const prevLeft = playerLeft - this.velocityX;


            const platformTop = platform.y;
            const platformLeft = platform.x;
            const platformRight = platform.x + platform.width;
            const platformBottom = platform.y + platform.height;

            if (
                previousBottom <= platformTop &&
                playerBottom >= platformTop &&
                playerRight > platformLeft &&
                playerLeft < platformRight &&
                this.velocityY > 0
            ) {
                this.y = platformTop - this.hitboxHeight - this.hitboxOffsetY;
                this.velocityY = 0;
                this.onGround = true;
                this.maxJump = 2;
            }



            if (
                prevRight <= platformLeft &&
                playerRight >= platformLeft &&
                playerBottom > platformTop &&
                playerTop < platformBottom
            ) {
                this.x = platformLeft - this.hitboxWidth - this.hitboxOffsetX;
                this.velocityX = 0;
            }

            if (
                prevLeft >= platformRight &&
                playerLeft <= platformRight &&
                playerBottom > platformTop &&
                playerTop < platformBottom
            ) {
                this.x = platformRight - this.hitboxOffsetX;
                this.velocityX = 0;
            }

            if (
                prevTop >= platform.y + platform.height &&
                playerTop <= platform.y + platform.height &&
                playerRight > platform.x &&
                playerLeft < platform.x + platform.width
            ) {
                this.y = platformBottom - this.hitboxOffsetY;
                this.velocityY = 1;
            }

            });

            if (this.onGround) {
                this.coyoteTimer = this.coyoteTime;
            } else if (this.coyoteTimer > 0) {
                this.coyoteTimer--;
            }



            this.x = Math.max(
                 0,
                 Math.min(this.x,
                 this.game.width - this.width)
            );

            if (this.y < 0) {
                 this.y = 0;
            }

            // choosing Animations

            if(!this.onGround) {

                this.currentAnimation = this.animations.jump;

            }else if (Math.abs(this.velocityX) > 0.1) {
                this.currentAnimation = this.animations.run;

            }else {
                this.currentAnimation = this.animations.idle;
            }

            if (this.currentAnimation !== this.previousAnimation) {

                this.frameX = 0;

                this.previousAnimation = this.currentAnimation;

            }

            // Animate

            this.frametimer++;

            if (this.frametimer >= this.frameinterval) {
                this.frametimer = 0;
                this.frameX++;

                if (this.frameX >= this.currentAnimation.frames) {
                    this.frameX = 0;
                }
            } 
            
        }    



            

    }



    class Background {

        constructor(game) {
            this.game = game;

            this.skyimg = new Image();
            this.skyimg.src = "assets/Multi_Platformer_Tileset_Free/GrassLand/Background/GrassLand_Background_1.png"

            this.skyimg.onload = () => {
            console.log("Sky loaded");
            console.log(this.skyimg.naturalWidth, this.skyimg.naturalHeight);
            this.game.render(ctx);
            };

           
            this.gravel = new Image();
            this.gravel.src = "assets/Multi_Platformer_Tileset_Free/GrassLand/Background/GrassLand_Background_2.png"

            this.gravel.onload = () => {
            console.log("Sky loaded");
            console.log(this.gravel.naturalWidth, this.gravel.naturalHeight);
            this.game.render(ctx);
            };

            this.plain = new Image();
            this.plain.src = "assets/Multi_Platformer_Tileset_Free/GrassLand/Background/GrassLand_Background_3.png"

            this.plain.onload = () => {
            console.log("Sky loaded");
            console.log(this.plain.naturalWidth, this.plain.naturalHeight);
            this.game.render(ctx);
            };

            this.grass = new Image();
            this.grass.src = "assets/Multi_Platformer_Tileset_Free/GrassLand/Background/GrassLand_Background_4.png"

            this.grass.onload = () => {
            console.log("Sky loaded");
            console.log(this.grass.naturalWidth, this.grass.naturalHeight);
            this.game.render(ctx);
            };

            this.undergrass = new Image();
            this.undergrass.src = "assets/Multi_Platformer_Tileset_Free/GrassLand/Background/GrassLand_Background_5.png"

            this.undergrass.onload = () => {
            console.log("Sky loaded");
            console.log(this.undergrass.naturalWidth, this.undergrass.naturalHeight);
            this.game.render(ctx);
            };

            // Height


            this.gravelHeight = 650;
            this.plainHeight = 670;
            this.grassHeight = 680;
            this.undergrassHeight = 500;


            // Overlap 

            const Overlap = 40;

            // Position

            this.undergrassY = this.game.height - this.undergrassHeight;
            this.grassY = this.game.height - this.grassHeight + Overlap;
            this.plainY = this.game.height  - this.plainHeight + Overlap;
            this.gravelY = this.game.height - this.gravelHeight + Overlap;






        }

        draw(context) {



            context.drawImage(this.skyimg,0,0,this.game.width, this.game.height);



            const gravelTileWidth = this.gravel.naturalWidth || 416;
            for(let x = 0; x< this.game.width; x += gravelTileWidth) {
                context.drawImage(this.gravel, x, this.gravelY, gravelTileWidth,this.gravelHeight);
            }


            const plainTileWidth = this.plain.naturalWidth || 368;
            for(let x = 0; x< this.game.width; x += plainTileWidth) {
                context.drawImage(this.plain, x, this.plainY, plainTileWidth,this.plainHeight);
            }


            
            const grassTileWidth = this.grass.naturalWidth || 448;
            for(let x = 0; x< this.game.width; x += grassTileWidth) {
                context.drawImage(this.grass, x, this.grassY, grassTileWidth,this.grassHeight);
            }





            const undergrassTileWidth = this.undergrass.naturalWidth || 368;
            for(let x = 0; x< this.game.width; x += undergrassTileWidth) {
                context.drawImage(this.undergrass, x, this.undergrassY, undergrassTileWidth,this.undergrassHeight);
            }




        }


    }


    class Obstacles{
        constructor(game){

            this.game  = game;
            this.width = 120;
            this.height = 120;

            this.x = Math.random() * (this.game.width - this.width);
            this.y = Math.random() * (this.game.height - this.height);
         

        }

        draw(context){

           context.fillRect(this.x,this.y,this.width,this.height);

        }
    }


    class Platform{
        constructor(game,x,y,width,height,image = null){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            this.image =  image;
           

        }

        draw(context){

           if(this.image){
            context.drawImage(this.image,this.x,this.y,this.width,this.height);
           } else {
                context.fillStyle = 'red';
                context.fillRect(this.x,this.y,this.width,this.height);
           }



        }
    }      








    class Game {
        constructor(canvas){
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.background = new Background(this);
            this.Player = new Player(this);
            this.noofobstacles = 5;
            this.Obstacles = []
            this.Platforms = []

            this.Platforms.push(new Platform(this, 0,  600, 1200, 200,this.background.undergrass));
            this.Platforms.push(new Platform(this, 400,  360, 500, 10));




            this.keys = {
                ArrowUp : false,
                ArrowDown : false,
                ArrowLeft : false,
                ArrowRight : false,
                [" "] : false,
                w : false,
                a : false,
                s : false,
                d : false


            };

            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false
            }



            window.addEventListener("keyup", (e) => {
             if (this.keys.hasOwnProperty(e.key)) {
            this.keys[e.key] = false;
            }
            });

            window.addEventListener("keydown", (e) => {
                console.log(e.key);

                if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key] = true;
                }
            });




            

        }


        render(context) {
            this.background.draw(context);
            this.Platforms.forEach(platform => platform.draw((context)) );
            this.Player.update();
            this.Player.draw(context);
          //  this.Obstacles.forEach(obstacle => obstacle.draw(context));
            
            
        }


        Init(){

                let attempts = 0;

                while (
                    this.Obstacles.length < this.noofobstacles &&
                    attempts < 500
                ){

                    let testobstacles = new Obstacles(this);
                    let overlap = false;

                    this.Obstacles.forEach(obstacle => {

                        if (
                            testobstacles.x < obstacle.x + obstacle.width &&
                            testobstacles.x + testobstacles.width > obstacle.x &&
                            testobstacles.y < obstacle.y + obstacle.height &&
                            testobstacles.y + testobstacles.height > obstacle.y
                        ){
                            overlap = true;
                        }

                    });


                    if (!overlap){
                        this.Obstacles.push(testobstacles);
                    }


                    attempts++;

                } // closes while

            } // closes Init

            } // closes Game class
            
            
    



    const game = new Game(canvas);
    game.Init();
    console.log(game);





    function animate(){

        ctx.clearRect(0,0, canvas.width, canvas.height);

        game.render(ctx);
        requestAnimationFrame(animate);


    }


    animate()


   




    
    
});






