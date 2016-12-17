

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let ants = document.getElementsByClassName("points");
let NUM_POINTS = 25;
let points = [];
let satkacikner = [];
let countDown = 30;
let current_lvl = 1;
let requestId;
let current = ant;
let score = 0;

let leftimg = new Image();
leftimg.src = "./images/ant.png";

let rightimg = new Image();
rightimg.src = "./images/ant2.png";

let img = new Image();
img.src = "./images/yellow.png"

let gameOverImage = new Image();
gameOverImage.src = "./images/gameover.png";

init();

$('#strtg').on('click', function () {
    let points = [];
    let satkacikner = [];
    let current_lvl = 1;
    init();
    startTimer(countDown, $('#countdown'));
    current();
    animate();
});

function Backimgmosq() {
    $("#canvas").css("background-image", "url(./images/skybackground.jpg)");
}
function Backimg() {
    $("#canvas").css("background-image", "url(./images/grassantbck.jpg)", "background-repeat: no-repeat");
}
function Backimgcock() {
    $("#canvas").css("background-image", "url(./images/cockroachbck.jpg)");
}

function constructAnts() {
    points = [];
    for (let i = 0; i < NUM_POINTS; i++) {

        const size = 50 + Math.random() * 50;

        let item = {
            x: Math.random() * (canvas.width - 2 * size),
            y: Math.random() * (canvas.height - 2 * size),

            height: size,
            width: 2 * size,

            xDelta: 1, // the change that you will add to x, you can flip it when you get to the edge
            yDelta: 0, // the change that you will add to y, you can flip it when you get to the edge

            isDead: false,

        }

        item.xDelta = item.width / 100;

        points.push(item);

    }
}


const draw = function () {

    points.forEach(function (l) {

        if (l.xDelta > 0) {
            context.drawImage(rightimg, l.x, l.y, l.width, l.height);
        } else {
            context.drawImage(leftimg, l.x, l.y, l.width, l.height);
        }

        l.x += l.xDelta;
        l.y += l.yDelta;

        if (l.x + l.width >= canvas.width - 10 || l.x <= 0) {
            l.xDelta *= -1;
        }
        if (l.y + l.height >= canvas.height - 10 || l.y <= 0) {
            l.yDelta *= -1;
        }

    });

    drawScore();

};

const drawsatkacikner = function () {

    context.clearRect(0, 0, canvas.width, canvas.height);
    satkacikner.forEach(function (a) {
    context.drawImage(img, a.x, a.y, a.width, a.height);

    });
};

$("#canvas").on('mousedown', function (e) {

    const getMouseCo = function () {

        points.forEach(function (p, idx) {
            let sound = new Audio('./split2.wav');
            if (e.clientX > p.x && e.clientX < p.x + p.width && e.clientY > p.y && e.clientY < p.height + p.y) {
               
                p.isDead = true;
                p.xDelta = 0;
                p.yDelta = 0;
                satkacikner.push(p);
                points.splice(idx, 1);
                sound.play();
                score++;
               
                if (score >= NUM_POINTS) {
               
                    if (current_lvl < 3) {

                        swal({
                            title: 'Level up!',
                            text: 'You are doing great',
                            type: "warning",
                            timer: 500
                        }).then(
                            function () {
                            },
                            function (dismiss) {
                                if (dismiss === 'timer') {
                                    console.log('I was closed by the timer')
                                }
                            }
                        )
                        current_lvl++;
                        next_lvl();

                    } else {
                        swal({
                            title: "Congratulations!",
                            text: "You win!",
                            type: "success",
                            timer: 1000
                        }).then(
                            function () {
                            },
                            function (dismiss) {
                                if (dismiss === 'timer') {
                                    console.log('I was closed by the timer')
                                }
                            }
                        )

                        setInterval(document.location.reload(), 100)
                    }
                }
            }
        })
    }
    getMouseCo();
});

function next_lvl() {

    NUM_POINTS+=5;
    context.clearRect(0, 0, canvas.width, canvas.height);
    countDown -= 5;
    score = 0;
    constructAnts(); // Fill the array with the points for the ants
    satkacikner = [];
}
function drawScore() {
    context.font = "20px Times-bold";
    context.fillStyle = "#000000";
    context.fillText("Score: " + score, 100, 20);
    context.fillText("Level: " + current_lvl, 100, 40);
}

function mosq() {
    current = mosq;
    leftimg.src = "./images/mosquito.png";
    rightimg.src = "./images/mosquito2.png";
    Backimgmosq();

}
function ant() {
    current = ant;
    leftimg.src = "./images/ant.png";
    rightimg.src = "./images/ant2.png";
    Backimg();
}
function roach() {
    current = roach;
    leftimg.src = "./images/cockroach.png";
    rightimg.src = "./images/cockroach2.png";
    Backimgcock();
}
$('#mosq').on('click', mosq);

$('#ant').on('click', ant);

$('#roach').on('click', roach);


function animate() {
    drawsatkacikner();
    draw();
    requestId = requestAnimationFrame(animate);
}

let sTime = new Date().getTime();

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.html(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
            gameOver();
            $("#countdown").hide();
        }

    }, 1000);
}

function gameOver() {
    satkacikner = [];
    points = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(gameOver);
    context.drawImage(gameOverImage, 350, 100);
}

function init() {
    if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
    constructAnts();// init items for draw
}
