var monkey, monkey_running, monkeyStopped
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score;
var ground1, ground2;
var PLAY = 0,
  END = 1;
var state;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyStopped = loadAnimation("sprite_8.png");
  

}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(100, 300, 0, 0);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stopped", monkeyStopped);
  monkey.scale = 0.15;
  monkey.setCollider("rectangle",0,0,180,550);
  //monkey.debug=true;

  ground = createSprite(200, 350, 400, 20);

  bananaGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
  state = PLAY;

}


function draw() {
  background("white");
  text("Survival Time: " + score, 140, 50);
  if (state == PLAY) {
    score += Math.round(getFrameRate() / 60);
    if (keyDown("space") && monkey.y > 290) {
      monkey.velocityY = -15;
    }
    
    if(monkey.isTouching(bananaGroup))
      bananaGroup.destroyEach();
    
    if(monkey.isTouching(obstacleGroup))
    {
      state=END;
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      monkey.changeAnimation("stopped",monkeyStopped);
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
    }    
    
    monkey.velocityY += 0.7;

    obstacles();
    bananas();
  }
    monkey.collide(ground);
  drawSprites();
}

function bananas() {
  if (frameCount % 80 == 0) {
    banana = createSprite(400, 0, 0, 0);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -(score/20.0+5);
    banana.scale = 0.15;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 == 0) {
    obstacle = createSprite(400, 315, 0, 0);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 100;
    obstacle.velocityX = -(score/20.0+5);
    obstacleGroup.add(obstacle);
  }
}