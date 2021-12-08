let width = 40;
let height = 40;

let path = [
	[0, 0],
	[1, 0]
];
let MST = [];
let sortedMST = [];

const board_border = 'black';
const board_background = 'darkgrey';
const snake_col = 'lightblue';
const snake_border = 'white';

let snake = [
	{ x: 10, y: 0 },
]

pathFinding(width, height);

let index = searchPath(snake[0].x/10, snake[0].y/10);


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
	if (index == path.length-1) {
		index = 0;
	}
	dx = 10 * (path[index+1][0]-path[index][0]);
	dy = 10 * (path[index+1][1]-path[index][1]);
	index++;
	

	if (has_game_ended()) {
		location.reload();
		return;
	}
	let game_speed = tickSpeed();
	changing_direction = false;
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


function algorithm() {
	change_direction_AI(Math.floor(Math.random() * 3));
}

function searchPath(x, y) {
	let KEEP_GOING = true;
	let index = 0;
	while(KEEP_GOING) {
		if(path[index][0] == x && path[index][1] == y) {
			return index;
		}
		index ++;
	}
}


/*----------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
*/

function MSTGenerator(width, height) {
	MSTRand(width, height);
	for (let i = 0; i < MST.length; i++) {
		sortedMST.push(MST[i]);
	}
	sortMST(sortedMST);
	createMST(sortedMST);
}

function MSTRand(width, height) {
	let i = 0;
	for (let y = 0; y < width; y++) {
		for (let x = 0; x < height; x++) {
			let x1 = x + 1
			let y1 = y + 1
			if (x1 < width) {
				MST.push({ index: i, initial: [x, y], final: [x1, y], weight: Math.random(), connect: true });
				i++;
			}
			if (y1 < height) {
				MST.push({ index: i, initial: [x, y], final: [x, y1], weight: Math.random(), connect: true });
				i++;
			}
		}

	}
}

function sortMST(list) {
	for (let i = 0; i < list.length - 1; i++) {
		let min = i;
		for (let j = i + 1; j < list.length; j++) {
			if (list[j].weight < list[min].weight) {
				min = j;
			}

		}
		var temp = list[min];
		list[min] = list[i];
		list[i] = temp;
	}
}

function createMST(sortedMST) {
	for (let index = 0; index < sortedMST.length; index++) {
		for (let i = index - 1; i >= 0; i--) {
			if (sortedMST[index].final[0] == sortedMST[i].final[0] && sortedMST[index].final[1] == sortedMST[i].final[1]) {
				sortedMST[index].connect = false;
			}

		}
	}
}


/*----------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
------------------------------------------------------------------
*/






function pathFinding(width, height) {
	MSTGenerator(width/2,height/2);
	let KEEP_GOING = true;
	var curr = path[path.length-1];
	var past = path[path.length-2];
	let x = 0;
	while(KEEP_GOING) {
		x++;
		if (checkWall(curr, past, width, height)) {
			right(curr, past);
		}
		else if(!checkRight(curr, past)) {
			right(curr, past);
		}
		else if(checkStraight(curr, past)) {
			left(curr, past);
		}
		else {
			straight(curr, past);
		}

		curr = path[path.length-1];
		past = path[path.length-2];
		
		if(curr[0] == path[0][0] && curr[1] == path[0][1]){
			KEEP_GOING = false;
			//path.pop();
			console.log(MST);
			console.log(path);
		}
	}
}

function straight(curr, past) {
	path.push([curr[0]+(curr[0]-past[0]), curr[1]+(curr[1]-past[1])]);
	//console.log("straight");
}

function right(curr, past) {
	path.push([(curr[0]-(curr[1]-past[1])), curr[1]+(curr[0]-past[0])]);
	//console.log("right");
}

function left(curr, past) {
	path.push([(curr[0]+(curr[1]-past[1])), curr[1]-(curr[0]-past[0])]);
}

function checkRight(curr, past) {
	let dirRight = [(curr[0]-(curr[1]-past[1])), curr[1]+(curr[0]-past[0])];
	let initial = [Math.floor((curr[0]-(dirRight[1]-curr[1]))/2), Math.floor((curr[1]+(dirRight[0]-curr[0]))/2)];
	let final = [Math.floor((curr[0]+(dirRight[1]-curr[1]))/2), Math.floor((curr[1]-(dirRight[0]-curr[0]))/2)];
	if (initial[0] <= final[0] && initial[1] <= final[1]) {
		//console.log(curr, dirRight, "|", initial, final);
		return MST[searchMST(initial, final)].connect;
	}
	else {
		//console.log(curr, dirRight, "|", final, initial);
		return MST[searchMST(final, initial)].connect;
	}
}

function checkStraight(curr, past) {
	let dirStraight = [curr[0]+(curr[0]-past[0]), curr[1]+(curr[1]-past[1])];
	if (dirStraight[0] == 0 && curr[0] == 0 || dirStraight[1] == 0 && curr[1] == 0 || dirStraight[0] == width-1 && curr[0] == width-1 || dirStraight[1] == height-1 && curr[1] == height-1) {
		return false;
	}
	else {
		let initial = [Math.floor((curr[0]-(dirStraight[1]-curr[1]))/2), Math.floor((curr[1]+(dirStraight[0]-curr[0]))/2)];
		let final = [Math.floor((curr[0]+(dirStraight[1]-curr[1]))/2), Math.floor((curr[1]-(dirStraight[0]-curr[0]))/2)];
		if (initial[0] <= final[0] && initial[1] <= final[1]) {
			//console.log(curr, dirStraight, "|", initial, final);
			return MST[searchMST(initial, final)].connect;
		}
		else {
			//console.log(curr, dirStraight, "|", final, initial);
			return MST[searchMST(final, initial)].connect;
		}
	}
}

function checkWall(curr, past, width, height) {
	if ((curr[0] == width-1 || curr[0] == 0) && (curr[1] == height-1 || curr[1] == 0)) {
		return true;
	}
	else if(curr[0]+curr[0]-past[0]==width||curr[0]+curr[0]-past[0]==-1||curr[1]+curr[1]-past[1]==height||curr[1]+curr[1]-past[1]==-1) {
		return true;
	}
	else {
		return false;
	} 
}

function searchMST(initial, final) {
	let i = ((initial[0] * 2) + (initial[1] * (width-1))) - initial[0];
	for (i; i < MST.length; i++) {
		if (initial[0] == MST[i].initial[0] && initial[1] == MST[i].initial[1] && final[0] == MST[i].final[0] && final[1] == MST[i].final[1])
			return i;
	}
	throw 'cannot find in MST';
}

