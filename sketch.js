var dog;
var dogIMG,happyDogIMG;
var database;
var foods;
var foodStock;


function preload(){
  dogIMG=loadImage("images/dogImg.png");
  happyDogIMG=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
  dog=createSprite(250,250,10,10);
  dog.addImage(dogIMG);
  dog.scale=0.2;
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(happyDogIMG)
  }
  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("Food remaining: "+ foods,170,170);
  textSize(13);
  text("Note: Press UP_ARROW key to feed Drago Milk",130,10,300,20)
}

function readStock(data){
  foods=data.val();
  console.log('food stock =>' + foods);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

 
  database.ref('/').update({
    Food:x
  });
}

