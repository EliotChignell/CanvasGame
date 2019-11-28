const canvas = document.querySelector("#mainCanvas");
const context = canvas.getContext("2d");

// Adjusting canvas width
canvas.width = 600;
canvas.height = 400;

let gameState = 0;
let fps = 60;
let keysDown = {};
let score = 0;
let paddleMoving = false;
let paddleDirection = "right";

let paddle = {
    x: 200,
    y: 370,
    w: 200,
    h: 30,
    c: "white",

    xv: 0
};

let ball = {
    x: 100,
    y: 0,
    w: 30,
    h: 30,
    c: "red",

    xv: 7,
    yv: 7,
};

// Preset functions
function dr(e,t,n,o,l){context.fillStyle=l,context.fillRect(e,t,n,o)}
function dt(e,t,n,o,l){context.fillStyle=n,context.font=o,context.fillText(l,e,t)}
function collision(e,t,n,o,l,i,c,d){return e<l+c&&e+n>l&&t<i+d&&t+o>i}
function listenForKeys(){addEventListener("keydown",e=>{keysDown[e.keyCode]=!0},!1),addEventListener("keyup",e=>{delete keysDown[e.keyCode]},!1)}
function reverseVelocity(){ball.xv=-ball.xv,ball.yv=-ball.yv}

// Main game loop
function mLoop() {
    switch(gameState) {
        case 0: // Playing game
            listenForKeys();
            // Background
            dr(0,0,canvas.width,canvas.height,"black");

            // Paddle
            dr(paddle.x,paddle.y,paddle.w,paddle.h,paddle.c);

            // Ball
            dr(ball.x,ball.y,ball.w,ball.h,ball.c);
            ball.x += ball.xv;
            ball.y += ball.yv;

            // Score
            dt(10,30,"white","25px SF","Score: " + score);

            // Instructions
            dt(260,30,"white","25px SF","Press Space to move paddle")

            /*
            if (collision(ball.x,ball.y,ball.w,ball.h,0,400,600,0) ||
                collision(ball.x,ball.y,ball.w,ball.h,0,0,600,0) ||
                collision(ball.x,ball.y,ball.w,ball.h,0,0,0,400) ||
                collision(ball.x,ball.y,ball.w,ball.h,600,0,0,400)) reverseVelocity();
            */

            if (collision(ball.x,ball.y,ball.w,ball.h,0,400,600,0) || ball.y >= 570) {
                // ball.yv = -ball.yv;
                gameState = 1;
            }
            if (collision(ball.x,ball.y,ball.w,ball.h,0,0,600,0)) ball.yv = -ball.yv;
            if (collision(ball.x,ball.y,ball.w,ball.h,0,0,0,400)) ball.xv = -ball.xv;
            if (collision(ball.x,ball.y,ball.w,ball.h,600,0,0,400)) ball.xv = -ball.xv;
            if (collision(ball.x,ball.y,ball.w,ball.h,paddle.x,paddle.y,paddle.w,paddle.h)) {
                ball.yv = -ball.yv;
                score++;
            }
            
            if (paddle.x + paddle.w >= canvas.width && paddle.xv > 0) {
                paddleDirection = "left";
                paddle.xv = -paddle.xv;
            }
            if (paddle.x <= 0 && paddle.xv < 0) {
                paddleDirection = "right";
                paddle.xv = -paddle.xv;
            }
            /* if (collision(paddle.x,paddle.y,paddle.w,paddle.h,0,0,0,400) ||
                collision(paddle.x,paddle.y,paddle.w,paddle.h,600,0,0,400)) {
                paddle.xv = -paddle.xv;
                // paddle.x += paddle.xv;
                console.log("collision")
            } */
            if (65 in keysDown || 32 in keysDown) {
                if (paddleDirection == "right") paddle.xv = 10;
                if (paddleDirection == "left") paddle.xv = -10;
                paddleMoving = true;
            }

            console.log(paddle.x);
            if (paddleMoving) {
                paddle.xv = paddle.xv * 0.9;
                if (paddle.xv < 0.5 && paddleDirection == "right") {
                    paddle.xv = 0;
                    paddleMoving = false;
                } else if (paddle.xv > -0.5 && paddleDirection == "left") {
                    paddle.xv = 0;
                    paddleMoving = false;
                }
            } else {
                paddle.xv = 0;
            }
            paddle.x += paddle.xv;
            break;

        case 1:
            listenForKeys();
            // Previous stuff
            dr(paddle.x,paddle.y,paddle.w,paddle.h,paddle.c);
            dr(ball.x,ball.y,ball.w,ball.h,ball.c);

            // Background (slightly transparent)
            dr(0,0,canvas.width,canvas.height,"rgba(0,0,0,0.7)");

            // Text and other graphics
            dt(190,150,"white","40px SF","Game Over");
            dt(215,200,"white","20px SF","Press R to restart");

            if (82 in keysDown) {
                paddle = {
                    x: 200,
                    y: 370,
                    w: 200,
                    h: 30,
                    c: "white",
                    xv: 0
                };
                paddleDirection = "right";
                paddleMoving = false;
                ball = {
                    x: 100,
                    y: 0,
                    w: 30,
                    h: 30,
                    c: "red",
                
                    xv: 10,
                    yv: 10,
                };
                score = 0;
                gameState = 0;
            }
            break;
    }   
}

setInterval(mLoop, 1000/fps);