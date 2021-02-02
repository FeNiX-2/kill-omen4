
var Phoenix,Phoenix_running
var coin,coinImage, omen, omenImage
var FoodGroup, omenGroup
var score;
var survivalTime=0;
var ground;
var obstaceeeeeee;
var PLAY;
var END;
var gameState=PLAY;
var chances;
var score=0;
var sound_wav
var jettflying;
var jettdead_image;
var cloud,cloud_image,cloudGroup;

function preload(){
  
  
  Phoenix_running =loadImage("image/phoenix.png");
  chances_he=loadImage("image/chances.png")
  coinImage = loadImage("image/coin.png");
  obstaceImage = loadImage("image/omen.png");
  backgrounds_image= loadImage("image/background.jpg")
  sound_wav=loadSound("image/SOUND.wav")
  jettflying_image=loadImage("image/jett flying.png")
 jettdead_image=loadImage("image/Jett dead.png")
 cloud_image=loadImage("image/cloud.png")
}



function setup() {
  createCanvas(900,700);
  
  
  background2=createSprite(width/2,height/2);
  background2.addImage("backgrounds_image",backgrounds_image)
  background2.scale=2.5
  Phoenix = createSprite(80,350,10,10);
  Phoenix.addAnimation("Phoenix",Phoenix_running);
  Phoenix.addAnimation("jett",jettflying_image);
  Phoenix.addAnimation("jettdead",jettdead_image)
  Phoenix.scale = 0.2;
  
  ground = createSprite(width/2,650,width,20);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.visible=false;
  console.log(ground.x)
  
  score = 0;
  survialTime = 0;
  FoodGroup = createGroup();
  omenGroup = createGroup();
  cloudGroup=createGroup();
}


function draw() {
  
  background("yellow")
  
  Phoenix.collide(ground);
  
  
  Phoenix.collide(ground);
  
  if(gameState ===PLAY){
    if(FoodGroup.isTouching(Phoenix)) {
      FoodGroup.destroyEach();
      sound_wav.play();
      score = score+1;
    }
     if (ground.x<800){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& Phoenix.y >= 450) {
        Phoenix.velocityY = -15;
        Phoenix.changeAnimation("jett",jettflying_image)
        
    }
    if(Phoenix .y>480){
      Phoenix.changeImage("Phoenix",Phoenix_running)
    }
    Phoenix.velocityY=Phoenix.velocityY+0.4 
    
    if(keyDown("right")){
      Phoenix.x+=5
    }
    if(keyDown("left")){
      Phoenix.x-=5
    }
    if(Phoenix.isTouching(omenGroup)){
      Phoenix.changeAnimation("jettdead",jettdead_image)
         gameState = END;
         Phoenix.y+=50
      
    }
    
  }

  
  
  
 food();
  omens();
  drawSprites();
  FoodGroup.lifetime=100;
omens.lifetime=100;
stroke("balck");
textSize(50);
fill("black");
text("score "+score,600,100)
stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time"+ survivalTime,100,50);
  if(gameState ===END){
    if(Phoenix.isTouching(omenGroup)){
   stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 110, 200);
   
   stroke("black");
    fill("black");
       textSize(30);
  text("Jett is dead", 100, 240); 
    Phoenix.velocityY=0;
    omen.velocityX=0;
    coin.visible=false;
    omen.visible=0;
   
  }   
  }
createclouds();
}
function createclouds(){
  if (frameCount % 80 === 0) { 
    cloud=createSprite(900,random(0,200),50,50)
    cloud.addImage("cloud",cloud_image);
    cloud.scale=0.3;
    cloud.lifetime=1000;
    cloud.velocityX=-(1+3*score/10)
  }
}


function food() {
  if (frameCount % 200 === 0) {
    coin = createSprite(900,random(100,400), 50, 50 )
    coin.addAnimation("coin", coinImage);
    coin.scale = 0.1;
    coin.velocityX =-(4+3*score/10);           
    coin.lifetime = 220;
    
    
    
    FoodGroup.add(coin);
  }
  
}
function omens(){
  if (frameCount%200 === 0){
    omen=createSprite(900,540,20,20);
    omen.addImage("obs",obstaceImage);
    omen.velocityX=-6;
  omen.scale=0.1;
    omenGroup.add(omen);
  }
 
  }

  

