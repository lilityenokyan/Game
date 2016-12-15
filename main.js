let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const NUM_POINTS = 20;
const points = [];
const satkacikner = [];
let ants = document.getElementsByClassName("points");


for (let i = 0; i < NUM_POINTS; i++) {

    const size = 50+Math.random() * 100;
    points.push({
       
        x: Math.random() * (canvas.width - 2 * size),
        y: Math.random() * (canvas.height - 2 * size),
        height: size,
        width:  2*size,

        xDelta: 1, // the change that you will add to x, you can flip it when you get to the edge

        yDelta: 1, // the change that you will add to y, you can flip it when you get to the edge
        isDead: false

    });

    let item = {
       
        x: Math.random() * (canvas.width - 2 * size),

    };
    item.xDelta = item.width / 20;

    points.push(item);

}

var leftimg = new Image();
leftimg.src = "./ant.png";

var rightimg = new Image();
rightimg.src= "./ant2.png";

        
var img = new Image();
img.src= "./yellow.png"

const draw = function () {
    //context.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(function (l) {
    	
    	if(l.xDelta > 0) {
        	context.drawImage(rightimg, l.x, l.y, l.width, l.height);
    	} else  {
    		context.drawImage(leftimg, l.x, l.y, l.width, l.height);
    	}
    	

        l.x += l.xDelta;
        l.y += l.yDelta;

        if (l.x + l.width >= canvas.width-10 || l.x <= 0) {
            l.xDelta *= -1;
        }

        if (l.y + l.height >= canvas.height-10 || l.y <= 0) {
            l.yDelta *= -1;
        }

    });
    
}
const drawsatkacikner = function(){

	context.clearRect(0, 0, canvas.width, canvas.height);
    satkacikner.forEach(function (a) {
			context.drawImage(img, a.x, a.y, a.width, a.height);
    });
}

$("#canvas").on('mousedown', function(e){

	const getMouseCo = function(){


		points.forEach(function(p, idx){
			if (e.clientX > p.x && e.clientX < p.x + p.width && e.clientY > p.y && e.clientY < p.height+p.y){
				p.isDead = true;
				p.xDelta = 0;
				p.yDelta = 0;
				satkacikner.push(p);
				points.splice(idx, 1);
			}
		
		})
	}

	getMouseCo();
});


let animate = function () {
	
	drawsatkacikner();

    draw();
        requestAnimationFrame(animate);
}

animate();





