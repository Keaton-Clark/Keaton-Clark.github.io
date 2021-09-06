MST = [];
sortedMST = [];
path = [
    { point: [0, 0], direction: 'up' },
    { point: [1, 0], direction: 'right' }
];

circuitGenerator(4, 4);

function MSTGenerator(width, height) {
    MSTRand(width, height);
    for (let i = 0; i < MST.length; i++) {
        sortedMST.push(MST[i]);
    }
    sortMST(sortedMST);
    createMST(sortedMST);
}

function circuitGenerator(width, height) {
    MSTGenerator(width / 2, height / 2);
    var direction, x, y;
    console.log(MST);
    for (let index = 1; index < (width * height) - 1; index++) {
        console.log(path[index]);
        direction = path[index].direction;
        x = path[index].point[0];
        y = path[index].point[1];
        if ((x == width -1 || x == 0) && (y == height - 1 || y == 0)) {
            direction = turnRight(direction);
        }
        else if (checkRight(index) == false){
            direction = turnRight(direction);
            console.log(checkRight(index));
        }
        

        if (direction == 'down') {
            path.push({ point: [path[index].point[0], path[index].point[1] + 1], direction: 'down' });
        }

        if (direction == 'up') {
            path.push({ point: [path[index].point[0], path[index].point[1] - 1], direction: 'up' });
        }

        if (direction == 'right') {
            path.push({ point: [path[index].point[0] + 1, path[index].point[1]], direction: 'right' });
        }

        if (direction == 'left') {
            path.push({ point: [path[index].point[0] - 1, path[index].point[1]], direction: 'left' });
        }
    }
    console.log(path);
    console.log("-----------------------------------");
    console.log(MST);
}


function randomNumber(x) {
    return Math.floor(Math.random() * x);
}

function sortMST(list) {
    for (let i = 0; i < list.length - 1; i++) {
        min = i;
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


function createMST(sortedMST) {
    for (let index = 0; index < sortedMST.length; index++) {
        for (let i = index - 1; i >= 0; i--) {
            if (sortedMST[index].final[0] == sortedMST[i].final[0] && sortedMST[index].final[1] == sortedMST[i].final[1]) {
                sortedMST[index].connect = false;
            }

        }
    }
}

function searchMST(initial, final) {
    let i = ((initial[0] * 2) + (initial[1] * 39)) - initial[0];
    for (i; i < MST.length; i++) {
        if (initial[0] == MST[i].initial[0] && initial[1] == MST[i].initial[1] && final[0] == MST[i].final[0] && final[1] == MST[i].final[1])
            return i;
    }
    return -1;
}

function turnRight(direction) {
    switch (direction) {
        case 'down':
            return 'left';
            break;
        case 'left':
            return 'up';
            break;
        case 'up':
            return 'right';
            break;
        case 'right':
            return 'down';
            break;
    }

}

function turnLeft(direction) {
    switch (direction) {
        case 'down':
            return 'right';
            break;
        case 'left':
            return 'down';
            break;
        case 'up':
            return 'left';
            break;
        case 'right':
            return 'up';
            break;
    }
}

function checkRight(index) {
    let x = path[index].point[0];
    let y = path[index].point[1];
    let direction = path[index].direction;
    var line;
    switch (direction) {
        case 'down':
            line = [[Math.floor((x-1)/2), Math.floor((y-1)/2)], [Math.floor((x-1)/2), Math.floor(((y-1)/2)+1)]];
            break;
        case 'left':
            line = [[Math.floor((x-1)/2), Math.floor((y-1)/2)], [Math.floor(((x-1)/2)+1), Math.floor((y-1)/2)]];  
            break;
        case 'up':
            line = [[Math.floor((x-1)/2), Math.floor((y-1)/2)], [Math.floor((x-1)/2), Math.floor(((y-1)/2)+1)]];  
            break;
        case 'right':
            line = [[Math.floor((x-1)/2), Math.floor((y+1)/2)], [Math.floor(((x-1)/2)+1), Math.floor((y+1)/2)]];
            break;
    }
    
    console.log(line);
    //console.log(line[0], line[1]);
    return MST[searchMST(line[0], line[1])].connect;
}

function checkForward(index) {
    let x = path[index].point[0];
    let y = path[index].point[1];
    let direction = path[index].direction;
    var line;
    switch (direction) {
        case 'down':
            line = [[Math.floor((x-1)/2), Math.floor((y-1)/2)], [Math.floor((x-1)/2), Math.floor(((y-1)/2)+1)]];
            break;
        case 'left':
            return 'left'
            break;
        case 'up':
            return 'up';
            break;
        case 'right':
            return 'right';
            break;
    }
    return MST[searchMST(line[0], line[1])].connect;
}