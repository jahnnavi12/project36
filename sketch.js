var database ,dog,dog1,dog2
var position;
var feed,add;
var foodobject;
var Feedtime;
var Lastfeed;

function preload(){
dogImg = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1200, 800);
  
foodobject=new Food();

 dog = createSprite(500,400,150,150);
 dog.addImage(dogImg);
 dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readPosition,showError);

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("FEED DRAGO")
  feed.position(500,15)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)
  
  } 
  
  
  
  function draw(){
   { background(46,139,87);
   foodobject.display();
   }
  drawSprites();
  }
  function readPosition(data){
    position = data.val();
    foodobject. updateFoodStock(position)
   
    
  }
  
  function showError(){
    console.log("Error in writing to the database");
  }
  
  function writePosition(data){
    if(data>0){
      data=data-1
    }
    else{
      data=0
    }
    database.ref('/').set({
      'Food': data
    })
  
  }
  function AddFood(){
  position++
  database.ref('/').update({
    Food:position
  }
  
  )
  }
  function FeedDog(){
  
  dog.addImage(happyDog)
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodobject.getFoodStock(),
     FeedTime:hour ()
   })
  }
  