console.log("magic.js loaded");




window.addEventListener('load', function(){
    const canvas = document.getElementById('mycan1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 730;

    class Player {

        constructor(game){
            this.game = game;
            this.Collisionx = this.game.width * 0.5;
            this.Collisiony = this.game.height * 0.5;
            this.CollisionRadius = 50;
            this.speedx = 0;
            this.speedy = 0;

        }
        draw(context){
            context.beginPath();
            context.arc(this.Collisionx,this.Collisiony,this.CollisionRadius,0, Math.PI*2);
            context.fill();
           
        }


        update(){




            this.speedx = 0;
            this.speedy = 0;

            const speed = 5;

            if (this.game.keys.ArrowRight || this.game.keys.d) {
                this.speedx = speed;
            }

            if (this.game.keys.ArrowLeft || this.game.keys.a) {
                this.speedx = -speed;
            }

            if (this.game.keys.ArrowUp || this.game.keys.w) {
                this.speedy = -speed;
            }

            if (this.game.keys.ArrowDown || this.game.keys.s) {
                this.speedy = speed;
            }

            this.Collisionx += this.speedx;
            this.Collisiony += this.speedy;


            this.Collisionx = Math.max(
            this.CollisionRadius,
            Math.min(this.Collisionx, this.game.width - this.CollisionRadius)
            );

            this.Collisiony = Math.max(
            this.CollisionRadius,
             Math.min(this.Collisiony, this.game.height - this.CollisionRadius)
            );

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



    class Game {
        constructor(canvas){
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.background = new Background(this);
            this.Player = new Player(this);
            this.keys = {
                ArrowUp : false,
                ArrowDown : false,
                ArrowLeft : false,
                ArrowRight : false,
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


            window.addEventListener("keydown", (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
            this.keys[e.key] = true;
             }
            });



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




            canvas.addEventListener('mousedown', (e) =>{
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = true;

            });

            
            canvas.addEventListener('mouseup', (e) =>{
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = false;

            });

            
            canvas.addEventListener('mousemove', (e) =>{


                if (this.mouse.pressed){


                     this.mouse.x = e.offsetX;
                     this.mouse.y = e.offsetY;

                }
               
                

            });

        }

        render(context) {
            this.background.draw(context);
            this.Player.update();
            this.Player.draw(context);
            
        }
    }

    const game = new Game(canvas);





    function animate(){

        ctx.clearRect(0,0, canvas.width, canvas.height);

        game.render(ctx);
        requestAnimationFrame(animate);


    }


    animate()


   




    
    
});






