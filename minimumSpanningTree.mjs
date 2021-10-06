export let MST = [];
let sortedMST = [];

export function MSTGenerator(width, height) {
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
