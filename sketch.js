var backImage,backgr;
var player, player_running,player1;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;

var heart,h1,h2,h3;
var health=3;
var PLAY=1
var END=0
var gameState=PLAY

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  player1 = loadImage("Monkey_01.png")
  heart = loadImage("heart.png")
  gameO = loadImage("gameover.png")
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,250,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(800,280,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;

  h1 = createSprite(50,50,10,10);
  h1.addImage(heart)
  h1.scale=0.1

  h2 = createSprite(100,50,10,10);
  h2.addImage(heart)
  h2.scale=0.1

  h3 = createSprite(150,50,10,10);
  h3.addImage(heart)
  h3.scale=0.1

  gameOver = createSprite(400,200,10,10)
  gameOver.addImage(gameO)
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
 if(gameState === PLAY)
{
 gameOver.visible=false

   
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  player.velocityY = player.velocityY + 0.8;


    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space")&& player.y >= 220) {
      player.velocityY = -12;
    }
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
     // score=score-2;
    }

    if(obstaclesGroup.isTouching(player)){
      gameState = END;
   } 
  }
  else if(gameState === END)
  {
    gameOver.visible=true
    player.velocityX=0
    player.visible=false

    obstaclesGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    backgr.velocityX=0;
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
  }

  drawSprites();
  life()

  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);

}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,290,40,10);
    banana.y = random(150,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,270,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function life()
{
  if(obstaclesGroup.isTouching(player))
  {
    health=health-1
  }
  if(health===3)
  {
    h1.visible=true;
    h2.visible=true;
    h3.visible=false;
  }
  if(health===2)
  {
    h1.visible=true;
    h2.visible=false;
  }
  if(health===1){
    h1.visible=false;
  }
  }
  
