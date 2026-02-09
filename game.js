// Snake Game - Main game logic
// Controls: Arrow keys to move the snake around the board

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// TODO: Add difficulty levels (easy, medium, hard)

const MAX_SCORE = 100;

var snakeBody = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }
];

let dx = 20;
let dy = 0;
var game_over = false;

// Draw a faint grid on the canvas to help with alignment
function drawGrid() {
    ctx.strokeStyle = '#2a2a3e';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < 800; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 600);
        ctx.stroke();
    }
    for (let y = 0; y < 600; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(800, y);
        ctx.stroke();
    }
}

// Resets the game state back to initial values
function resetGame() {
    snakeBody = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];
    dx = 20;
    dy = 0;
    game_over = false;
}

// Clear the canvas and redraw everything
function clearCanvas() {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 800, 600);
}

// Draws a rounded rectangle for each snake segment
function drawSnake() {
    snakeBody.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#66BB6A';
        } else {
            ctx.fillStyle = '#4CAF50';
        }
        ctx.fillRect(segment.x, segment.y, 20, 20);

        ctx.strokeStyle = '#388E3C';
        ctx.lineWidth = 1;
        ctx.strokeRect(segment.x, segment.y, 20, 20);
    });
}

// Move the snake by adding a new head and removing the tail
function moveSnake() {
    const head = {
        x: snakeBody[0].x + dx,
        y: snakeBody[0].y + dy
    };

    snakeBody.unshift(head);
    snakeBody.pop();
}

// Check if the snake has hit the wall
function checkCollision() {
    const head = snakeBody[0];

    if (head.x < 0 || head.x >= 800 || head.y < 0 || head.y >= 600) {
        game_over = true;
    }

    // Check self-collision (skip head)
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[i].x === head.x && snakeBody[i].y === head.y) {
            game_over = true;
        }
    }
}

// Handle keyboard input for snake direction
// Supports both arrow keys and WASD controls
function handleKeyPress(e) {
    const key = e.key;

    if (key === 'ArrowUp' || key === 'w' || key === 'W') {
        dx = 0;
        dy = -20;
    } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
        dx = 0;
        dy = 20;
    } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
        dx = -20;
        dy = 0;
    } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
        dx = 20;
        dy = 0;
    }
}

document.addEventListener('keydown', handleKeyPress);

// Main game loop - updates position and redraws the canvas
function gameLoop() {
    if (game_over) return;

    moveSnake();
    checkCollision();

    if (game_over) return;

    clearCanvas();
    drawGrid();
    drawSnake();
}

// Start the game - runs at 10 frames per second
setInterval(gameLoop, 100);

// Enable testing in Node.js
if (typeof module !== 'undefined') {
    module.exports = {
        get snakeBody() { return snakeBody; },
        get dx() { return dx; },
        get dy() { return dy; },
        get game_over() { return game_over; },
        moveSnake,
        handleKeyPress,
        checkCollision,
        resetGame
    };
}
