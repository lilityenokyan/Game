let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");


let ants = document.getElementsByClassName("points");
const NUM_POINTS = 5;
let points = [];
let satkacikner = [];
let countDown = 30;
let current_lvl = 1;

function Backimgmosq(){
    $("#canvas").css("background-image","url(./images/skybackground.jpg)");
}
function Backimg(){
    $("#canvas").css("background-image","url(./images/grassantbck.jpg)","background-repeat: no-repeat");
}
function Backimgcock(){
    $("#canvas").css("background-image","url(./images/cockroachbck.jpg)");
}


//constructAnts();
function constructAnts()
{
    console.log('sdfsdf')
for (let i = 0; i < NUM_POINTS; i++) {

    const size = 50+Math.random() * 50;
    
       let item={
        x: Math.random() * (canvas.width - 2 * size),
        y: Math.random() * (canvas.height - 2 * size),

        height: size,
        width:  2*size,

        xDelta: 1, // the change that you will add to x, you can flip it when you get to the edge
        yDelta: 0, // the change that you will add to y, you can flip it when you get to the edge

        isDead: false,
       
               }

    item.xDelta = item.width / 100;

    points.push(item);

}
}

var leftimg = new Image();
leftimg.src = "./images/ant.png";

var rightimg = new Image();
rightimg.src= "./images/ant2.png";

var img = new Image();
img.src= "./images/yellow.png"

var gameOverImage = new Image();
gameOverImage.src = "./images/gameover.png";


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
    drawScore();

}
const drawsatkacikner = function(){

    context.clearRect(0, 0, canvas.width, canvas.height);
    satkacikner.forEach(function (a) {
            context.drawImage(img, a.x, a.y, a.width, a.height);
    });
}

var score = 0;


$("#canvas").on('mousedown', function(e){

    const getMouseCo = function(){


        points.forEach(function(p, idx){
            var sound = new Audio('./split2.wav');
            if (e.clientX > p.x && e.clientX < p.x + p.width && e.clientY > p.y && e.clientY < p.height+p.y){
                p.isDead = true;
                p.xDelta = 0;
                p.yDelta = 0;
                satkacikner.push(p);
                points.splice(idx, 1);
                sound.play();
                score++;
                if(score >= NUM_POINTS)
                 {
                   if(current_lvl<3)
                        {
                            //levelchange = true;
                            swal({
                            title: 'Level up!',
                            text: 'You are doing great',
                            timer: 500
                            }).then(
                            function () {},
                            // handling the promise rejection
                            function (dismiss) {
                            if (dismiss === 'timer') {
                            console.log('I was closed by the timer')
                                 }
                                }
                               )
                              current_lvl++; 
                              next_lvl();
                                    



                        }
                        else {

                          swal("Congratulations!",
                            "You win!",
                             "success"
                             );
                             document.location.reload();
                          //stopgame();
                        }

                }
            }

        })
    }
    getMouseCo();
});

function next_lvl()
{

    clearInterval(animation);
    context.clearRect(0, 0, canvas.width, canvas.height);
    countDown-=5;
    score=0;
    constructAnts(); // Fill the array with the points for the ants
    satkacikner=[];
    var animation = setInterval(animate,1);
           
     

}
function drawScore() {
    context.font = "20px Times-bold";
    context.fillStyle = "#000000";
    context.fillText("Score: "+score, 100, 20);
    context.fillText("Level: "+current_lvl, 100, 40);
}


$('#mosq').on('click', function(){

    leftimg.src = "./images/mosquito.png";
    rightimg.src = "./images/mosquito2.png";
    Backimgmosq(); 

})

$('#ant').on('click', function(){

    leftimg.src = "./images/ant.png";
    rightimg.src = "./images/ant2.png";
    Backimg(); 
})

$('#roach').on('click', function(){

    leftimg.src = "./images/cockroach.png";
    rightimg.src = "./images/cockroach2.png";
    Backimgcock(); 
})


let animate = function () {
        
    drawsatkacikner();
    draw();
    requestAnimationFrame(animate);
}



    constructAnts();
$('#strtg').on('click', function (){
    animate();
    Backimg();
});

let sTime = new Date().getTime();
var counter = setInterval(UpdateTime, 500);
//let animation = setInterval(animate,1);

function UpdateTime() {
    let cTime = new Date().getTime();
    let diff = cTime - sTime;
    let seconds = countDown - Math.floor(diff / 1000);
    if (seconds >= 0) {
        let minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
        $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
    }
     else {
       $("#countdown").hide();
        gameOver() 
       clearInterval(counter);
    }
}
UpdateTime();

function gameOver()
{
  satkacikner=[];
  points=[];
  context.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(gameOver);
  //context.drawImage(gameOverImage, 350, 100);
  context.drawImage(gameOverImage, 350,100);

}
function BackgroundSound(){

    /*$('#on').on('click', function (){

        $(#audio).pause();

        
    });
    //document.getElementById('audio').muted = true;

}*/
$('#audio').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
});
}

