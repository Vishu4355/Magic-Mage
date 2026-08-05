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
            this.y = this.game.groundY - 150;
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
                prevTop >= platformBottom &&
                playerTop <= platformBottom &&
                playerRight > platformLeft &&
                playerLeft < platformRight
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
                 this.game.worldWidth - this.width)
            );

           

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

            // Moon

            this.moon = new Image();

            
            this.moon.src = "assets/blood_moon.png";
            this.moonSize = 180;

            // clouds

            this.clouds = new Image();
            this.clouds.src = "assets/Multi_Platformer_Tileset_Free/GrassLand/Background/GrassLand_Cloud_3.png";
            this.cloudSize = 100;

          
           
            this.back = new Image();
            this.back.src = "assets/Layers/back.png"
           

            this.middle = new Image();
            this.middle.src = "assets/Layers/middle.png"

            this.backheight = 400;
            this.middleheight = 380 ;

            this.moonParallax = 0.020;   // moon barely moves — very far away
            this.cloudParallax = 0.01;  // clouds move a bit more — closer than the moon

            

            

        }


        // sky

        drawSky(context){

                const gradient = context.createLinearGradient(
                    0,0,
                    0,this.game.height
                );

                gradient.addColorStop(0,"#0f021f");
                gradient.addColorStop(1,"#070000");

                context.fillStyle = gradient;
                context.fillRect(
                    0,
                    0,
                    this.game.width,
                    this.game.height
                );
        }



        drawMoon(context, cameraX) {

            const ScreenX = 200 - cameraX * this.moonParallax;

            context.drawImage(
                this.moon,
                ScreenX,   // screen X
                20,    // screen Y
                this.moonSize,
                this.moonSize
            );
        }



        drawclouds(context, cameraX) {
            this.game.clouds.forEach(cloud => {

                const screenX = ((cloud.x - cameraX * this.cloudParallax) % (this.game.width + cloud.width) 
                + this.game.width + cloud.width) % (this.game.width + cloud.width) - cloud.width;

                context.drawImage(
                    this.clouds,
                    screenX,
                    cloud.y,
                    cloud.width,
                    cloud.height
                );
            });
   }

        draw(context) {


             const backY = this.game.groundY - this.backheight ;
             const middleY = this.game.groundY - this.middleheight ;
          

            const backWidth = this.back.naturalWidth || 240;
            for(let x = 0; x< this.game.worldWidth; x += backWidth) {
                context.drawImage(this.back, x, backY, backWidth, this.backheight);
            }





            const middleWidth = this.middle.naturalWidth || 240;
            for(let x = 0; x< this.game.worldWidth; x += middleWidth) {
                context.drawImage(this.middle, x, middleY, middleWidth,this.middleheight);
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
        constructor(game,x,y,width,height,image = null, visible = true, tileY = false,fillColor = null){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            this.image =  image;
            this.visible = visible;
            this.tileY = tileY;
            this.fillColor = fillColor;

        }

        draw(context){

            if (!this.visible) return;

            if (this.image) {

                const tileWidth = this.image.naturalWidth || 160;
                const tileHeight = this.image.naturalHeight || this.height;

                if (this.tileY) {
                    for (let x = this.x; x < this.x + this.width; x += tileWidth) {
                        for (let y = this.y; y < this.y + this.height; y += tileHeight) {

                            // fill this exact tile cell first
                            if (this.fillColor) {
                                context.fillStyle = this.fillColor;
                                context.fillRect(x, y, tileWidth, tileHeight);
                            }

                            // then draw the tile art on top, same size/position
                            context.drawImage(this.image, x, y, tileWidth, tileHeight);
                        }
                    }
                    
                } else {

                    for (let x = this.x; x < this.x + this.width; x += tileWidth) {

                        if (this.fillColor) {
                            context.fillStyle = this.fillColor;
                            context.fillRect(x, this.y, tileWidth, this.height);
                        }

                        context.drawImage(this.image, x, this.y, tileWidth, this.height);
                    }
                }

            } else {

                context.fillStyle = 'brown';
                context.fillRect(this.x, this.y, this.width, this.height);

            }

        }

    }
    
    
    class Camera {
        constructor(game) {
            this.game = game;

            this.x = 0;
            this.y = 0;

            this.targetX = 0;
            
            // deadzone

            this.deadzoneWidth = 200;
            
        }


        update(){

                const deadzoneLeft  = this.x + this.game.width / 2 - this.deadzoneWidth / 2;
                const deadzoneRight = this.x + this.game.width / 2 + this.deadzoneWidth / 2;

                const playerCenterX = this.game.Player.x + this.game.Player.width / 2;

                let targetX = this.x;

                if (playerCenterX > deadzoneRight) {
                    targetX = this.x + (playerCenterX - deadzoneRight);
                } else if (playerCenterX < deadzoneLeft) {
                    targetX = this.x - (deadzoneLeft - playerCenterX);
                }

                this.x += (targetX - this.x) * 0.2; // smoothing factor, tweak to taste

                this.x = Math.max(0, Math.min(
                    this.x,
                    this.game.worldWidth - this.game.width
                ));

            }

        
            

            

        

    }    








    class Game {
        constructor(canvas){
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            // world Size
            this.worldWidth = 4000;
            this.worldHeight = 720;
            this.groundY = 620;
            this.cameraBottom = 720;

            
            this.background = new Background(this);

            // ground image

            this.groundImage = new Image();
            this.groundImage.src = "assets/Layers/tileset.png";

            this.backtile = new Image();
            this.backtile.src = "assets\\back-tileset-trimmed.png";

    
           
            
            this.Player = new Player(this);
            this.camera = new Camera(this);
            this.noofobstacles = 5;
            this.Obstacles = []
            this.Platforms = []
            this.groundDeco = []
            this.clouds = []



          //  this.Platforms.push(new Platform(this, 0,  this.groundY-12, this.worldWidth,this.height - this.groundY,this.backtile,true,true));

            this.Platforms.push(new Platform(this, 0,  this.groundY, this.worldWidth,this.height - this.groundY,null,false,false));

            this.groundDecoration2 = new Platform(this, 0, this.groundY  , this.worldWidth,  80 , this.backtile, true, true,"hsl(9, 100%, 50%)");
            this.groundDeco.push(this.groundDecoration2);


            this.groundDecoration = new Platform(this, 0, this.groundY , this.worldWidth, 140, this.groundImage, true, true);
          // this.groundDeco.push(this.groundDecoration);

            
            this.Platforms.push(new Platform(this, 400,  360, 500, 10));
            this.Platforms.push(new Platform(this, 1700, 450, 300, 20));
            this.Platforms.push(new Platform(this, 2500, 300, 300, 20));
            this.Platforms.push(new Platform(this,800,100,300,20));


            //clouds

            this.clouds = [
            { x: 100, y: 40, width: 140, height: 70 },
            { x: 300, y: 120, width: 180, height: 90 },
            { x: 700, y: 60, width: 160, height: 80 },
            { x: 950, y: 20, width: 150, height: 75 }
        ];




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
            this.Player.update();
            this.camera.update();
            this.background.drawSky(context);
            this.background.drawMoon(context , this.camera.x);
            this.background.drawclouds(context, this.camera.x);
            context.save();

            context.translate(-this.camera.x, -this.camera.y);

           

            this.background.draw(context);
            this.Platforms.forEach(platform => platform.draw((context)) );
            this.groundDeco.forEach(ground => ground.draw(context));
            this.Player.draw(context);
          //  this.Obstacles.forEach(obstacle => obstacle.draw(context));

            context.restore();
            
            
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






