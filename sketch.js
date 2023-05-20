var backgroundImg, background;
var planeImg, plane;
var cloudImg, cloud, cloudsGroup;
var bird, bird_flap, birdsGroup;
var score = 0
var gameState = "play";

function preload(){
bird_flapping = loadAnimation("bird_flap.png", "bird.png");

planeImg = loadImage("plane.png");
backgroundImg = loadImage("background.jpg");
cloudImg = loadImage("cloud.png");
}

function setup() {
 createCanvas(600, 400);
 plane = createSprite(200, 150, 50, 15)
 plane.addImage("plane",planeImg);
 plane.scale = 0.1
 
 background = createSprite(254, 170, 600, 400)
  background.addImage("background", backgroundImg)
 background.depth = plane.depth - 1
 cloudsGroup = new Group()
 birdsGroup = new Group()
}

function draw(){
    text("Score: "+ score, 500,20);
    
    if (gameState === "play"){
    score = score + Math.round(getFrameRate()/60);
    if(keyDown("left_arrow")){
        plane.x = plane.x - 3
 }
    if(keyDown("right_arrow")){
        plane.x = plane.x + 3
 }
    if(keyDown("down_arrow")){
        plane.y = plane.y + 3
 }
    if(keyDown("up_arrow")){
        plane.y = plane.y - 3
 }
 spawnClouds();
 spawnBirds();
 if (birdsGroup.isTouching(plane)){
    gameState = "end"
 }
}
else if (gameState = "end"){
    cloudsGroup.setVelocityXEach(0);
    birdsGroup.setVelocityXEach(0)
    birdsGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
}


 drawSprites()
}
function spawnClouds() {
    if (frameCount % 60 === 0) {
      var cloud = createSprite(440,120,40,10);
      cloud.y = Math.round(random(0,300));
      cloud.addImage(cloudImg);
      cloud.scale = 0.5;
      cloud.velocityX = -3; 
      cloud.lifetime = 200;
      cloudsGroup.add(cloud);
    }
}
function spawnBirds() {
    if (frameCount % 60 === 0) {
      var bird = createSprite(495,120,40,10);
      bird.y = Math.round(random(0,300));
      bird.addAnimation("flapping", bird_flapping);
      bird.scale = 0.2;
      bird.velocityX = -1;
      bird.lifetime = 400;
      birdsGroup.add(bird);
    }
}