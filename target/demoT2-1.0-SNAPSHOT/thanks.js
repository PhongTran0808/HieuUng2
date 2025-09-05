// Canvas setup
const bgCanvas = document.getElementById('backgroundCanvas');
const fireworksCanvas = document.getElementById('fireworksCanvas');
const heartCanvas = document.getElementById('heartCanvas');
const loveText = document.getElementById('loveText');

[bgCanvas, fireworksCanvas, heartCanvas].forEach(c=>{
    c.width = window.innerWidth;
    c.height = window.innerHeight;
});

const bgCtx = bgCanvas.getContext('2d');
const ctx = fireworksCanvas.getContext('2d');
const hctx = heartCanvas.getContext('2d');

// ---------- Background động (moving stars) ----------
let stars = [];
for(let i=0;i<200;i++){
    stars.push({
        x: Math.random()*window.innerWidth,
        y: Math.random()*window.innerHeight,
        r: Math.random()*1.5+0.5,
        dx: (Math.random()-0.5)/2,
        dy: (Math.random()-0.5)/2
    });
}
function animateBG(){
    bgCtx.fillStyle = '#111';
    bgCtx.fillRect(0,0,window.innerWidth,window.innerHeight);
    stars.forEach(s=>{
        s.x += s.dx; s.y += s.dy;
        if(s.x<0) s.x=window.innerWidth;
        if(s.x>window.innerWidth) s.x=0;
        if(s.y<0) s.y=window.innerHeight;
        if(s.y>window.innerHeight) s.y=0;
        bgCtx.fillStyle = 'white';
        bgCtx.beginPath();
        bgCtx.arc(s.x,s.y,s.r,0,Math.PI*2);
        bgCtx.fill();
    });
    requestAnimationFrame(animateBG);
}
animateBG();

// --------- Pháo hoa ----------
let particles = [];
function random(min,max){ return Math.random()*(max-min)+min; }

class Particle{
    constructor(x,y,color){
        this.x=x; this.y=y;
        this.vx=random(-6,6);
        this.vy=random(-6,6);
        this.alpha=1;
        this.color=color;
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        this.alpha-=0.02;
    }
    draw(){
        ctx.globalAlpha=this.alpha;
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,3,0,Math.PI*2);
        ctx.fill();
    }
}

function explode(){
    const x=random(100,window.innerWidth-100);
    const y=random(100,window.innerHeight-200);
    const colors=['#ff3c3c','#ff9a3c','#fff23c','#3cff3c','#3c9aff'];
    for(let i=0;i<60;i++){
        particles.push(new Particle(x,y,colors[Math.floor(Math.random()*colors.length)]));
    }
}

function animateFireworks(){
    ctx.fillStyle="rgba(0,0,0,0.15)";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    particles.forEach((p,i)=>{
        p.update();
        p.draw();
        if(p.alpha<=0) particles.splice(i,1);
    });
    requestAnimationFrame(animateFireworks);
}
setInterval(explode,400);
animateFireworks();

// ---------- Trái tim ----------
let t=0;
function drawHeart(){
    hctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    hctx.fillStyle='red';
    hctx.beginPath();
    for(let i=0;i<=t;i+=0.02){ // vẽ nhanh hơn
        const x = 300*Math.pow(Math.sin(i),3) + window.innerWidth/2;
        const y = - (15*Math.cos(i)-5*Math.cos(2*i)-2*Math.cos(3*i)-Math.cos(4*i))*15 + window.innerHeight/2;
        hctx.lineTo(x,y);
    }
    hctx.fill();
    if(t<Math.PI*2){
        t+=0.05; // tốc độ vẽ nhanh
    } else {
        loveText.style.opacity = 1;
        loveText.innerHTML = "Yêu em"; // chữ bây giờ có gradient trắng rực rỡ
    }
    requestAnimationFrame(drawHeart);
}
drawHeart();
