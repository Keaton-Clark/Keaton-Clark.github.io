const board_border = 'black';
const board_background = 'darkgrey';
const snake_col = 'lightblue';
const snake_border = 'white';

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
]

let path = [
    [200,200]
]

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;


const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");
main();

gen_food();


function main() {
    if (has_game_ended()) {
        location.reload();
        return;
    }
    let head = [snake[0].x, snake[0].y];
    console.log(path.indexOf(head));
    let game_speed = tickSpeed();
    changing_direction = false;
    let gamemode = getGameMode();
    switch (gamemode) {
        case 0:
            document.addEventListener("keydown", change_direction);
            break;
    
        case 1:
            document.removeEventListener("keydown", change_direction);
            algorithm();
            break;
    }
    setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        main();
    }, game_speed)
}

function clear_board() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawFood() {
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function drawSnakePart(snakePart) {

    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
    food_x = random_food(0, snakeboard.width - 10);
    food_y = random_food(0, snakeboard.height - 10);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
}

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

function move_snake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        gen_food();
    } else {
        snake.pop();
    }
}

function change_direction_AI(dir) {

    const LEFT = 0;
    const UP = 1;
    const RIGHT = 2;
    const DOWN = 3;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (dir === LEFT && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (dir === UP && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (dir === RIGHT && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (dir === DOWN && !goingUp) {
        dx = 0;
        dy = 10;
    }
}


function tickSpeed() {
    var slider = document.getElementById("speedRange");
    var output = document.getElementById("speedOutput");
    output.innerHTML = parseInt(slider.value) // Display the default slider value
    slider.oninput = function () {
        output.innerHTML = this.value;
    }
    return 1000 / slider.value;
}

function getGameMode() {
    var slider = document.getElementById("gameRange");
    var output = document.getElementById("gameOutput");
    if (parseInt(slider.value) === 0) {
        output.innerHTML = "User";
    }
    if (parseInt(slider.value) === 1) {
        output.innerHTML = "Algorithm";
    }
    if (parseInt(slider.value) === 2) {
        output.innerHTML = "AI";
    }
    slider.oninput = function () {
        if (parseInt(slider.value) === 0) {
            output.innerHTML = "User";
        }
        if (parseInt(slider.value) === 1) {
            output.innerHTML = "Algorithm";
        }
        if (parseInt(slider.value) === 2) {
            output.innerHTML = "AI";
        }

    }
    return parseInt(slider.value);
}

function algorithm() {
    change_direction_AI(Math.floor(Math.random() * 3));
}

/*function generatePath() {
    for (let  = 0;  < array.length; ++) {
        const element = array[];
        
    }
}*/
