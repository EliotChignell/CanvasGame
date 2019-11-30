const canvas = document.querySelector("#mainCanvas");
const context = canvas.getContext("2d");

// https://api.myjson.com/bins/o7b8e

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
let username;
let password;
let loggedIn = false;
let loggedInUsername;
let userDataObject;
let alreadyUpdating = false;

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
var Sha256={hash:function(r,a){(a=void 0===a||a)&&(r=Utf8.encode(r));for(var t=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],e=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],o=(r+=String.fromCharCode(128)).length/4+2,n=Math.ceil(o/16),h=new Array(n),u=0;u<n;u++){h[u]=new Array(16);for(var S=0;S<16;S++)h[u][S]=r.charCodeAt(64*u+4*S)<<24|r.charCodeAt(64*u+4*S+1)<<16|r.charCodeAt(64*u+4*S+2)<<8|r.charCodeAt(64*u+4*S+3)}h[n-1][14]=8*(r.length-1)/Math.pow(2,32),h[n-1][14]=Math.floor(h[n-1][14]),h[n-1][15]=8*(r.length-1)&4294967295;var f,c,i,C,d,R,g,v,A=new Array(64);for(u=0;u<n;u++){for(var m=0;m<16;m++)A[m]=h[u][m];for(m=16;m<64;m++)A[m]=Sha256.sigma1(A[m-2])+A[m-7]+Sha256.sigma0(A[m-15])+A[m-16]&4294967295;f=e[0],c=e[1],i=e[2],C=e[3],d=e[4],R=e[5],g=e[6],v=e[7];for(m=0;m<64;m++){var O=v+Sha256.Sigma1(d)+Sha256.Ch(d,R,g)+t[m]+A[m],T=Sha256.Sigma0(f)+Sha256.Maj(f,c,i);v=g,g=R,R=d,d=C+O&4294967295,C=i,i=c,c=f,f=O+T&4294967295}e[0]=e[0]+f&4294967295,e[1]=e[1]+c&4294967295,e[2]=e[2]+i&4294967295,e[3]=e[3]+C&4294967295,e[4]=e[4]+d&4294967295,e[5]=e[5]+R&4294967295,e[6]=e[6]+g&4294967295,e[7]=e[7]+v&4294967295}return Sha256.toHexStr(e[0])+Sha256.toHexStr(e[1])+Sha256.toHexStr(e[2])+Sha256.toHexStr(e[3])+Sha256.toHexStr(e[4])+Sha256.toHexStr(e[5])+Sha256.toHexStr(e[6])+Sha256.toHexStr(e[7])},ROTR:function(r,a){return a>>>r|a<<32-r},Sigma0:function(r){return Sha256.ROTR(2,r)^Sha256.ROTR(13,r)^Sha256.ROTR(22,r)},Sigma1:function(r){return Sha256.ROTR(6,r)^Sha256.ROTR(11,r)^Sha256.ROTR(25,r)},sigma0:function(r){return Sha256.ROTR(7,r)^Sha256.ROTR(18,r)^r>>>3},sigma1:function(r){return Sha256.ROTR(17,r)^Sha256.ROTR(19,r)^r>>>10},Ch:function(r,a,t){return r&a^~r&t},Maj:function(r,a,t){return r&a^r&t^a&t},toHexStr:function(r){for(var a="",t=7;t>=0;t--)a+=(r>>>4*t&15).toString(16);return a}},Utf8={encode:function(r){var a=r.replace(/[\u0080-\u07ff]/g,function(r){var a=r.charCodeAt(0);return String.fromCharCode(192|a>>6,128|63&a)});return a=a.replace(/[\u0800-\uffff]/g,function(r){var a=r.charCodeAt(0);return String.fromCharCode(224|a>>12,128|a>>6&63,128|63&a)})},decode:function(r){var a=r.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(r){var a=(15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2);return String.fromCharCode(a)});return a=a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(r){var a=(31&r.charCodeAt(0))<<6|63&r.charCodeAt(1);return String.fromCharCode(a)})}};

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
            if (!loggedIn) dt(10,60,"white","25px SF","High: log in to save");
            if (loggedIn) dt(10,60,"white","25px SF","High: " + userDataObject[loggedInUsername].highScore);

            // Instructions
            dt(260,30,"white","25px SF","Press Space to move paddle")

            /*
            if (collision(ball.x,ball.y,ball.w,ball.h,0,400,600,0) ||
                collision(ball.x,ball.y,ball.w,ball.h,0,0,600,0) ||
                collision(ball.x,ball.y,ball.w,ball.h,0,0,0,400) ||
                collision(ball.x,ball.y,ball.w,ball.h,600,0,0,400)) reverseVelocity();
            */

            if (collision(ball.x,ball.y,ball.w,ball.h,0,400,600,0) || ball.y >= 350) {
                if (loggedIn && !alreadyUpdating) {
                    alreadyUpdating = true;
                    $.get("https://api.myjson.com/bins/o7b8e", async (data, textStatus, jqXHR) => {
                        let jsonObject = data;
                        if (score > data[loggedInUsername].highScore) newHigh = true;
                        jsonObject[loggedInUsername] = {
                            password: data[loggedInUsername].password,
                            highScore: (newHigh) ? score : data[loggedInUsername].highScore,
                            totalScore: data[loggedInUsername].totalScore + score,
                            timesPlayed: data[loggedInUsername].timesPlayed + 1
                        };
                        userDataObject = jsonObject;
                        $.ajax({
                            url:"https://api.myjson.com/bins/o7b8e",
                            type:"PUT",
                            data: JSON.stringify(jsonObject),
                            contentType:"application/json; charset=utf-8",
                            dataType:"json",
                            success: function(data, textStatus, jqXHR){
                                alreadyUpdating = false;
                                gameState = 1;
                            }
                        });  
                    });
                } else {
                    gameState = 1;
                }
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
            listenForKeys();
            // Previous stuff
            dr(paddle.x,paddle.y,paddle.w,paddle.h,paddle.c);
            dr(ball.x,ball.y,ball.w,ball.h,ball.c);
            dt(10,30,"white","25px SF","Score: " + score);
            if (!loggedIn) dt(10,60,"white","25px SF","High: log in to save");
            if (loggedIn && !newHigh) dt(10,60,"white","25px SF","High: " + userDataObject[loggedInUsername].highScore);
            dt(260,30,"white","25px SF","Press Space to move paddle");

            // Background (slightly transparent)
            dr(0,0,canvas.width,canvas.height,"rgba(0,0,0,0.7)");

            // Text and other graphics
            dt(190,150,"white","40px SF","Game Over");
            dt(215,200,"white","20px SF","Press R to restart");
            dt(170,240,"white","20px SF","Press M to return to the menu");
            if (newHigh && loggedIn) dt(10,60,"#78ff00","25px SF","High: " + userDataObject[loggedInUsername].highScore + " (New)");

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
                delete keysDown[82];
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
            dt(210,275,"white","25px SF","Press B to begin");
            dt(195,315,"white","25px SF","Press G for GitHub");
            if (!loggedIn) dt(10,375,"white","25px SF","(L)og in");
            if (loggedIn) dt(10,375,"white","25px SF","(L)ogged in as " + loggedInUsername);
            if (loggedIn) dt(10,340,"white","25px SF","(U)ser info");
            dt(475,375,"white","25px SF","(S)ign up");
            dt(10,25,"white","20px SF","v1.06");
            dt(385,25,"white","20px SF","Made by Eliot Chignell");

            if (66 in keysDown) {
                ball = {
                    x: Math.random() * 200,
                    y: 0,
                    w: 30,
                    h: 30,
                    c: "red",
                
                    xv: 7,
                    yv: 7,
                };
                delete keysDown[66];
                gameState = 0;
            }
            if (71 in keysDown) window.location = "https://github.com/EliotChignell/PongPing";
            if (76 in keysDown) {
                username = prompt("Username:");
                password = prompt("Password:");
                $.get("https://api.myjson.com/bins/o7b8e", (data,textStatus,jqXHR) => {
                    if (data[username]) {
                        if (Sha256.hash(password) == data[username].password) {
                            alert("Logged in as " + username);
                            loggedIn = true;
                            loggedInUsername = username;
                            userDataObject = data;
                        } else {
                            alert("Incorrect password for user " + username);
                        }
                    } else {
                        alert("The username " + username + " is invalid.");
                    }
                });
                delete keysDown[76];
                gameState = 2;
            }
            if (83 in keysDown) {
                username = prompt("Username:");
                password = prompt("Password:");
                $.get("https://api.myjson.com/bins/o7b8e", (data,textStatus,jqXHR) => {
                    if (!data[username]) {
                        let jsonObject = data;
                        jsonObject[username] = {
                            password: Sha256.hash(password),
                            highScore: 0,
                            totalScore: 0,
                            timesPlayed: 0
                        };
                        $.ajax({
                            url:"https://api.myjson.com/bins/o7b8e",
                            type:"PUT",
                            data: JSON.stringify(jsonObject),
                            contentType:"application/json; charset=utf-8",
                            dataType:"json",
                            success: function(data, textStatus, jqXHR){
                                alert("You have signed up!\nLog back in to start.");
                                delete keysDown[83];
                                gameState = 2;
                            }
                        });  
                    } else {
                        alert("Sorry, that username is taken.");
                        delete keysDown[83];
                        gameState = 2;
                    }
                });
                delete keysDown[83];
            }
            if (85 in keysDown && loggedIn) {
                $.get("https://api.myjson.com/bins/o7b8e", (data,textStatus,jqXHR) => {
                    if (data[loggedInUsername]) {
                        userDataObject = data;
                        delete keysDown[66];
                        gameState = 3;
                    } else {
                        alert("An error occured. Code: userStatsRequest");
                    }
                    
                });
            }
            break;
        
        case 3:
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
            dt(200,100,"white","45px SF","User Info");
            dt(210,180,"white","25px SF","High Score: " + userDataObject[loggedInUsername].highScore);
            dt(210,220,"white","25px SF","Total Score: " + userDataObject[loggedInUsername].totalScore);
            dt(210,260,"white","25px SF","Games Played: " + userDataObject[loggedInUsername].timesPlayed);
            dt(210,300,"white","25px SF","Average Score: " + Math.round((userDataObject[loggedInUsername].totalScore / userDataObject[loggedInUsername].timesPlayed) * 10) / 10);
            dt(210,360,"white","25px SF","Press B to go back");

            if (66 in keysDown) {
                delete keysDown[66];
                gameState = 2;
            }
            break;
    }
}

setInterval(mLoop, 1000/fps);