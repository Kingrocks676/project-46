//player stuff
var player;
var playerImg;
var playerWalkAnimationR,playerWalkAnimationL;
var playerRunAnimationR,playerRunAnimationL;
var playerAttackAnimationR,playerAttackAnimationL;
//stats
var stamina = 100;
var health = 100;
var armour = 50;
var healthbar,healthbaroutline;

//hitboxes
var hitboxUp,hitboxDown,hitboxRight,hitboxLeft,hitboxGroup;

//zombie
var zombie,zombieGroup;
var zombieImg;
var zombieWalkR,zombieWalkL;
var zombieDead;
var a,b;
//background
var bg;


//zombies stuff
waveNumber = 0;
var zombie;

function preload()
{
  playerImg = loadAnimation("./assets/Player/Woodcutter.png");

  playerWalkAnimationR = loadAnimation(
    "assets/Player/walk/walk-1.png", 
    "assets/Player/walk/walk-2.png", 
    "assets/Player/walk/walk-3.png",
    "assets/Player/walk/walk-4.png",
    "assets/Player/walk/walk-5.png");

  playerWalkAnimationL = loadAnimation(
  "assets/Player/walk/walk-6.png", 
  "assets/Player/walk/walk-7.png", 
  "assets/Player/walk/walk-8.png",
  "assets/Player/walk/walk-9.png",
  "assets/Player/walk/walk-10.png");

  playerRunAnimationR = loadAnimation(
    "assets/Player/run/run-1.png",
    "assets/Player/run/run-2.png",
    "assets/Player/run/run-3.png",
    "assets/Player/run/run-4.png",
    "assets/Player/run/run-5.png",
    "assets/Player/run/run-6.png",
  );
  playerRunAnimationL = loadAnimation(
    "assets/Player/run/run-7.png",
    "assets/Player/run/run-8.png",
    "assets/Player/run/run-9.png",
    "assets/Player/run/run-10.png",
    "assets/Player/run/run-11.png",
    "assets/Player/run/run-12.png"
  );

  playerAttackAnimR = loadAnimation(
    "assets/Player/attack/attack-1-1.png",
    "assets/Player/attack/attack-1-2.png",
    "assets/Player/attack/attack-1-3.png",
    "assets/Player/attack/attack-1-4.png",
    "assets/Player/attack/attack-1-5.png",
    "assets/Player/attack/attack-1-6.png"
  );
  playerAttackAnimL = loadAnimation(
    "assets/Player/attack/attack-1-7.png",
    "assets/Player/attack/attack-1-8.png",
    "assets/Player/attack/attack-1-9.png",
    "assets/Player/attack/attack-1-10.png",
    "assets/Player/attack/attack-1-11.png",
    "assets/Player/attack/attack-1-12.png"
  );
  
  bg = loadImage("assets/city.jpg");

  //zombie animations
    zombieImg = loadImage("assets/Zombies/idle.png");
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  
  player = createSprite(windowWidth/2, windowHeight/2,50,50);
  player.addAnimation('idle',playerImg);
  player.addAnimation('walkingR',playerWalkAnimationR);
  player.addAnimation('walkingL',playerWalkAnimationL);
  player.addAnimation('runR',playerRunAnimationR);
  player.addAnimation('runL',playerRunAnimationL);
  player.addAnimation('attack-1R',playerAttackAnimR);
  player.addAnimation('attack-1L',playerAttackAnimL);
  player.scale = 1.725;

  //hitboxes
  hitboxUp = createSprite(player.x, player.y ,200,1000);
  hitboxDown = createSprite(player.x, player.y,200,1000);
  hitboxRight = createSprite(player.x, player.y,1000,200);
  hitboxLeft = createSprite(player.x, player.y,1000,200);
  hitboxLeft.visible = false;
  hitboxRight.visible = false;
  hitboxUp.visible = false;
  hitboxDown.visible = false;
  hitboxGroup = new Group;
  hitboxGroup.add(hitboxUp);
  hitboxGroup.add(hitboxDown);
  hitboxGroup.add(hitboxRight);
  hitboxGroup.add(hitboxLeft);

  zombieGroup = new Group;

  healthbaroutline = createSprite(1300,50,310,35);
  healthbaroutline.shapeColor = 'black';
  healthbar = createSprite(1300,50,300,30);
  healthbar.shapeColor = "maroon";

  staminabaroutline = createSprite(1300,100,310,35);
  staminabaroutline.shapeColor = 'black';
  staminabar = createSprite(1300,100,300,30);
  staminabar.shapeColor = "gold";
}

