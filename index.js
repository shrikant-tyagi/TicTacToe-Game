const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;
let flag = false;

function restart(){
    initGame();
}

function initGame(){
    currentPlayer = 'X';
    flag = false;
    gameGrid = ["","","","","","","","",""];
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    boxes.forEach((box, index)  => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win-active");
    });

    newGameBtn.classList.remove("active");
}
initGame();

let win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

boxes.forEach((box,index) => {
    box.addEventListener("click" , () => {
        handleClick(index);
    });
});

function handleClick(index){
    if(boxes[index].innerText === ""){
    boxes[index].innerText = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    gameGrid[index] = currentPlayer;

    checkWin();
    turnChange();

    }
}

function checkWin(){

    win.forEach(position => {
        if((gameGrid[position[0]] !== '' || gameGrid[position[1]] !== '' || gameGrid[position[2]] !== '')
        && gameGrid[position[0]] === gameGrid[position[1]] &&
         gameGrid[position[1]] === gameGrid[position[2]]){
            newGameBtn.classList.add("active");

            boxes[position[0]].classList.add("win-active");
            boxes[position[1]].classList.add("win-active");
            boxes[position[2]].classList.add("win-active");

            boxes.forEach(box => {
                box.style.pointerEvents = "none";
            })

            flag = true;

        }
    });

    if(flag == true){
      handleInfo();
      return;
    }

    let cnt = 0;

    gameGrid.forEach(box => {
        if(box !== '')
          cnt++;
    });

    if(cnt == 9)
      {
        flag = 'tied';
        newGameBtn.classList.add('active');
        handleInfo();
      }

}

function turnChange(){
    if(flag == false){
        if(currentPlayer === 'X')
        currentPlayer = '0';

        else
        currentPlayer = 'X';
    }

    handleInfo();
}

function handleInfo(){

    if(flag == false)
      gameInfo.innerText = `Current Player - ${currentPlayer}`;

    else if(flag == true)
      gameInfo.innerText = `Winner Player - ${currentPlayer}`;

    else
      gameInfo.innerText = 'Game Tied!';
}
