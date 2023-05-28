let canvas = document.getElementById("pongCanvas");
let context = canvas.getContext("2d");

// Create the pong paddle
let paddleWidth = 15, paddleHeight = 80;
let player = { x: 0, y: canvas.height / 2, width: paddleWidth, height: paddleHeight, dy: 4};
let computer = { x: canvas.width - paddleWidth, y: canvas.height / 2, width: paddleWidth, height: paddleHeight, dy: 2};

// Create the pong ball
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speed: 2, dx: 2, dy: 2};

// Draw the paddles and ball
function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

// Move the paddles
function movePaddle(paddle, upKey, downKey) {
    document.addEventListener('keydown', function(event) {
        switch(event.keyCode) {
            case upKey:
                paddle.y -= paddle.dy;
                break;
            case downKey:
                paddle.y += paddle.dy;
                break;
        }
    });
}

// Update the canvas
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(player.x, player.y, player.width, player.height, '#008000');
    drawRect(computer.x, computer.y, computer.width, computer.height, '#800000');
    drawCircle(ball.x, ball.y, ball.radius, '#000080');
    ball.x += ball.dx;
    ball.y += ball.dy;
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1; // reverse ball direction
    }
    // AI for the computer paddle
    if(ball.y < computer.y) {
        computer.y -= computer.dy;
    }
    if(ball.y > computer.y + computer.height) {
        computer.y += computer.dy;
    }
    // Ball and paddle collision logic
    if(ball.y + ball.radius > player.y && ball.y - ball.radius < player.y + player.height && ball.dx < 0) {
        if(ball.x - ball.radius < player.x + player.width) {
            ball.dx *= -1;
        }
    }
    if(ball.y + ball.radius > computer.y && ball.y - ball.radius < computer.y + computer.height && ball.dx > 0) {
        if(ball.x + ball.radius > computer.x) {
            ball.dx *= -1;
        }
    }
    // Give some score and reset the ball
    if(ball.x + ball.radius > canvas.width) { // player scores
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }
    if(ball.x - ball.radius < 0) { // computer scores
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }
    // Prevent the paddles from going through the edge
    if(player.y < 0) player.y = 0;
    if(player.y > canvas.height - player.height) player.y = canvas.height - player.height;
    if(computer.y < 0) computer.y = 0;
    if(computer.y > canvas.height - computer.height) computer.y = canvas.height - computer.height;
}

// Call update function every 20 ms
setInterval(update, 20);
movePaddle(player, 87, 83); // W and S for the player paddle
