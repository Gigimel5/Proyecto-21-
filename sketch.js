var torre, torreImg;
var fantasma, fantasmaImg;
var ventana, ventanaImg;
var paredinv1, paredinv2;
var suelo, sueloImg;
var ventanasGrupo, sueloGrupo; 
var gameState = "play";

function preload(){
  torreImg=loadImage("tower.png");
  fantasmaImg=loadImage ("ghost2.png");
  ventanaImg=loadImage("door.png");
  sueloImg=loadImage("climber.png");
}

function setup(){
  createCanvas (600,600);

  ventanasGrupo = new Group();
  sueloGrupo= new Group();

  torre=createSprite(300,300);
  torre.addImage ("torre", torreImg);
  

  fantasma=createSprite(300,300,20,20);
  fantasma.addImage("fantasma", fantasmaImg);
  fantasma.scale=0.3;

  
}

function draw(){
  drawSprites();
  text(mouseX+"-"+mouseY,mouseX,mouseY);

  
  
  
  crearVentanas()
 // Qué es = array = [ ]  ?;

  if(gameState === "play"){
  fantasma.velocityY=fantasma.velocityY+0.85;
  torre.velocityY=3;

  if(torre.y>250){
    torre.y=0;
  }
  if(keyDown ("right") ){
    fantasma.x=fantasma.x+3;
  }
  if(keyDown ("space") ){
   fantasma.velocityY=-10;
  }
  
  if(keyDown ("left") ){
    fantasma.x=fantasma.x-3;
   }
   if (ventanasGrupo.isTouching(fantasma)){
    gameState = "end"
    }
  }  

  if(gameState === "end"){
    fantasma.velocityY=0;
    torre.velocityY=0;
    ventanasGrupo.setVelocityYEach(0);
    sueloGrupo.setVelocityYEach(0);
    
    textSize(50);
    fill("blue");
    text ("Game over",190,300);
  }
}
function crearVentanas(){
  var x = Math.round(random(60,540));
  if (frameCount %170 ===  0){
    var ventana= createSprite(x,-90);
    ventana.addImage("ventana",ventanaImg);
    ventana.velocityY = 2;
    ventana.lifeTime=700;
    ventanasGrupo.add(ventana);

    var suelo= createSprite(300,-20);
    suelo.addImage("suelo",sueloImg);
    suelo.velocityY = 2;
    suelo.lifeTime=700;
    suelo.x=ventana.x;
    sueloGrupo.add(suelo);

    fantasma.depth=ventana.depth+1
  }
}