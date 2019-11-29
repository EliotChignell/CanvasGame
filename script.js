const canvas = document.querySelector("#mainCanvas");
const context = canvas.getContext("2d");

// Setting high scores if not already set
if (!localStorage.getItem("highScore")) localStorage.setItem("highScore",0);

// Adjusting canvas width
canvas.width = 600;
canvas.height = 400;

let gameState = 2;
let fps = 60;
let keysDown = {};
let score = 0;
let paddleMoving = false;
let paddleDirection = "right";
let newHigh = false;

let paddle = {
    x: 200,
    y: 370,
    w: 200,
    h: 30,
    c: "white",

    xv: 0
};

let ball = {
    x: 0,
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
            dt(10,60,"white","25px SF","High: " + localStorage.getItem("highScore"));

            // Instructions
            dt(260,30,"white","25px SF","Press Space to move paddle")

            /*
            if (collision(ball.x,ball.y,ball.w,ball.h,0,400,600,0) ||
                collision(ball.x,ball.y,ball.w,ball.h,0,0,600,0) ||
                collision(ball.x,ball.y,ball.w,ball.h,0,0,0,400) ||
                collision(ball.x,ball.y,ball.w,ball.h,600,0,0,400)) reverseVelocity();
            */

            if (collision(ball.x,ball.y,ball.w,ball.h,0,400,600,0) || ball.y >= 350) {
                gameState = 1;
            }
            if (collision(ball.x,ball.y,ball.w,ball.h,0,0,600,0)) ball.yv = -ball.yv;
            if (collision(ball.x,ball.y,ball.w,ball.h,0,0,0,400)) ball.xv = -ball.xv;
            if (collision(ball.x,ball.y,ball.w,ball.h,600,0,0,400)) ball.xv = -ball.xv;
            if (collision(ball.x,ball.y,ball.w,ball.h,paddle.x,paddle.y,paddle.w,paddle.h)) {
                ball.yv = -ball.yv;
                score++;
            }

            console.log(ball.y);
            
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
                if (paddleDirection == "right") paddle.xv = 8;
                if (paddleDirection == "left") paddle.xv = -8;
                paddleMoving = true;
            }

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

        case 1: // Game over screen
            // Managing high scores
            if (score > localStorage.getItem("highScore")) {
                newHigh = true;
                localStorage.setItem("highScore",score);
            }
            listenForKeys();
            // Previous stuff
            dr(paddle.x,paddle.y,paddle.w,paddle.h,paddle.c);
            dr(ball.x,ball.y,ball.w,ball.h,ball.c);
            dt(10,30,"white","25px SF","Score: " + score);
            if (!newHigh) dt(10,60,"white","25px SF","High: " + localStorage.getItem("highScore"));
            dt(260,30,"white","25px SF","Press Space to move paddle");

            // Background (slightly transparent)
            dr(0,0,canvas.width,canvas.height,"rgba(0,0,0,0.7)");

            // Text and other graphics
            dt(190,150,"white","40px SF","Game Over");
            dt(215,200,"white","20px SF","Press R to restart");
            dt(170,240,"white","20px SF","Press M to return to the menu");
            if (newHigh) dt(10,60,"#78ff00","25px SF","High: " + localStorage.getItem("highScore") + " (New)");

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
                    x: Math.random() * 200,
                    y: 0,
                    w: 30,
                    h: 30,
                    c: "red",
                
                    xv: 7,
                    yv: 7,
                };
                score = 0;
                newHigh = false;
                gameState = 0;
            }
            if (77 in keysDown) {
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
                    x: Math.random() * 200,
                    y: 0,
                    w: 30,
                    h: 30,
                    c: "red",
                
                    xv: 7,
                    yv: 7,
                };
                score = 0;
                newHigh = false;
                gameState = 2;
            }
            break;
        
        case 2: // Menu
            listenForKeys();
            // Background
            dr(0,0,canvas.width,canvas.height,"black");

            // Ball
            dr(ball.x,ball.y,ball.w,ball.h,ball.c);
            ball.x += ball.xv;
            ball.y += ball.yv;
            if (collision(ball.x,ball.y,ball.w,ball.h,0,0,600,0)) ball.yv = -ball.yv;
            if (collision(ball.x,ball.y,ball.w,ball.h,0,0,0,400)) ball.xv = -ball.xv;
            if (collision(ball.x,ball.y,ball.w,ball.h,600,0,0,400)) ball.xv = -ball.xv;
            if (collision(ball.x,ball.y,ball.w,ball.h,0,400,600,0)) ball.yv = -ball.yv;

            // Transparent background
            dr(0,0,canvas.width,canvas.height,"rgba(0,0,0,0.45)");

            // Text
            dt(190,140,"white","50px SF","PongPing");
            dt(200,190,"white","25px SF","Pong with a twist");
            dt(210,275,"white","25px SF","Press S to start");
            dt(195,315,"white","25px SF","Press G for GitHub");
            dt(10,25,"white","20px SF","v1.04");
            dt(385,25,"white","20px SF","Made by Eliot Chignell");

            if (83 in keysDown) {
                ball = {
                    x: Math.random() * 200,
                    y: 0,
                    w: 30,
                    h: 30,
                    c: "red",
                
                    xv: 7,
                    yv: 7,
                };
                gameState = 0;
            }
            if (71 in keysDown) window.location = "https://github.com/EliotChignell/PongPing";

            break;
    }   
}

setInterval(mLoop, 1000/fps);