// constants and variables;
let inputDir = {x:0, y: 0};
const foodSound = new Audio("music/food.mp3");
const gameoverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let score =0 ;
let speed = 8;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]
food = {x: 5, y: 4};



// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    // if head bumps into body 
    for(let i = 1; i < snakeArr.length; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    // touches boundary
    if(snakeArr[0].x > 18 || snakeArr[0].x < 0 || snakeArr[0].y > 18 || snakeArr[0].y < 0 ){
        return true;
    }
    return false;
}

function gameEngine(){
    // part1 :updating snake and food
    // musicSound.play();
    if(isCollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x : 0, y : 0}
        alert("Game is Over");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
    }
    // if you have eaten the food, increament score, increase snake size,
    // regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y});
        foodSound.play();
        score++;
        scoreBox.innerHTML = "score : " + score;
        if(score > highScoreVal) {
            highScoreVal = score ;
        }
        highScoreBox.innerHTML = "High Score : " + highScoreVal;
        food = {x: Math.round(Math.random() * 16) + 2, y: Math.round(Math.random() * 16) + 2};
    } 

    // Moving the snake
    for(let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = snakeArr[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // part2 :redering snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;        
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;        
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

function hardness(input) {
    speed = input.value;
}

document.body.addEventListener("keydown", function () {
    musicSound.play()
})


// main logic

// setting high score
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal))
}
else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score : " + highScore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x:0, y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp") 
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown") 
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight") 
            inputDir.x = 1;
            inputDir.y = 0;
            break;
                
        case "ArrowLeft":
            console.log("ArrowLeft") 
            inputDir.x = -1;
            inputDir.y = 0;
            break;    

        default:
            break;
    }
})
