
/*
Developed by Hao
-> I haven't designed the starting page.
-> Starting page should communicate the white dots represent the user in the user. Your nose is the cursor.
Exploring the empty space is smell.

Probabaly change the dot into "your nose."
"Cursor"

-> Use Font to suggest tones.
-> Speech balloon

Menu Design.
Vertical -> Horizontal?
or Use Score?
or create a small button?
---
Think about how many slots we need to have?
Empty Slot.

*/
let video;
let poseNet;
let poses = [];

let noseX=0;
let noseY=0;
let eyeLX=0;
let eyeRX=0;
let eyeLY=0;
let eyeRY=0;


let videoW=640;
let videoH=480;
let myfont;
let canvaswidth=300;
let button=0;

let words=['MAN MAN','MUSCLE','MUSCLE POWER','SEXY','ADORABLE','WILDERNESS','ORIGINAL','CLASSIC','ORIGINIAL','MAN MAN','PURE MANLINESS'];

let times=[];

let discovered=[];

let instructions=["Give me a big Movement.","Keep Exploring","If you see this tag, \n Catch Him!","Terry Crews is Spliting."];


let offset=15;
let bar =30;
let r=0;
let g=0;
let b=0;
let next=0;

let f=1;
let ff=1;

let p;
let position=0;

let numOfLikes=0;
let numOfDislikes=0;

let status=0;
let prevstatus=0;

let m=0;
let n=0;

let sec=0;
let mn=0;
let mn2=0;
let sec2=0;
let score=0;
let dots=[];
let i=0;

let img;
let img1;
let img2;
let img3;
let img4;


let pic1;
let pic2;
let pic3;
let pic4;
let pic5;
let pic6;

let eyenose=0;
let nose;

let img5;

let img6;

let uicon;
let bkg;
let imgs=[];
let labels=[];
let movement=0;

let score_array=[]; // this array responds to menu.
let numOfSlots=5;

let scoreDiscovered=[];

var sktech=function(p){

  p.noseX=0;
  p.noseY=0;
  
  p.eyeLX=0;
  p.eyeLY=0;
  
  p.eyeRX=0;
  p.eyeRY=0;
  
  p.status=1;


  p.setup=function(){
      var canvasp=p.createCanvas(videoW, videoH);
    
    canvasp.parent("card");
  p.img=p.loadImage("nose.png");


      video = p.createCapture(p.VIDEO);
    video.hide();
    video.size(videoW,videoH);
    p.background(76,0,153);
    //Loads PoseNet Model
  poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function(results) {
    poses = results;
    
    if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
      
    
    let eyeLX=poses[0].pose.keypoints[1].position.x;
    let eyeLY=poses[0].pose.keypoints[1].position.y;
    
    let eyeRX=poses[0].pose.keypoints[2].position.x;
    let eyeRY=poses[0].pose.keypoints[2].position.y;

    p.noseX = lerp(p.noseX, nX, 0.5);
    p.noseY = lerp(p.noseY, nY, 0.5);
    
    p.eyeLX = lerp(p.eyeLX, eyeLX, 0.5);
    p.eyeLY = lerp(p.eyeLY, eyeLY, 0.5);
      
    p.eyeRX = lerp(p.eyeRX, eyeRX, 0.5);
    p.eyeRY = lerp(p.eyeRY, eyeRY, 0.5);
      
    p.status= dist(p.eyeLX,p.eyeLY,p.noseX,p.noseY);
      eyenose=p.status;
      

  }
    
  });

  }
  p.draw=function(){
    p.background(76,0,153);
    p.fill(255,255,255);
    p.image(p.img,640-p.noseX,noseY-240,30,30);

    p.rectMode(p.CENTER);
    p.fill(0);
    p.rect(160,20,p.textWidth("Track your nose.")+offset, bar);
 p.fill(255,255,255);
   p.textAlign(p.CENTER);
    p.text("Track your nose.",160,25);
  
  }

}

var sktech2=function(p){

  p.preload=function(){
    uicon = loadImage("usericon.png");

  }
  p.setup=function(){
    var canvaspp=p.createCanvas(300,300);
   canvaspp.parent("carda");
    
  }
  p.draw=function(){

    p.imageMode(p.CENTER);
 p.push();
    p.translate(p.width,p.height/2);
    p.scale(-1,1);
 p.image(video,0,0,640,480);
    
  console.log(video.height);
              p.pop();
      // p.image(uicon,p.width/2,p.height*1.2/2,p.width*1.2,p.height*1.2);
    
     p.rectMode(p.CENTER);
    p.fill(0);
    p.rect(p.width/2,20,p.textWidth("Make sure your face is with in the view.")+offset, bar);
 p.fill(255,255,255);
   p.textAlign(p.CENTER);
    p.text("Make sure your face is with in the view.",p.width/2,25);
    
  }

}




function preload() {
  
  myFont = loadFont('Pixelogist.ttf');


bkg=loadImage("trans.png");
img= loadImage("te2.png"); 
img1=loadImage("te3.png");
img2=loadImage("te4.png");
img3=loadImage("nose.png");

pic1= loadImage("terrycrews.png");
pic2= loadImage("img1.jpg");

  
  imgs.push(img);
    imgs.push(img1);
    imgs.push(img2);
    imgs.push(pic1);
  imgs.push(pic2);

 

}

