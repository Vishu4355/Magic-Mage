console.log("magic.js loaded");

// async func for lv

async function loadLevel(path) {
    const response = await fetch(path);
    const data = await response.json();
    return data;
}


const ENEMY_TYPES = {

    soldier_fire: {
        health: 1,
        patrolSpeed: 1,
        damage: 1,
        attackPatterns: ["meleeSwing", "rangedAttack"],
        projectileType: "fireball",
        color: "orangered",

        element : "fire",

        spriteSrc: 'assets/Fire-haunt.png',
        frameCount: 5,
        spriteWidth: 112,   
        spriteHeight: 128,
        
         drawWidth: 64,     // <-- how big it appears on screen
         drawHeight: 74,     // <-- keeps the 112:128 aspect ratio roughly (64 * 128/112 ≈ 73)
         drawOffsetX: -16,   // <-- centers the wider sprite over the collision box
         drawOffsetY: -20    // <-- lifts sprite up so feet land at the right spot

        
    },

    soldier_water: {
        health: 1,
        patrolSpeed: 1,
        damage: 1,
        attackPatterns: ["meleeSwing", "rangedAttack"],
        projectileType: "waterRay",
        color: "dodgerblue",

        element : "water",

        spriteSrc: 'assets/meerman.png',
        frameCount: 2,
        spriteWidth: 27,   
        spriteHeight: 32,
        
         drawWidth: 64,     // <-- how big it appears on screen
         drawHeight: 75,     // <-- keeps the 112:128 aspect ratio roughly (64 * 128/112 ≈ 73)
         drawOffsetX: -16,   // <-- centers the wider sprite over the collision box
         drawOffsetY: -20    // <-- lifts sprite up so feet land at the right spot


    },

    soldier_poison: {
        health: 1,
        patrolSpeed: 0.8,
        damage: 1,
        attackPatterns: ["rangedAttack"], // no melee — pure ranged type
        projectileType: "poisonGlob",
        color: "limegreen",

        element : "earth",

        spriteSrc: 'assets/Treant.png',
        frameCount: 4,
        spriteWidth: 80,   
        spriteHeight: 84,
        
         drawWidth: 64,     // <-- how big it appears on screen
         drawHeight: 68,     // <-- keeps the 112:128 aspect ratio roughly (64 * 128/112 ≈ 73)
         drawOffsetX: -16,   // <-- centers the wider sprite over the collision box
         drawOffsetY: -20    // <-- lifts sprite up so feet land at the right spot
    }
};


Object.keys(ENEMY_TYPES).forEach(typeKey => {
    const config = ENEMY_TYPES[typeKey];
    if (!config.spriteSrc) return;

    const img = new Image();
    img.src = config.spriteSrc;
    config.spriteImage = img;
});




const PROJECTILE_TYPES = {

    fireball: {
        speed: 4,
        width: 16,
        height: 16,
        color: "orange",
        shape: "circle",
        gravity: 0,     // flies straight,
        drawY : -25,

        spriteSrc : 'assets/fire-ball.png',
        frameCount : 3,
        spriteWidth: 52,
        spriteHeight: 29,

        drawWidth : 52,
        drawHeight: 29

        
    },

    waterRay: {
        speed: 7,
        width: 24,
        height: 6,
        color: "dodgerblue",
        shape: "rect",  // a thin beam looks better as a rectangle than a circle
        gravity: 0
    },

    poisonGlob: {
        speed: 3,
        width: 14,
        height: 14,
        color: "limegreen",
        shape: "circle",
        gravity: 0.05,  // arcs downward like a lobbed blob

        drawY : 0,

        spriteSrc : 'assets/poison.png',
        frameCount : 2,
        spriteWidth: 16,
        spriteHeight: 16,

        drawWidth : 52,
        drawHeight: 29


    },

    firebolt : {

        speed: 6,
        width: 16,
        height: 16,
        color: "orange",
        shape: "circle",
        gravity: 0,     // flies straight,
        drawY : -25,

        spriteSrc : 'assets/fire-ball.png',
        frameCount : 3,
        spriteWidth: 52,
        spriteHeight: 29,

        drawWidth : 52,
        drawHeight: 29,


    },

    waterbolt : {

        speed: 6,
        width: 16,
        height: 16,
        color: "blue",
        shape: "rect",
        gravity: 0,     // flies straight,
        drawY : -25,

        spriteSrc : '',
        frameCount : 3,
        spriteWidth: 52,
        spriteHeight: 29,

        drawWidth : 52,
        drawHeight: 29



    },


    earthbolt : {

        speed: 4,
        width: 16,
        height: 16,
        color: "orange",
        shape: "circle",
        gravity: 0,     // flies straight,
        drawY : -25,

        spriteSrc : 'assets/fire-ball.png',
        frameCount : 3,
        spriteWidth: 52,
        spriteHeight: 29,

        drawWidth : 52,
        drawHeight: 29
    },


     skybolt : {

        speed: 7,
        width: 16,
        height: 16,
        color: "orange",
        shape: "circle",
        gravity: 0,     // flies straight,
        drawY : -25,

        spriteSrc : 'assets/fire-ball.png',
        frameCount : 3,
        spriteWidth: 52,
        spriteHeight: 29,

        drawWidth : 52,
        drawHeight: 29
    },


    icebolt : {

        speed: 7,
        width: 16,
        height: 16,
        color: "orange",
        projectileType: "icebolt",
        shape: "circle",
        gravity: 0,     // flies straight,
        drawY : -25,

        spriteSrc : 'assets/spritesheet.png',
        frameCount : 4,
        spriteWidth: 95,
        spriteHeight: 32,

        drawWidth : 95,
        drawHeight: 32
    }




};



