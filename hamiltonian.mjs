import { MST } from "./minimumSpanningTree.mjs";
import { MSTGenerator } from "./minimumSpanningTree.mjs";
import { height } from "./snake.js";
import { width } from "./snake.js";

export let path = [
    [0, 0],
    [1, 0]
];




export function pathFinding(width, height) {
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
            path.pop();
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

