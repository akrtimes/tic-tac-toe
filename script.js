let playerInfo=document.getElementById("player-info");
let box=document.getElementsByClassName("box");
let newGameBtn=document.getElementById("new-game-btn");
let grid;
let currentPlayer;
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function init(){
    currentPlayer="X";
    grid=[
        "", "", "", "", "", "", "", "", ""
    ];
    playerInfo.innerText=`Current Player - ${currentPlayer}`;
    newGameBtn.style.scale="0";
    for(let i=0; i<9; i++)
    {
        box[i].innerText="";
        box[i].style.pointerEvents="all";
        box[i].classList.remove("win");
    }

}
init();

newGameBtn.addEventListener("click", ()=>{
    init();
});

for(let i=0; i<9; i++) {
    box[i].addEventListener("click", ()=>{
        clickHandle(i)
    });
}


function clickHandle(i) {
    if(grid[i]==="") {
        grid[i]=currentPlayer;
        box[i].innerHTML=currentPlayer;
        box[i].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}
function swapTurn() {
    if(currentPlayer==="X"){
        currentPlayer="O";
    } else {
        currentPlayer="X";
    }
    playerInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer="";
    for(let i=0; i<winningPosition.length; i++)
    {
        if((grid[winningPosition[i][0]] !="" ||
        grid[winningPosition[i][1]] !=="" || 
        grid[winningPosition[i][2]] !=="") &&
        (grid[winningPosition[i][0]]===grid[winningPosition[i][1]] && 
        grid[winningPosition[i][1]]===grid[winningPosition[i][2]]))
        {
            if(grid[winningPosition[i][0]]==="X"){
                answer="X";
            }else{
                answer="O";
            }
            for(let i=0; i<9; i++)
            {
                box[i].style.pointerEvents="none";
            }
            box[winningPosition[i][0]].classList.add("win");
            box[winningPosition[i][1]].classList.add("win");
            box[winningPosition[i][2]].classList.add("win");
            newGameBtn.style.scale="1";
        }
    }
    if(answer!=="")
    {
        playerInfo.innerText=`Winner Player - ${answer}`;
        return;
    }

    let fillCount=0;
    for(let i=0; i<9; i++)
    {
        if(grid[i]!==""){
            fillCount++;
        }
    }
    if(fillCount===9)
    {
        playerInfo.innerText="Game Tied";
        newGameBtn.style.scale="1";
    }
}