Object.keys(PROJECTILE_TYPES).forEach(typeKey => {
    const config = PROJECTILE_TYPES[typeKey];
    if (!config.spriteSrc) return;

    const img = new Image();

    img.onload = () => {
        console.log(
            `${typeKey} loaded:`,
            img.naturalWidth,
            "x",
            img.naturalHeight
        );
    };

    img.onerror = () => {
        console.error(`${typeKey} FAILED TO LOAD:`, config.spriteSrc);
    };




    img.src = config.spriteSrc;
    config.spriteImage = img;
});



const EFFECT_TYPES = {

    inferno : {
        duration : 120,
        height : 180,
        width : 180,
        damage : 2,
        color : "orangered",

        spriteSrc : "assets/Fire-bomb.png",
        frameCount : 14,
        spriteWidth : 64,
        spriteHeight : 64,

        drawWidth : 180,
        drawHeight : 180
    },

    tidal : {
        duration : 120,
        height : 80,
        width : 80,
        damage : 2,
        color : "dodgerblue"
    },

    tempest : {
        duration : 120,
        height : 80,
        width : 80,
        damage : 2,
        color : "deepskyblue"
    },

    earthquake : {
        duration : 120,
        height : 80,
        width : 80,
        damage : 2,
        color : "saddlebrown"
    },



     firestorm : {
        duration : 120,
        height : 80,
        width : 80,
        damage : 2,
        color : "saddlebrown"
    },



     steam : {
        duration : 120,
        height : 80,
        width : 80,
        damage : 2,
        color : "saddlebrown"
    },


     magma: {
        duration : 120,
        height : 80,
        width : 80,
        damage : 2,
        color : "saddlebrown"
    },


     nature : {
        duration : 120,
        height : 80,
        width : 80,
        damage : 2,
        color : "saddlebrown"
    },

     sandstorm: {
        duration : 120,
        height : 80,
        width : 80,
        damage : 2,
        color : "saddlebrown"
    },













    


}

Object.keys(EFFECT_TYPES).forEach(typeKey => {
    const config = EFFECT_TYPES[typeKey];
    if (!config.spriteSrc) return;

    const img = new Image();
    img.src = config.spriteSrc;
    config.spriteImage = img;
});




const ATTACK_PATTERNS = {

    meleeSwing(enemy, player) {

        if (enemy.attackCooldown > 0) return;

        const playerLeft = player.x + player.hitboxOffsetX;
        const playerRight = playerLeft + player.hitboxWidth;
        const playerTop = player.y + player.hitboxOffsetY;
        const playerBottom = playerTop + player.hitboxHeight;

        const enemyLeft = enemy.x;
        const enemyRight = enemy.x + enemy.width;
        const enemyTop = enemy.y;
        const enemyBottom = enemy.y + enemy.height;

        const overlap =
            playerRight > enemyLeft &&
            playerLeft < enemyRight &&
            playerBottom > enemyTop &&
            playerTop < enemyBottom;

        if (overlap) {
            player.takeDamage(enemy.config.damage, `enemy-${enemy.typeKey}`);
            enemy.attackCooldown = 60;
        }
    },


    rangedAttack(enemy, player) {

        if (enemy.attackCooldown > 0) return;

        const distance = Math.abs(player.x - enemy.x);

        if (distance < 400 && distance > 100 && enemy.attackWindup === 0) {
            enemy.attackWindup = enemy.windupDuration;
        }

        if (enemy.attackWindup > 0) {
            enemy.attackWindup--;

            if (enemy.attackWindup === 0) {

                enemy.facing = player.x > enemy.x ? 1 : -1;

                const projectileType = enemy.config.projectileType;
                const speed = PROJECTILE_TYPES[projectileType].speed;
                const dY = PROJECTILE_TYPES[projectileType].drawY ?? 0;

                const drawWidth = enemy.config.drawWidth ?? enemy.width;
                const drawHeight = enemy.config.drawHeight ?? enemy.height;
                const offsetX = enemy.config.drawOffsetX ?? 0;
                const offsetY = enemy.config.drawOffsetY ?? 0;

                const visualLeft = enemy.x + offsetX;
                const visualRight = visualLeft + drawWidth;
                const visualCenterY = enemy.y + offsetY + drawHeight / 2;

                const spawnX = enemy.facing === 1 ? visualRight : visualLeft;
                const spawnY = visualCenterY + dY;

                enemy.game.Projectiles.push(
                    new Projectile(
                        enemy.game,
                        spawnX,
                        spawnY,
                        speed * enemy.facing,
                        projectileType === "poisonGlob" ? -4 : 0,
                        enemy.config.damage,
                        projectileType
                    )
                );

                enemy.attackCooldown = 120;
            }
        }
    }


   
};