function draw() 
{
  background(bg);
  //texts
  fill("white");
  textSize(32);
  text("Health: ",1020,60);
  text("Stamina: ",1000,110);

  hitboxUp.x = player.x;
  hitboxUp.y = player.y - 200;
  hitboxDown.x = player.x;
  hitboxDown.y = player.y + 200;
  hitboxRight.x = player.x + 200;
  hitboxRight.y = player.y;
  hitboxLeft.x = player.x - 200;
  hitboxLeft.y = player.y;

  if (!keyDown("W") || !keyDown("S") || !keyDown("A") || !keyDown("D") || !keyDown("SHIFT"))
  {
    player.changeAnimation('idle');
  }

  //player controls
  if (keyDown("W") || keyDown("UP_ARROW"))
  {
    player.changeAnimation('walkingR');
    player.y -= 5.25;
    if (keyDown("SHIFT") && stamina > 0)
    {
      player.changeAnimation('runR');
      player.y -= 6;
      stamina -= 1.5;
      staminabar.width -= 4.5;
      staminabar.x -= 2.25;
    }
  }
  if (keyDown("S") || keyDown("DOWN_ARROW"))
  {
    player.changeAnimation('walkingR');
    player.y += 5.25;
    if (keyDown("SHIFT") && stamina > 0)
    {
      player.changeAnimation('runR');
      player.y += 6;
      stamina -= 1.5;
      staminabar.width -= 4.5;
      staminabar.x -= 2.25;
    }
  }

  if (keyDown("A") || keyDown("LEFT_ARROW"))
  {
    player.changeAnimation('walkingL');
    player.x -= 5.25;
    if (keyDown("SHIFT") && stamina > 0)
    {
      player.changeAnimation('runL');
      player.x -= 6;
      stamina -= 1.5;
      staminabar.width -= 4.5;
      staminabar.x -= 2.25;
    }
  }
  if (keyDown("D") || keyDown("RIGHT_ARROW"))
  {
    player.changeAnimation('walkingR');
    player.x += 5.25;
    if (keyDown("SHIFT") && stamina > 0)
    {
      player.changeAnimation('runR');
      player.x += 6;
      stamina -= 1.5;
      staminabar.width -= 4.5;
      staminabar.x -= 2.25;
    }
  }

  if (mousePressedOver(hitboxLeft))
  {
    player.changeAnimation('attack-1L');
  }

  if (mousePressedOver(hitboxRight) || mousePressedOver(hitboxUp) || mousePressedOver(hitboxDown))
  {
    player.changeAnimation('attack-1R');
  }

  if (!keyDown("SHIFT") && stamina <= 100 && staminabar.width <= 300)
  {
    stamina += 0.5;
    staminabar.width += 1.5;
    staminabar.x += 0.75;
  }

  if (player.x <=20)
  {
    player.x = 20;
  }
  if (player.x > 1500)
  {
    player.x = 1500;
  }
  if (player.y < 200)
  {
    player.y = 200;
  }
  if (player.y > 680)
  {
    player.y = 680;
  }

  if (health > 0)
  {
    if (player.isTouching(zombieGroup))
    {
      if (frameCount % 10 === 0)
      {
        hit();
      }
    }
  }

  if (health <= 0)
  {
    console.log("ur ded lol");
    healthbar.visible = false;
  }
  if (stamina <= 0)
  {
    staminabar.visible = false;
  }
  if (stamina >= 0)
  {
    staminabar.visible = true;
  }

  if (frameCount % 30 === 0)
  {
    spawnZombie();
  }
  drawSprites();
}

function hit()
{
  health -= 10;
  healthbar.width -= 30;
  healthbar.x -= 15;
}

function spawnZombie()
{
  zombie = createSprite(Math.round(random(100,1400)),Math.round(random(200,650)));
  zombie.addAnimation('idle',zombieImg);
  zombie.scale = 0.17;
  zombieGroup.add(zombie);
}
