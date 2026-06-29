const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restart");
const resetBtn = document.getElementById("reset");

const modeSelect = document.getElementById("mode");
const difficultySelect = document.getElementById("difficulty");

const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");
const drawScoreText = document.getElementById("drawScore");

const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const drawSound = document.getElementById("drawSound");

const winLine = document.getElementById("winLine");

let gameBoard = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let running = true;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const wins = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

initialize();

function initialize(){

    cells.forEach(cell=>{

        cell.addEventListener("click",cellClicked);

    });

    restartBtn.addEventListener("click",restartGame);

    resetBtn.addEventListener("click",resetScores);

    modeSelect.addEventListener("change",restartGame);

    difficultySelect.addEventListener("change",restartGame);

    statusText.textContent="Player X Turn";

}

function cellClicked(){

    const index=parseInt(this.dataset.index);

    if(!running){

        return;

    }

    if(gameBoard[index]!=""){

        this.classList.add("shake");

        setTimeout(()=>{

            this.classList.remove("shake");

        },350);

        return;

    }

    makeMove(index,currentPlayer);

    checkWinner();

    if(!running){

        return;

    }

    if(modeSelect.value==="bot" && currentPlayer==="O"){

        setTimeout(botMove,400);

    }

}

function makeMove(index,player){

    gameBoard[index]=player;

    cells[index].textContent=player;

    cells[index].classList.add(player.toLowerCase());

    clickSound.currentTime=0;
    clickSound.play().catch(()=>{});

    currentPlayer=player==="X" ? "O" : "X";

    statusText.textContent="Player "+currentPlayer+" Turn";

}

function checkWinner(){

    let won=false;

    let combo=[];

    for(let i=0;i<wins.length;i++){

        const [a,b,c]=wins[i];

        if(

            gameBoard[a]!="" &&

            gameBoard[a]===gameBoard[b] &&

            gameBoard[a]===gameBoard[c]

        ){

            won=true;

            combo=[a,b,c];

            break;

        }

    }

    if(won){

        running=false;

        const winner=currentPlayer==="X" ? "O" : "X";

        showWinner(combo,winner);

        return;

    }

    if(!gameBoard.includes("")){

        running=false;

        drawScore++;

        drawScoreText.textContent=drawScore;

        statusText.textContent="Draw Game";

        statusText.className="status draw";

        drawSound.currentTime=0;
        drawSound.play().catch(()=>{});

    }

}
function showWinner(combo,winner){

    combo.forEach(index=>{

        cells[index].classList.add("win");

    });

    drawWinningLine(combo);

    if(winner==="X"){

        xScore++;

        xScoreText.textContent=xScore;

        statusText.textContent="Player X Wins!";

        statusText.className="status win";

        winSound.currentTime=0;
        winSound.play().catch(()=>{});

    }else{

        oScore++;

        oScoreText.textContent=oScore;

        if(modeSelect.value==="bot"){

            statusText.textContent="Computer Wins!";

            statusText.className="status lose";

            loseSound.currentTime=0;
            loseSound.play().catch(()=>{});

        }else{

            statusText.textContent="Player O Wins!";

            statusText.className="status win";

            winSound.currentTime=0;
            winSound.play().catch(()=>{});

        }

    }

}

function drawWinningLine(combo){

    const map={

        "0,1,2":{left:"6%",top:"16.5%",rotate:0},

        "3,4,5":{left:"6%",top:"49.8%",rotate:0},

        "6,7,8":{left:"6%",top:"83.2%",rotate:0},

        "0,3,6":{left:"16.5%",top:"6%",rotate:90},

        "1,4,7":{left:"49.8%",top:"6%",rotate:90},

        "2,5,8":{left:"83.2%",top:"6%",rotate:90},

        "0,4,8":{left:"8%",top:"8%",rotate:45},

        "2,4,6":{left:"92%",top:"8%",rotate:-45}

    };

    const key=combo.join(",");

    const pos=map[key];

    if(!pos){

        return;

    }

    winLine.style.width="0";

    winLine.style.left=pos.left;

    winLine.style.top=pos.top;

    winLine.style.transform=`rotate(${pos.rotate}deg)`;

    requestAnimationFrame(()=>{

        winLine.style.width="88%";

    });

}

function restartGame(){

    gameBoard=["","","","","","","","",""];

    currentPlayer="X";

    running=true;

    statusText.textContent="Player X Turn";

    statusText.className="status";

    winLine.style.width="0";

    cells.forEach(cell=>{

        cell.textContent="";

        cell.className="cell";

    });

}

function resetScores(){

    xScore=0;

    oScore=0;

    drawScore=0;

    xScoreText.textContent="0";

    oScoreText.textContent="0";

    drawScoreText.textContent="0";

    restartGame();

}

function botMove(){

    if(!running){

        return;

    }

    let move;

    switch(difficultySelect.value){

        case "easy":

            move=easyMove();

            break;

        case "medium":

            move=mediumMove();

            break;

        case "hard":

            move=hardMove();

            break;

    }

    if(move!==undefined){

        makeMove(move,"O");

        checkWinner();

    }

}

function getEmptyCells(){

    const empty=[];

    for(let i=0;i<gameBoard.length;i++){

        if(gameBoard[i]===""){

            empty.push(i);

        }

    }

    return empty;

}

function easyMove(){

    const empty=getEmptyCells();

    return empty[Math.floor(Math.random()*empty.length)];

}

function mediumMove(){

    if(Math.random()<0.7){

        return hardMove();

    }

    return easyMove();

}
function hardMove(){

    let bestScore = -Infinity;
    let move = -1;

    for(let i = 0; i < gameBoard.length; i++){

        if(gameBoard[i] === ""){

            gameBoard[i] = "O";

            let score = minimax(gameBoard, 0, false);

            gameBoard[i] = "";

            if(score > bestScore){

                bestScore = score;
                move = i;

            }

        }

    }

    return move;

}

function minimax(boardState, depth, isMaximizing){

    const result = evaluate(boardState);

    if(result !== null){

        return result;

    }

    if(isMaximizing){

        let bestScore = -Infinity;

        for(let i = 0; i < boardState.length; i++){

            if(boardState[i] === ""){

                boardState[i] = "O";

                let score = minimax(boardState, depth + 1, false);

                boardState[i] = "";

                bestScore = Math.max(score, bestScore);

            }

        }

        return bestScore;

    }

    else{

        let bestScore = Infinity;

        for(let i = 0; i < boardState.length; i++){

            if(boardState[i] === ""){

                boardState[i] = "X";

                let score = minimax(boardState, depth + 1, true);

                boardState[i] = "";

                bestScore = Math.min(score, bestScore);

            }

        }

        return bestScore;

    }

}

function evaluate(boardState){

    for(const pattern of wins){

        const [a,b,c] = pattern;

        if(

            boardState[a] !== "" &&

            boardState[a] === boardState[b] &&

            boardState[a] === boardState[c]

        ){

            if(boardState[a] === "O"){

                return 10;

            }

            return -10;

        }

    }

    if(boardState.every(cell => cell !== "")){

        return 0;

    }

    return null;

}