const ELEMENTS = {
    fire: {
        strong: "sky",
        weak: "water",
        color: "orangered"
    },

    water: {
        strong: "fire",
        weak: "earth",
        color: "dodgerblue"
    },

    earth: {
        strong: "water",
        weak: "sky",
        color: "saddlebrown"
    },

    sky: {
        strong: "earth",
        weak: "fire",
        color: "deepskyblue"
    }
};


function getHitsNeeded(attackElement, enemyElement) {

    if (attackElement === enemyElement) return 1;
    if (ELEMENTS[enemyElement].weak === attackElement) return 1;
    return 2;
};



function executePlayerAttack(player , attackKey) {


    const attack = ATTACKS[attackKey];

    console.log("PLAYER ATTACK:", attackKey);


    if(!attack) return;

    if (attack.type === "projectile" ){

        firePlayerProjectile(player, attack, attackKey);

    }else if ((attack.type === "area" || attack.type === "wave" || attack.type === "ground") ){

        applyPlayerAreaAttack(player, attack , attackKey);
    }


}




function firePlayerProjectile(player, attack, attackKey) {

    const spawnX = player.facing === 1 ? player.x + player.width : player.x;
    const spawnY = player.y + player.height / 2;

    const projectileType = attack.projectileType;

    

    const projectile = new Projectile(
        player.game,
        spawnX,
        spawnY,
        6 * player.facing,
        0,
        attack.damage,
        projectileType
    );

    projectile.kill = attack.kill; // pass the kill property to the projectile


    projectile.element = attack.elements[0]; // for now, just use the first element

    player.game.PlayerProjectiles.push(projectile);
}




function applyPlayerAreaAttack(player, attack, attackKey) {

    const range = 180; // tune later


    const effectConfig = EFFECT_TYPES[attackKey];
    const effectWidth = effectConfig.width;
    const effectHeight = effectConfig.height;

    const spawnX = player.x + player.width / 2 - effectWidth / 2;
    const spawnY = player.y + player.height / 2 - effectHeight / 2;


    const attackLeft = player.x - range;
    const attackRight = player.x + player.width + range;
    const attackTop = player.y - range / 2;
    const attackBottom = player.y + player.height + range / 2;



    player.game.Effects.push(

    new areaEffect(
        player.game,
        spawnX,
        spawnY,
        effectWidth,
        effectHeight,
        attack.damage,
        attackKey
    ));





    player.game.Enemies.forEach(enemy => {

        if (!enemy.alive) return;

        const overlap =
            enemy.x + enemy.width > attackLeft &&
            enemy.x < attackRight &&
            enemy.y + enemy.height > attackTop &&
            enemy.y < attackBottom;

        if (overlap) {
            applyElementalDamage(enemy, attack);
        }
    });
}





function applyElementalDamage(enemy, attack) {

    const attackElement = attack.elements[0]; // for combos, decide later how multi-element interacts

    let attackpower = attack.kill;

    if (enemy.config.isBoss) {
        enemy.takeDamage(attack.damage);
        return;
    }

    let hitsNeeded = getHitsNeeded(attackElement, enemy.config.element);

    if(attack.kill === "ONE"){
        hitsNeeded = 1;
    }; 


    if (enemy.hitsTaken === undefined) enemy.hitsTaken = 0;
    enemy.hitsTaken++;

    if (enemy.hitsTaken >= hitsNeeded) {
        enemy.alive = false;
    }
}




