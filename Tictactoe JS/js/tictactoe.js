const cell = [
    document.getElementById("B0"),
    document.getElementById("B1"),
    document.getElementById("B2"),
    document.getElementById("B3"),
    document.getElementById("B4"),
    document.getElementById("B5"),
    document.getElementById("B6"),
    document.getElementById("B7"),
    document.getElementById("B8")
]

var gameArray = ['','','','','','','','','']
var aiArray = []

var player = 'X';
var gamerunning = true;
var ai = true;

const winCons = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function clearBoard() {
    cell.forEach(element => {
        element.textContent = '';
    });
    gameArray = ['','','','','','','','',''];
    player = 'X';
    document.getElementById("gametext").textContent = "GAME ON!";
    gamerunning = true;
    cell.forEach(element => {
        element.style.backgroundColor = "#EEEEEE";
        
    });
}

function placeMark(id) {
    if (gamerunning == false)return;

    if (cell[id].textContent == 'X' || cell[id].textContent == 'O')return;

    cell[id].textContent = player;
    gameArray[id] = player;
    checkWin();
    if (player == 'X') player = 'O';
        else player = 'X';
    if (ai == true && player == 'O') placeMark(aiDecision());
}

function checkWin(){
    for (var i = 0; i < winCons.length; i++){
        if ((gameArray[winCons[i][0]] == player) && (gameArray[winCons[i][1]] == player) && (gameArray[winCons[i][2]] == player)){
            document.getElementById("gametext").textContent = String(player) + " WON!";
            gamerunning = false;
            cell[winCons[i][0]].style.backgroundColor = 'green';
            cell[winCons[i][1]].style.backgroundColor = 'green';
            cell[winCons[i][2]].style.backgroundColor = 'green';
        }
    }

    if (!gameArray.includes('') && gamerunning == true){
        document.getElementById("gametext").textContent = "CATS GAME";
        for (i=0;i<9;i++)
        {
            if (i != 4 || i != 5) cell[i].style.backgroundColor = 'orange';
        }
    }
    return;
}

function aiDecision(){
    let aiDecision;
    aiArray = ['','','','','','','','',''];
    let checkArray = [];
    let checkVar = "";
    let rand = -1;

    // Determine what cells are empty and available to place into
    for (let i = 0; i < gameArray.length; i++){
        if (gameArray[i] != '') aiArray[i] = 'N';
    }

    // Determine wins and blocks
    for (let i = 0; i < winCons.length; i++){
        checkVar = gameArray[winCons[i][0]] + gameArray[winCons[i][1]] + gameArray[winCons[i][2]]

        if (checkVar == "OO"){            
            if (gameArray[winCons[i][0]] == '') aiArray[winCons[i][0]] = "OO";
            if (gameArray[winCons[i][1]] == '') aiArray[winCons[i][1]] = "OO";
            if (gameArray[winCons[i][2]] == '') aiArray[winCons[i][2]] = "OO";
        }
        
        if (checkVar == "XX"){
            if (gameArray[winCons[i][0]] == '') aiArray[winCons[i][0]] = "XX";
            if (gameArray[winCons[i][1]] == '') aiArray[winCons[i][1]] = "XX";
            if (gameArray[winCons[i][2]] == '') aiArray[winCons[i][2]] = "XX";
        }
    }

    if (aiArray.includes("OO") == true){
        checkArray = getAllIndexes(aiArray, "OO");
    }
    else if (aiArray.includes("XX") == true){
        checkArray = getAllIndexes(aiArray, "XX");
    }
    else{
        checkArray = getAllIndexes(aiArray, '');
    }

    console.log(aiArray);
    rand = Math.floor(Math.random() * checkArray.length);
    aiDecision = checkArray[rand];
    console.log("AI decision is: " + aiDecision) 
    return aiDecision;
}

// Gets indexes of every matching value in an array
function getAllIndexes(array, value) {
    var indexes = [];
    for(i = 0; i < array.length; i++)
        if (array[i] === value)
            indexes.push(i);
    return indexes;
}

document.getElementById("gametext").textContent = "This is a GAME";