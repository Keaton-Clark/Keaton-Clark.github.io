
MST = [];
sortedMST = [];
path = [
    [0, 0],
    [1, 0]
];

MSTGenerator(20, 20);
function MSTGenerator(width, height) {
    MSTRand(width, height);
    for (let i = 0; i < MST.length; i++) {
        sortedMST.push(MST[i]);
    }
    sortMST(sortedMST);
    createMST(sortedMST);
}

function circuitGenerator(width, height) {
    while (path[0][0] != path[path.length - 1][0] && path[0][1] != path[path.length - 1][1]) {
        
    }
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
                MST.push({ index: i, initial: [x, y], final: [x1, y], weight: Math.random(), connect: "true" });
                i++;
            }
            if (y1 < height) {
                MST.push({ index: i, initial: [x, y], final: [x, y1], weight: Math.random(), connect: "true" });
                i++;
            }
            /*if (x1 < width) {
                MST.push({ x0: x, x1: x1, y0: y, y1: y, weight: Math.random(), connect: "true" });
            }
            if (y1 < height) {
                MST.push({ x0: x, x1: x, y0: y, y1: y1, weight: Math.random(), connect: "true" });
            }*/
        }

    }
}


function createMST(sortedMST) {
    for (let index = 0; index < sortedMST.length; index++) {
        for (let i = index - 1; i >= 0; i--) {
            if (sortedMST[index].final[0] == sortedMST[i].final[0] && sortedMST[index].final[1] == sortedMST[i].final[1]) {
                sortedMST[index].connect = "false";
            }

        }
    }
}

function searchMST(initial, final) {
    let i = ((initial[0] * 2) + (initial[1]*39)) - initial[0];
    for (i; i < MST.length; i++) {
        if (initial[0] == MST[i].initial[0] && initial[1] == MST[i].initial[1] && final[0] == MST[i].final[0] && final[1] == MST[i].final[1])
            return i;
    }
    return -1;
}


