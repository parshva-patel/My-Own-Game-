var road ,roaodImage,alphaImage,maskImage,sanitizerImage,deltaImage
var gamaImage,boy,boyImage,vaccineImage,madicineImage
var scene,sceneImage,groung
var health=0
var lives=3
var gameOver,gmaeOverImage
var restart,restartImg

var gameState=0
var score=0
var life=3

function preload(){
    maskImage=loadImage("mask.png")
    roadImage=loadImage("Road.png")
    alphaImage=loadImage("Alpha.png")
    sanitizerImage=loadImage("Sanitizer.png")
    deltaImage=loadImage("Delta.png")
    gamaImage=loadImage("Gama.png")
    vaccineImage=loadImage("Vaccine.png")
    madicineImage=loadImage("Madicines.png")
sceneImage=loadImage("backgroung.jpg")
boyImage=loadImage("Boy2.png")
boyJump=loadImage("boyJump.png")
gameOverImage=loadImage("GameOver.png")
restartImg=loadImage("restart.png")
}

function setup(){
    createCanvas(1000,600)
scene=createSprite(500,300,width,height)
scene.addImage(sceneImage)
scene.scale=3.5
gameOver=createSprite(500,300,50,50)
gameOver.addImage(gameOverImage)
gameOver.scale=0.3
gameOver.visible=false


boy=createSprite(100,500,30,30)
boy.addImage(boyImage)
boy.scale=0.2
ground=createSprite(50,500,1000,30)

ground.visible=false
obstaclesGroup=new Group()
preventionsGroup=new Group()



}


function draw(){
    background("white")
    if (gameState===0){
        scene.velocityX=-3
        
        if (scene.x<0){
            scene.x=200
            }
            if (keyWentDown("space") && boy.y>=250){
                boy.addImage(boyJump)
                boy.scale=0.9
                boy.velocityY=-20
                boy.setCollider("rectangle",0,0,100,100)
            }
            if (keyWentUp("space")){
                
                boy.addImage(boyImage)
                boy.scale=0.2
                boy.setCollider("circle",0,0,280)
            }
            boy.velocityY=boy.velocityY+0.8
            boy.collide(ground)
            if(mousePressedOver(restart)) {
                reset();
              }
            spawnObstacles()
            spawnThings()
    

    for(var i=0;i<obstaclesGroup.length;i++){
        if (boy.isTouching(obstaclesGroup.get(i))){
            obstaclesGroup.get(i).destroy()
            lives=lives-1
        }

    }
    }

    for(var i=0;i<preventionsGroup.length;i++){
        if (boy.isTouching(preventionsGroup.get(i))){
            preventionsGroup.get(i).destroy()
            health=health+5
        }
        if (lives<0){
            gameState="end"
        }
    }
    drawSprites()
    if (gameState==="end"){
        score=0
        lives=0
        preventionsGroup.setVelocityXEach(0)
        obstaclesGroup.setVelocityXEach(0)
        obstaclesGroup.setLifetimeEach(-1)
        preventionsGroup.setLifetimeEach(-1)
        scene.velocityX=0
        boy.visible=false

        gameOver.visible=true
        fill("red")
    textSize(20)
        text(" STAY SAFE STAY HOME ",380,400)

        restart.visible=true
    }

    
    fill("red")
    textSize(20)
    text("Score - "+health,360,50)
    text("Lives - "+lives,510,50)
}

function spawnThings(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(400,450,10,40);
      obstacle.velocityX = -(6 + score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1,3));
       switch(rand) {
         
         case 1: obstacle.addImage(madicineImage);
                 break;
         case 2: obstacle.addImage(sanitizerImage);
                 break;
         case 3: obstacle.addImage(maskImage);
                 break;
         default: break;

       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.15;
       obstacle.lifetime = 300;
      obstacle.y=Math.round(random(200,400))
      //add each obstacle to the group
      obstacle.setCollider("circle",0,0,80)
       preventionsGroup.add(obstacle);
       
    }
   }

   function spawnObstacles(){
   if (frameCount % 100 === 0){
    var o = createSprite(300,350,10,40);
    o.velocityX = -(6 + score/100);
    
     //generate random obstacles
     var r = Math.round(random(1,3));
     switch(r) {
       case 1: o.addImage(gamaImage);
               o.scale=0.2;
               break;
       case 2: o.addImage(alphaImage);
               o.scale = 0.2;
               break;
       case 3: o.addImage(deltaImage);
               o.scale = 0.25;
               break;
        default:break;       
    }
    //assign scale and lifetime to the obstacle           
    
    o.lifetime = 300;
o.y=Math.round(random(200,400))
    o.setCollider("circle",10,10,120)
   //add each obstacle to the group
    obstaclesGroup.add(o);
    

    
 }
}


     