const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Grid size and snake setup
const gridSize = 20;
let snake = [{x: 160, y: 160}];
let direction = {x: 0, y: 0};
let food = {x: 320, y: 320};
let score = 0;
let isGameOver = false;

document.addEventListener('keydown', changeDirection);

// Change direction based on arrow keys
function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction.x === 0) { // Left arrow
        direction = {x: -gridSize, y: 0};
    } else if (key === 38 && direction.y === 0) { // Up arrow
        direction = {x: 0, y: -gridSize};
    } else if (key === 39 && direction.x === 0) { // Right arrow
        direction = {x: gridSize, y: 0};
    } else if (key === 40 && direction.y === 0) { // Down arrow
        direction = {x: 0, y: gridSize};
    }
}

function updateGame() {
    if (isGameOver) return;

    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Check for collisions with walls or itself
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snakeCollision(head)) {
        endGame();
        return;
    }

    // Snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
        createFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
    drawGame();
}

// Draw the snake and food on the canvas
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach(segment => {
        ctx.fillStyle = 'limegreen';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Check if the snake collides with itself
function snakeCollision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

// Generate new food in a random location
function createFood() {
    food = {
        x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize
    };
}

// End the game
function endGame() {
    isGameOver = true;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Poppins';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
}

// Restart the game
function restartGame() {
    snake = [{x: 160, y: 160}];
    direction = {x: 0, y: 0};
    score = 0;
    isGameOver = false;
    document.getElementById('score').textContent = 'Score: 0';
    createFood();
    drawGame();
}

setInterval(updateGame, 100);