function setup() {
  

// Initiate the Menu
for (let j=0;j<numOfSlots;j++)
{

  score_array[j]=0;
}

//
  var canvasp=createCanvas(windowWidth, windowHeight);
  canvasp.parent("maincanvas");
  for(let j=0;j<words.length;j++){
  
  times.push(0);
  }
  
  video = createCapture(VIDEO);
  video.size(width, height);
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    
    if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    noseX = lerp(noseX, nX, 0.5);
    
    noseY = lerp(noseY, nY, 0.5);
  }
    
  });
  // Hide the video element, and just show the canvas
  video.hide();
  
  sec= second();
  mn=minute();

  i=int(random(0,words.length));
  f=int(random(0,numOfSlots));
  dots.push(new dot(300,200,50,imgs[f],words[i]));
  ff=f;
  
}

function modelReady() {
  console.log("get ready");
}

function draw() {
  
  imageSwipe();


}



function imageSwipe(){
  
  imageMode(CENTER);
  image(bkg,width/2,height/2,width,height);
   
// Menu 

  push();

translate(0,windowHeight/10);
   rectMode(CENTER);
  imageMode(CENTER);
  
  fill(0);
  rect(100,20,80,30,10);
  textAlign(CENTER,CENTER);
  fill(255);
  textSize(20);
  text("Menu",100,20);

//create a menu on the leftside of the page. This menu comes with 5 slots.

stroke(255, 204, 0);
strokeWeight(4);

// default number of slots is 5. 
for (let i=0;i<numOfSlots;i++)
{
 rect(100,100+i*90,80,80,10);
 image(imgs[i],100,100+i*90,50,60);

}

pop();

// Keep track of the discovered items.


push();
translate(0,windowHeight/10);
for(let j=0;j<numOfSlots;j++)
{
  fill(0);
 ellipse(100+20,100+j*90+20,30,30);

 fill(255);
  textSize(20);
  text(score_array[j],100+15,100+j*90+25);
}

pop();

// if all the items are discovered or any item has been found more than 3 time
// It goes to the end screen which tells the user the notes of the scent.

push();


 if(min(score_array)>0||max(score_array)>3){

  fill(0);
  rectMode(CENTER);
    backgroundchange();
  rect(windowWidth/2,windowHeight/2,windowHeight*8/10,windowHeight*8/10);

  fill(255);
 textSize(20);
  textAlign(CENTER,CENTER);

text("Your MAN MAN Notes",windowWidth/2, windowHeight/5);
stroke(255);

line(windowWidth/2-150, windowHeight/4-20,windowWidth/2+150,windowHeight/4-20);
  for(let j=0;j<discovered.length;j++)
  {
   textFont(myFont,30);
    text(discovered[j],windowWidth/2,windowHeight/5+60+j*30);

  }


}

pop();

// constantly calculating the distance between the nose and the hidden item.
// the content of instruction dialogue depends on this distance.
  
  if(dots[0].d>200){
  
    m=0;
  
  }
  if(dots[0].d<200&&dots[0].d>150){
  m=1;
  }
  if(dots[0].d<150&&dots[0].d>90){
  m=2;
  dots[0].show();
  }
  if(dots[0].d<90&&dots[0].d>30){
  m=3;
  }
  
  push();
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  fill(0);
 textFont(myFont,30);
  
  if(m==0){
  rect(width/2,height/4*3,textWidth(instructions[m])+offset,bar+offset);}
  if(m==1){
  rect(width/2,height/4*3,textWidth(instructions[m])+offset,bar*2+offset);}
  if(m==2){
  rect(width/2,height/4*3,textWidth(instructions[m])+offset,bar*3+offset*2);}
  if(m==3){
  rect(width/2,height/4*3,textWidth(instructions[m])+offset,bar+offset);}
  
  
  fill(255);
  text(instructions[m],width/2,height/4*3);

  
  pop();
   
  
  noStroke();
  
  // mirror the nose X position on the screen. Therefore, nose sticker moves the same direction as the user.

  nose=width-noseX; 

// draw the nose sticker on the screen.
 image(img3,nose,noseY,30,30);

// status returns the boolean value. if the collision happens, it return 1. if not, return 0
  status= dots[0].collide(nose,noseY);
  
// when the collision happens, the system generates a new hiddened item randomly.


  if ( prevstatus==0&&status==1)
  {
 //   console.log("new circle");
    score++;
    discovered.push(words[i]);
    scoreDiscovered.push(f);
    score_array[f]+=1; // get an update for the current score. 


   // labels.push(new label(width/12,score*bar/2+100,bar,words[i]));
// not have a repetitive random number
    i=int(random(0,words.length));
    f=int(random(0,numOfSlots));

    // we only have 5 slots.
    while(f==ff){f=int(random(0,numOfSlots));}
  dots[0]= new dot(random(width/5,width/5*4),random(height/5,height*4/5),30,imgs[f],words[i]);

  }

  prevstatus=status;
  ff=f;
  
}


function backgroundchange(){

 switch(int(random(0,5))){
    case 0:
      r=237;
        g=244;
      b=33;
      break;
        case 1:
      r=252;
        g=0;
      b=136;
      break;
        case 2:
      r=0;
        g=252;
      b=249;
      break;
        case 3:
      r=0;
        g=252;
      b=213;
      break;
        case 4:
      r=231;
        g=0;
      b=252;
      break; 
  
  }
  
    background(r,g,b);
  

}


document.getElementById("bn").onclick = function() {
  
  myFunction();

};

function myFunction(){
  
  var x=document.getElementById("bn");
     var y=document.getElementById("holder");
 
     var z=document.getElementById("instruction");
       var zz=document.getElementById("cardd");
       var mainc=document.getElementById("maincanvas");
mainc.style.display="flex";
x.classList.toggle("btshow"); 
y.style.display="none";
  z.style.display="none";
 zz.style.display="none";

};


var myp5 = new p5(sktech);

var myp52 = new p5(sktech2);

