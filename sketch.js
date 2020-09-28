var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var ob1,ob2,ob3,ob4,ob5,ob6;
var score=0;
var cgrp;
var ogrp;
var play=1;
var end =0;
var gameState=play;
var jump,die,checkpoint;
var gameover,overimage,reset,resetimage;
var birds,birdgrp,birdimage;
localStorage["high"]=0
 //var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
  
  overimage=loadImage("gameOver.png");
  resetimage=loadImage("restart.png");
  
  birdimage=loadAnimation("Dinobird1.png","dinobird.png");
  
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
    
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5);
  
  cgrp=new Group();
  ogrp=new Group();
  
  trex.addAnimation("trex",trex_collided);
  trex.setCollider("circle",0,0,50);
  
  gameover=createSprite(300,70,10,10);
  gameover.addImage("game",overimage);
  gameover.scale=0.8;
  gameover.visible=false;
  
  reset=createSprite(300,110,10,10);
  reset.addImage("restart",resetimage);
  reset.scale=0.4;
  reset.visible=false;
  
}

function draw() {
  background(180);
  
  if(gameState===play){
    
  if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -12;
    jump.play();
  }
    
   trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
 score=score+Math.round(getFrameRate()/60);
    
  spawnClouds();
  spawnobs();
    if(trex.isTouching(ogrp)){
    gameState=end;
      die.play();
    }

    if(score % 100 === 0  && score>0){
       checkpoint.play();
       }
    if(score>=800 && score<=1000){
      
    }
    ground.velocityX = -(6+2*score/100);
    
    trex.changeAnimation("running", trex_running);
    
    if(700<score && score<1000){
       new_level();     
      console.log("here");
    }
      
  }
  
  else if(gameState===end){
    trex.velocityY=0;
    ground.velocityX=0;
    cgrp.setVelocityXEach(0);
    ogrp.setVelocityXEach(0);
    cgrp.setLifetimeEach(-1);
    ogrp.setLifetimeEach(-1);
    trex.changeAnimation("trex",trex_collided);
    reset.visible=true;
    gameover.visible=true;
    if(mousePressedOver(reset)){
       restart();
    }
  }
  
  
  
 
  
  
  
  trex.collide(invisibleGround);
  text("Score: "+score,500,30)
  text("high_score: "+localStorage["high"],350,30)
  
  //spawn the clouds
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -(6+2*score/100);
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cgrp.add(cloud);
    
    }
}

function spawnobs() {
 if (frameCount % 100 === 0) {
    obstacle = createSprite(600,170,40,10);
   obstacle.setVelocity(-(6+2*score/100),0);
   var rand=Math.round(random(1,6));
   switch(rand){
     case 1: obstacle.addImage(ob1);
     break;  
     case 2: obstacle.addImage(ob2);
     break; 
     case 3: obstacle.addImage(ob3);
     break; 
     case 4: obstacle.addImage(ob4);
     break; 
     case 5: obstacle.addImage(ob5);
     break; 
     case 6: obstacle.addImage(ob6);
     break; 
     default: break;
   }
   obstacle.scale=0.55;
   obstacle.lifetime=150;
   
   ogrp.add(obstacle);
 }

}

function restart() {
gameState=play;
  reset.visible=false;
  gameover.visible=false;
  ogrp.destroyEach();
  cgrp.destroyEach();
  
  if(localStorage["high"]<score){
     
    localStorage["high"]=score
  }
  score=0;

}

function new_level() {
 background("black"); 
  bird();
}

function bird() {
  if (frameCount % 60 === 0) {
    birds = createSprite(600,140,40,10);
        birds.y = Math.round(random(100,140))
    birds.scale = 0.4;
    birds.velocityX = -(6+2*score/100);
    
    
    //assigning lifetime to the variable
    birds.lifetime = 200
    birds.addAnimation("brd",birdimage)
  }
  
}