const ATTACKS = {


    // player projectile




    // basic attack

    fireball: {
        elements: ["fire"],
        type: "projectile",
        damage: 2,
        effects: ["burn"],
        projectileType: "firebolt"
    },


     
    waterball: {
        elements: ["water"],
        type: "projectile",
        damage: 2,
        effects: ["push"],
        projectileType: "waterbolt"
    },


     
    rockball: {
        elements: ["earth"],
        type: "projectile",
        damage: 2,
        effects: ["heavypain"],
        projectileType: "earthbolt"
    },


     
    windball: {
        elements: ["sky"],
        type: "projectile",
        damage: 2,
        effects: ["knockback"],
        projectileType: "skybolt"
    },


    // double attacks


    
    inferno: {
        elements: ["fire", "fire"],
        type: "area",
        damage: 3,
        effects: ["heavypain" ,"burn"],
        kill: "ONE"  // special property to indicate this attack kills in one hit
        
    },

    
    tidal: {
        elements: ["water", "water"],
        type: "wave",
        damage: 3,
        effects: ["bigpush"],
        
    },

    
    earthquake: {
        elements: ["earth", "earth"],
        type: "ground",
        damage: 3,
        effects: ["freeze"],
       
    },


    tempest: {
        elements: ["sky", "sky"],
        type: "area",
        damage: 5,
        effects: ["Multiple hits"],
        
    },


    // combination attack



    ice: {
        elements: ["water", "sky"],
        type: "projectile",
        damage: 3,
        effects: ["freeze"],
        projectileType: "icebolt",
        kill: "ONE"  // special property to indicate this attack kills in one hit
    },



    firestorm: {
        elements: ["fire", "sky"],
        type: "area",
        damage: 5,
        effects: ["burn", "knockback"]
    },


    
   

     
    steam: {
        elements: ["fire", "water"],
        type: "area",
        damage: 5,
        effects: ["explosion","knockback"]
    },

     
    magma: {
        elements: ["fire", "earth"],
        type: "area",
        damage: 5,
        effects: ["explosion","burn"]
    },

     
    nature: {
        elements: ["earth", "water"],
        type: "area",
        damage: 5,
        effects: ["root"]
    },


     
    sandstorm: {
        elements: ["earth", "sky"],
        type: "area",
        damage: 5,
        effects: ["slow","pain"]
    },

    // space magic


    wrap: {
        elements: ["space"],
        type: "tele",
        damage: 2,
        effects: ["teleport"]
    },

    blackhole: {
        elements: ["space"],
        type: "gravity",
        damage: 2,
        effects: ["pull enemies"]
    },

    gravitycrush: {
        elements: ["sopace"],
        type: "meteor",
        damage: 2,
        effects: ["crush"]
    },


    CosmicCollapse: {
        elements: ["space"],
        type: "ultimate",
        damage: 2,
        effects: ["spacetear"]
    },

    
};


function getsingleAttack(element) {

    if(!element) return null;

    const attackkey = Object.keys(ATTACKS).find(key => {

        const attack = ATTACKS[key];

        if(!attack.elements || attack.elements.length !== 1) {

            return false;
        }

        return (attack.elements[0] === element);

    });


    return attackkey || null

};


    









