const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const snake = [{x: 160, y: 160}];
let direction = {x: 0, y: 0};
let food = {x: 320, y: 320};
let score = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction.x === 0) {
        direction = {x: -gridSize, y: 0};
    } else if (key === 38 && direction.y === 0) {
        direction = {x: 0, y: -gridSize};
    } else if (key === 39 && direction.x === 0) {
        direction = {x: gridSize, y: 0};
    } else if (key === 40 && direction.y === 0) {
        direction = {x: 0, y: gridSize};
    }
}

function update() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Game Over Conditions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snakeCollision(head)) {
        resetGame();
        return;
    }

    // Snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        createFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function snakeCollision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize
    };
}

function resetGame() {
    snake.length = 1;
    snake[0] = {x: 160, y: 160};
    direction = {x: 0, y: 0};
    score = 0;
    createFood();
}

setInterval(update, 100);
