const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const particleArray=[];
let hue=0;

window.addEventListener('resize',function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    
});

const mouse={
    x:undefined,
    y:undefined,
}

canvas.addEventListener('click',function(event){
  mouse.x=event.x;
  mouse.y=event.y;
  for(let i=0;i<20;i++){
    particleArray.push(new Particle());
  }
  
});

canvas.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    for(let i=0;i<50;i++){
        particleArray.push(new Particle());
      }
   
})



class Particle{
    constructor(){
        this.x=mouse.x;
        this.y=mouse.y;
        // this.x=Math.random() *canvas.width;
        // this.y=Math.random() *canvas.height;
        this.size=Math.random()*15 +1;
        this.speedX=Math.random()*3-1.5;
        this.speedY=Math.random()*3-1.5;
        this.color='hsl('+ hue +' ,100%,50%)';  // color of particle at creation time will be same
    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.size>0.2) this.size-=0.1;
    }
    draw(){
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,5,0,Math.PI*2);
        ctx.fill();
    }
}



function handleParticle(){
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update();
        particleArray[i].draw();
        
        for(let j=i;j<particleArray.length;j++){
            const dx=particleArray[i].x -  particleArray[j].x;
            const dy=particleArray[i].y -  particleArray[j].y;
            const distance=Math.sqrt(dx*dx + dy*dy);
            if(distance<100){
                ctx.beginPath();
                ctx.strokeStyle=particleArray[i].color;
                ctx.lineWidth=particleArray[i].size/5;
                ctx.moveTo(particleArray[i].x,particleArray[i].y);  //using pythogoras theorem to find distance between two particles
                ctx.lineTo(particleArray[j].x,particleArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }       
        }
       

        if(particleArray[i].size<=0.3){
            particleArray.splice(i,1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
   // ctx.fillStyle='rgba(0,0,0,0.03)';
    //ctx.fillRect(0,0,canvas.width,canvas.height);
    hue+=2;
    handleParticle();
    requestAnimationFrame(animate);

}
animate();