function getAttackfromSlots(slotA, slotB) {

    if(!slotA || !slotB) return null;

    const attackKey = Object.keys(ATTACKS).find(key => {

        const attack = ATTACKS[key];

        if(!attack.elements || attack.elements.length !== 2) {
            return false;
        }

        const [element1, element2] = attack.elements;

        return (
            (element1 === slotA && element2 === slotB) ||
            (element1 === slotB && element2 === slotA)
        )
    });

    return attackKey || null;

}







 class Projectile {

        constructor(game, x, y, velocityX, velocityY, damage, typeKey) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
            this.damage = damage;
            this.typeKey = typeKey;

            this.config = PROJECTILE_TYPES[typeKey];

            this.width = this.config.width;
            this.height = this.config.height;

            this.alive = true;
            this.lifespan = 180;



            // Animation

            this.frameX = 0;
            this.frametimer = 0;
            this.frameinterval = 5;
        }

        update() {

            if (!this.alive) return;

            this.velocityY += this.config.gravity;

            this.x += this.velocityX;
            this.y += this.velocityY;

            this.checkWallCollision();

            
            this.frametimer++;

            if (this.frametimer >= this.frameinterval) {
                this.frametimer = 0;
                this.frameX++;
                if (this.frameX >= this.config.frameCount) {
                    this.frameX = 0;
                }
            }

            this.lifespan--;
            if (this.lifespan <= 0) {
                this.alive = false;
            }

            if (this.x < 0 || this.x > this.game.worldWidth) {
                this.alive = false;
            }
        }

        draw(context) {



            const sw = this.config.spriteWidth;
            const sh = this.config.spriteHeight;

            const dw = this.config.drawWidth ?? this.width;
            const dh = this.config.drawHeight ?? this.height;

            const drawX = this.x + this.width / 2 - dw / 2;
            const drawY = this.y + this.height / 2 - dh / 2;

           // const dy = this.config.drawY ?? 0;


            if (!this.alive) return;

            if ( this.config.spriteImage && this.config.spriteImage.complete)  {

                context.save();


                if (this.velocityX < 0) {

                        context.scale(-1, 1);

                        context.drawImage(
                            this.config.spriteImage,
                            this.frameX * sw,
                            0,
                            sw,
                            sh,
                            -(drawX + dw),
                            drawY,
                            dw,
                            dh
                        );}
                
                else {
                        context.drawImage(
                        this.config.spriteImage,
                        this.frameX * sw, 0, sw, sh,
                        drawX, drawY, dw, dh);}

                context.restore();}          

            else {
                context.fillStyle = this.config.color;

                context.fillRect(this.x, this.y, this.width, this.height);
            }

            context.strokeStyle = "red";
            context.strokeRect(
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

        checkCollision(player) {

            if (!this.alive) return;

            const playerLeft = player.x + player.hitboxOffsetX;
            const playerRight = playerLeft + player.hitboxWidth;
            const playerTop = player.y + player.hitboxOffsetY;
            const playerBottom = playerTop + player.hitboxHeight;

            const overlap =
                playerRight > this.x &&
                playerLeft < this.x + this.width &&
                playerBottom > this.y &&
                playerTop < this.y + this.height;

            if (overlap) {
                player.takeDamage(this.damage, `projectile-${this.typeKey}`);
                this.alive = false;
            }
        }


        checkWallCollision() {

            this.game.Platforms.forEach(platform => {

                const overlap =
                    this.x + this.width > platform.x &&
                    this.x < platform.x + platform.width &&
                    this.y + this.height > platform.y &&
                    this.y < platform.y + platform.height;

                if (overlap) {
                    this.alive = false;
                     console.log(`${this.typeKey} destroyed by wall at`, this.x.toFixed(0), this.y.toFixed(0));
                }
            });
        }



    }



class areaEffect {

    constructor(game, x, y, width, height, damage, typeKey) {

        this.game = game;
        this.x = x;
        this.y = y;

        this.config = EFFECT_TYPES[typeKey];

        this.width = width ?? this.config.width;
        this.height = height ?? this.config.height;
        this.damage = damage ?? this.config.damage;

        this.typeKey = typeKey;
        this.alive = true;
        this.duration = this.config.duration;

        
        // Animation

        this.frameX = 0;
        this.frametimer = 0;
        this.frameinterval = 8;


    }



    update() {

        if (!this.alive) return;


        this.frametimer++;

            if (this.frametimer >= this.frameinterval) {
                this.frametimer = 0;
                this.frameX++;
                if (this.frameX >= this.config.frameCount) {
                    this.frameX = 0;
                }
            }

        this.duration--;
        if (this.duration <= 0) {
            this.alive = false;
      }




    }

    draw(context) {

        const sw = this.config.spriteWidth;
        const sh = this.config.spriteHeight;

        const dw = this.config.drawWidth ?? this.width;
        const dh = this.config.drawHeight ?? this.height;

        if (!this.alive) return;

        if (this.config.spriteImage && this.config.spriteImage.complete) {
            context.save();

            const drawX = this.x;
            const drawY = this.y;

            context.drawImage(
                this.config.spriteImage,
                this.frameX * sw, 0, sw, sh,
                drawX, drawY, dw, dh
            );

            context.restore();
        } else {
            context.fillStyle = this.config.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}


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

            // Player Health

            this.maxHearts = 30;
            this.currentHearts = 30;

            this.invincible = false;
            this.invincibleTimer = 0;
            this.invincibleDuration = 180;


            // Hitbox (physics body)

            this.hitboxWidth = 44;
            this.hitboxHeight = 60;

            this.hitboxOffsetX = 10;
            this.hitboxOffsetY = 4;
            
            this.x = this.game.width * 0.5 - 200;
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



            // Elemental magic
            this.slotA = "sky";   // will start null until unlocked — hardcode for testing now
            this.slotB = "water";
            this.attackCooldown = 0;

            this.areacooldown = 0;


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


            if (this.invincible && Math.floor(this.invincibleTimer / 5) % 2 === 0) {
                context.globalAlpha = 0.3;
            }

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


        drawHearts(context) {

            const heartSize = 24;
            const padding = 6;
            const startX = 20;
            const startY = 20;

            for (let i = 0; i < this.maxHearts; i++) {

                const x = startX + i * (heartSize + padding);

                context.fillStyle = i < this.currentHearts ? "red" : "gray";
                context.fillRect(x, startY, heartSize, heartSize);
            }
        }


        die() {

            console.log("Player died!");
            // for now, just reset hearts and teleport back to spawn
            this.currentHearts = this.maxHearts;
            this.game.score = 0;
            this.x = this.game.playerStartX ?? this.game.width * 0.5 -200;
            this.y = this.game.playerStartY ?? this.game.groundY - 150;

             this.game.Collectibles.forEach(item => {
                item.collected = false;
            });
        }


        takeDamage(amount =1 , source = 'unknown'){

            if(this.invincible) return;

            console.log("Took damage from:", source); // TEMP DEBUG


            this.currentHearts -= amount;

            if (this.currentHearts < 0){

                this.currentHearts= 0;
            }

            this.invincible = true;
            this.invincibleTimer = this.invincibleDuration;

            if (this.currentHearts <= 0){
                this.die()
            }


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


            if (this.attackCooldown > 0) {
                this.attackCooldown--;
            }

            if (this.areacooldown > 0) {
                this.areacooldown--;
            }

            if (this.game.keys.e && this.attackCooldown === 0 && this.slotA) {
                const attackKey = getsingleAttack(this.slotA);
                executePlayerAttack(this, attackKey);
                this.attackCooldown = 50;
            }

            if (this.game.keys.f && this.attackCooldown === 0 && this.slotB) {
                const attackKey = getsingleAttack(this.slotB);
                executePlayerAttack(this, attackKey);
                this.attackCooldown = 50;
            }

            if (this.game.keys.g && this.areacooldown === 0 && this.slotA && this.slotB) {
                const attackKey = getAttackfromSlots(this.slotA, this.slotB);
                executePlayerAttack(this, attackKey);
                this.areacooldown = 500;
            }


           if (this.invincible) {

                this.invincibleTimer--;
                if (this.invincibleTimer <= 0) {
                    this.invincible = false;
                }
            }

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


    class Hazard{
        constructor(game,x,y,width,height,type){

            this.game = game;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.width = width;
            this.type = type;

            this.spikeimg = new Image();
            this.spikeimg.src = "assets/small_metal_spike.png";
        }


        draw(context) {

            if (this.type === "spikes") {

                if (!this.spikeimg.complete) return;

                const spikeWidth = 36;
                const spikeHeight = 36;

                for (
                    let x = this.x;
                    x < this.x + this.width;
                    x += spikeWidth
                ) {
                    context.drawImage(
                        this.spikeimg,
                        x,
                        this.y,
                        Math.min(spikeWidth, this.x + this.width - x),
                        spikeHeight
                    );
                }

            } else {

                // Lava
                context.fillStyle = "orangered";
                context.fillRect(
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
        }


        checkCollision(player) {

        const playerLeft = player.x + player.hitboxOffsetX;
        const playerRight = playerLeft + player.hitboxWidth;
        const playerTop = player.y + player.hitboxOffsetY;
        const playerBottom = playerTop + player.hitboxHeight;

        const overlap =
            playerRight > this.x &&
            playerLeft < this.x + this.width &&
            playerBottom > this.y &&
            playerTop < this.y + this.height;

        if (overlap) {
           if (overlap) {

                player.takeDamage(1, `hazard-${this.type}`);
}
        }

        }    

    }


    class Collectible {

        constructor(game, x, y, width, height) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.collected = false;

            // sprite
            this.ruby = new Image();
            this.ruby.src = "assets/gem-ruby-cut.webp"

        }

        draw(context) {
            if (this.collected) return;

            if(this.ruby.complete){
                context.drawImage(this.ruby,this.x,this.y,this.width,this.height);
            }
        }

        checkCollision(player) {

            if (this.collected) return;

            const playerLeft = player.x + player.hitboxOffsetX;
            const playerRight = playerLeft + player.hitboxWidth;
            const playerTop = player.y + player.hitboxOffsetY;
            const playerBottom = playerTop + player.hitboxHeight;

            const overlap =
                playerRight > this.x &&
                playerLeft < this.x + this.width &&
                playerBottom > this.y &&
                playerTop < this.y + this.height;

            if (overlap) {
                this.collected = true;
                this.game.score += 1;
                
            }
        }
    }



    class Enemy {

        constructor(game, x, y, width, height, typeKey) {

            this.game = game;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.typeKey = typeKey;

            this.config = ENEMY_TYPES[typeKey];

            this.health = this.config.health;
            this.maxHealth = this.config.health;
            this.alive = true;

            this.state = "patrol";

            this.velocityX = this.config.patrolSpeed;
            this.velocityY = 0;
            this.gravity = 0.5;
            this.onGround = false;

            this.startX = x;
            this.patrolRange = 100;

            this.attackCooldown = 0;

            this.attackWindup = 0;         
            this.windupDuration = 30;    

            this.facing = 1;



            // animation
            this.frameX = 0;
            this.frametimer = 0;
            this.frameinterval = 8;




        }


        updatePatrol() {

            if (this.x > this.startX + this.patrolRange || this.x < this.startX - this.patrolRange) {
                this.velocityX *= -1;
            }
        }


        checkPlatformCollision() {

            this.onGround = false;

            this.game.Platforms.forEach(platform => {

                const enemyTop = this.y;
                const enemyBottom = this.y + this.height;
                const enemyLeft = this.x;
                const enemyRight = this.x + this.width;

                const previousBottom = enemyBottom - this.velocityY;
                const prevRight = enemyRight - this.velocityX;
                const prevLeft = enemyLeft - this.velocityX;

                const platformTop = platform.y;
                const platformLeft = platform.x;
                const platformRight = platform.x + platform.width;
                const platformBottom = platform.y + platform.height;

                if (
                    previousBottom <= platformTop &&
                    enemyBottom >= platformTop &&
                    enemyRight > platformLeft &&
                    enemyLeft < platformRight &&
                    this.velocityY > 0
                ) {
                    this.y = platformTop - this.height;
                    this.velocityY = 0;
                    this.onGround = true;
                }

                if (
                    prevRight <= platformLeft &&
                    enemyRight >= platformLeft &&
                    enemyBottom > platformTop &&
                    enemyTop < platformBottom
                ) {
                    this.x = platformLeft - this.width;
                    this.velocityX *= -1;
                }

                if (
                    prevLeft >= platformRight &&
                    enemyLeft <= platformRight &&
                    enemyBottom > platformTop &&
                    enemyTop < platformBottom
                ) {
                    this.x = platformRight;
                    this.velocityX *= -1;
                }
            });
        }


        update() {

            if (!this.alive) return;

            if (this.attackCooldown > 0) {
                this.attackCooldown--;
            }

            if (this.state === "patrol") {
                this.updatePatrol();
            }

             if (this.velocityX > 0.1) {
                    this.facing = 1;
                } else if (this.velocityX < -0.1) {
                    this.facing = -1;
                }

            this.config.attackPatterns.forEach(patternName => {
                ATTACK_PATTERNS[patternName](this, this.game.Player);
            });

            this.velocityY += this.gravity;
            this.x += this.velocityX;
            this.y += this.velocityY;

            this.checkPlatformCollision();


            this.frametimer++;

            if (this.frametimer >= this.frameinterval) {
                this.frametimer = 0;
                this.frameX++;
                if (this.frameX >= this.config.frameCount) {
                    this.frameX = 0;
                }
            }
        }


        draw(context) {

            if (!this.alive) return;

            if (!this.config.spriteImage || !this.config.spriteImage.complete) {
                context.fillStyle = this.config.color;
                context.fillRect(this.x, this.y, this.width, this.height);
                return;
            }

            const sw = this.config.spriteWidth;
            const sh = this.config.spriteHeight;
            const dw = this.config.drawWidth ?? this.width;
            const dh = this.config.drawHeight ?? this.height;
            const offsetX = this.config.drawOffsetX ?? 0;
            const offsetY = this.config.drawOffsetY ?? 0;

            let bobOffset = 0;
            if (Math.abs(this.velocityX) > 0.1) {
                bobOffset = Math.sin(this.frametimer * 0.5) * 3;
            }

            context.save();

            if (this.attackWindup > 0 && Math.floor(this.attackWindup / 5) % 2 === 0) {
                context.globalAlpha = 0.5;
            }

            const drawX = this.x + offsetX;
            const drawY = this.y + offsetY + bobOffset;

            if (this.facing === -1) {
                context.scale(-1, 1);
                context.drawImage(
                    this.config.spriteImage,
                    this.frameX * sw, 0, sw, sh,
                    -(drawX + dw), drawY, dw, dh
                );
            } else {
                context.drawImage(
                    this.config.spriteImage,
                    this.frameX * sw, 0, sw, sh,
                    drawX, drawY, dw, dh
                );
            }

            context.restore();
        }



        takeDamage(amount = 1) {

            if (!this.alive) return;

            this.health -= amount;

            if (this.health <= 0) {
                this.health = 0;
                this.alive = false;
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
        constructor(canvas, leveldata){
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.leveldata = leveldata;
            // world Size
            this.worldWidth = leveldata.width * leveldata.tilewidth;
            this.worldHeight = leveldata.height * leveldata.tileheight;
            this.groundY = 620;
            this.cameraBottom = 720;

            
            this.background = new Background(this);

            // ground image

            this.groundImage = new Image();
            this.groundImage.src = "assets/Layers/tileset.png";

            this.backtile = new Image();
            this.backtile.src = "assets\\back-tileset-trimmed.png";

            this.tilesetImage = new Image();
            this.tilesetImage.src = "assets/tiles.png";
            this.tilesetImage.onload = () => console.log("Tileset loaded!", this.tilesetImage.width, this.tilesetImage.height);
            this.tilesetImage.onerror = () => console.log("Tileset FAILED to load — check the path");

    
           
            
            this.Player = new Player(this);
            this.camera = new Camera(this);
            this.noofobstacles = 5;
            this.Obstacles = []
            this.Platforms = []
            this.groundDeco = []
            this.clouds = []
            
            this.score =0;
            // platform 
            this.loadPlatformsFromLevel();

            // hazards

            this.Hazards = [];
            this.loadHazardsFromLevel();

            // collectibles


            this.Collectibles = [];
            this.loadCollectiblesFromLevel();

            // enemies

            this.Enemies = [];
            this.loadEnemiesFromLevel();

            // projectiles

            this.Projectiles = [];

            this.PlayerProjectiles = [];

            this.Effects = [];




          //  this.Platforms.push(new Platform(this, 0,  this.groundY-12, this.worldWidth,this.height - this.groundY,this.backtile,true,true));

            this.Platforms.push(new Platform(this, 0,  this.groundY, this.worldWidth,this.height - this.groundY,null,false,false));

            this.groundDecoration2 = new Platform(this, 0, this.groundY  , this.worldWidth,  80 , this.backtile, true, true,"hsl(9, 100%, 50%)");
            this.groundDeco.push(this.groundDecoration2);


            this.groundDecoration = new Platform(this, 0, this.groundY , this.worldWidth, 140, this.groundImage, true, true);
          // this.groundDeco.push(this.groundDecoration);

            
            

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
                d : false,
                e : false,
                f : false,
                g : false


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


       drawTileLayer(context) {

            const tileset = this.leveldata.tilesets[0];
            const tileLayer = this.leveldata.layers.find(l => l.name === "Tile Layer 1");

            if (!tileset || !tileLayer || !this.tilesetImage.complete) return;

            const tw = this.leveldata.tilewidth;
            const th = this.leveldata.tileheight;
            const columns = tileset.columns;
            const firstgid = tileset.firstgid;
            const margin = tileset.margin || 0;
            const spacing = tileset.spacing || 0;

            const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
            const FLIPPED_VERTICALLY_FLAG   = 0x40000000;
            const FLIPPED_DIAGONALLY_FLAG   = 0x20000000;

            for (let row = 0; row < tileLayer.height; row++) {
                for (let col = 0; col < tileLayer.width; col++) {

                    const index = row * tileLayer.width + col;
                    const gid = tileLayer.data[index];

                    if (gid === 0) continue;

                    // strip out flip flags to get the real tile id
                    const realGid = gid & ~(FLIPPED_HORIZONTALLY_FLAG | FLIPPED_VERTICALLY_FLAG | FLIPPED_DIAGONALLY_FLAG);

                    const tileIndex = realGid - firstgid;

                    const sx = margin + (tileIndex % columns) * (tw + spacing);
                    const sy = margin + Math.floor(tileIndex / columns) * (th + spacing);

                    context.drawImage(
                        this.tilesetImage,
                        sx, sy, tw, th,
                        col * tw, row * th, tw, th
                    );
                }
            }
        }


        

        drawScore(context) {
            context.font = "bold 24px sans-serif";

            context.lineWidth = 2;
            context.strokeStyle = "black";
            context.strokeText(`Score: ${this.score}`, 20, 150);   // outline first

            context.fillStyle = "red";
            context.fillText(`Score: ${this.score}`, 20, 150);     // then fill on top
        }



        updatePlayerProjectiles() {

            this.PlayerProjectiles.forEach(p => {
                p.update();

               

                // Check collision with enemies
                this.Enemies.forEach(enemy => {
                    if (!enemy.alive || !p.alive) return;

                    const overlap =
                        p.x + p.width > enemy.x &&
                        p.x < enemy.x + enemy.width &&
                        p.y + p.height > enemy.y &&
                        p.y < enemy.y + enemy.height;

                    if (overlap) {

                       applyElementalDamage(enemy, { elements: [p.element], damage: p.damage , kill: p.kill });
                        // Projectile disappears after hitting an enemy
                        p.alive = false;
                    }
                });

                
            });

            // Remove dead projectiles
            this.PlayerProjectiles = this.PlayerProjectiles.filter(
                p => p.alive
            );
        }
       
        


        loadPlatformsFromLevel() {

            const collisionLayer = this.leveldata.layers.find(
                layer => layer.name === "collision"
            );

            if (!collisionLayer) return;

            collisionLayer.objects.forEach(obj => {
                this.Platforms.push(
                    new Platform(this, obj.x, obj.y, obj.width, obj.height)
                );
            });
        }


        loadHazardsFromLevel() {

            const lavaLayer = this.leveldata.layers.find(l => l.name === "lava");
            lavaLayer?.objects.forEach(obj => {
                this.Hazards.push(
                    new Hazard(this, obj.x, obj.y, obj.width, obj.height, "lava")
                );
            });

            const spikesLayer = this.leveldata.layers.find(l => l.name === "spikes");
            spikesLayer?.objects.forEach(obj => {
                this.Hazards.push(
                    new Hazard(this, obj.x, obj.y, obj.width, obj.height, "spikes")
                );
            });
        }


        loadCollectiblesFromLevel() {

            const collectLayer = this.leveldata.layers.find(l => l.name === "collect");
            if (!collectLayer) return;

            collectLayer.objects.forEach(obj => {
                this.Collectibles.push(
                    new Collectible(this, obj.x, obj.y, obj.width, obj.height)
                );
            });
        }


        loadEnemiesFromLevel() {

            const soldierLayer = this.leveldata.layers.find(l => l.name === "soldiers");
            if (!soldierLayer) return;

            const types = ["soldier_fire", "soldier_water", "soldier_poison"];

            soldierLayer.objects.forEach((obj, index) => {
                const typeKey = types[index % types.length]; // cycles through types for quick testing
                this.Enemies.push(
                    new Enemy(this, obj.x, obj.y, obj.width, obj.height, typeKey)
                );
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
            this.drawTileLayer(context);
           // this.Platforms.forEach(platform => platform.draw((context)) );
            this.groundDeco.forEach(ground => ground.draw(context));

            this.Hazards.forEach(hazard => hazard.checkCollision(this.Player));
            this.Hazards.forEach(hazard => hazard.draw(context));

            this.Collectibles.forEach(item => item.checkCollision(this.Player));
            this.Collectibles.forEach(item => item.draw(context));

            this.Enemies.forEach(enemy => enemy.update());
            this.Enemies.forEach(enemy => enemy.draw(context));


            this.Projectiles.forEach(p => p.update());                          
            this.Projectiles.forEach(p => p.checkCollision(this.Player));       
            this.Projectiles.forEach(p => p.draw(context));

            this.Projectiles = this.Projectiles.filter(p => p.alive);  
            
            this.updatePlayerProjectiles();
            this.PlayerProjectiles.forEach(p => p.draw(context));

            this.Effects.forEach(fx => fx.update());
            this.Effects.forEach(fx => fx.draw(context));
            this.Effects = this.Effects.filter(fx => fx.alive);
           
            this.Player.draw(context);
          //  this.Obstacles.forEach(obstacle => obstacle.draw(context));

            context.restore();

            this.Player.drawHearts(context);
            this.drawScore(context);
            
            
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
            
            
    



    let game;

    loadLevel("assets/level 1 mm.tmj").then(levelData => {
        game = new Game(canvas, levelData);
        game.Init();
        console.log(game);
        animate();
    });

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }


    


   




    
    
});






