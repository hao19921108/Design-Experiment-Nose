function dot(x,y,radius,img,word){

  this.x=x;
  this.y=y;
  this.radius=radius;
  this.img=img;
  this.word=word;
  
  this.r=0;
  this.g=0;
  this.b=0;
  this.d=0;
  
  this.show= function(){
     push();
      translate(this.x+sin(millis())*80,this.y);
      imageMode(CENTER);
      
    image(this.img,0,0,this.radius*random(3,10),this.radius*random(4,6));
    rectMode(CENTER);
      textAlign(CENTER,CENTER);
      fill(0);
      rect(0,0,textWidth(this.word)+15,20);
       fill(255);
      text(this.word,0,0);

pop();
    
  }
  
  
  this.collide = function(a,b){
  
  let d= dist(this.x,this.y,a,b);  
    this.d=d;
    if(d>6*this.radius/2){
        push();

    this.r=this.g=this.b=0;
  //  fill(this.r,this.g,this.b);
   // ellipse(this.x,this.y,this.radius);
     
      pop();
    }
    
    
    if(d>this.radius &&d< 3*this.radius){
    
            
      this.r=0;
      this.g=142;
      this.b=252;
      
      push();
      translate(this.x+sin(millis())*80,this.y);
      imageMode(CENTER);

  
      image(this.img,0,0,this.radius*random(3,10),this.radius*random(3,10));

     
     
      rectMode(CENTER);
      textAlign(CENTER,CENTER);
      fill(0);
      rect(0,0,textWidth(this.word)+15,20);
       fill(255);
      text(this.word,0,0);
      pop();

      
    }
    
    
    
  if(d <this.radius)
  {  //console.log("hit");
    return 1;}else{return 0;}
  }


}