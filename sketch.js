var backImage,backgr;
var player, player_running;
var ground,ground_img;
var fudG,obsG;
var END =0;
var PLAY =1;
var score;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
fudI = loadImage("banana.png");
obsI = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
 
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  fudG = new Group ();
  obsG = new Group ();
  score = 0;
}

function draw() { 
  background("olive");
   drawSprites();
  
 stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,50);
  if(gameState===PLAY){
   
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
 
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(fudG.isTouching(player)){
      fudG.destroyEach();
      score = score + 2;
      player.scale+= +0.1;
    }
    if(obsG.isTouching(player)){
      gameState = END;
    }

    mkObs();
  mkFud();

 
 
  }else if(gameState===END){
    backgr.velocityX=0;
    player.visible = false;
    fudG.destroyEach();
    obsG.destroyEach();
textSize(30);
fill(255);
text("Game Over",300,220);
  }
  
}

function mkFud(){
  if(frameCount % 80 === 0){
    var food = createSprite(600,250,40,10);
    food.y = random(120,200);
    food.scale=0.05;
    food.velocityX=-4;
    food.addImage(fudI);
    food.lifetime=300;
    player.depth = food.depth + 1;
  fudG.add(food);
  }
}

function mkObs(){
  if(frameCount % 300 === 0){
    var obs = createSprite(800,350,10,40);
    obs.addImage(obsI);
    obs.velocityX=-(4 + 2*score/100);
    obs.scale=0.2;
    obs.lifetime=300;
     obsG.add(obs);
  }
}
