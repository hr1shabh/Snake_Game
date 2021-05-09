// Constants

let input = {x:0 , y:0};
const foodSound=new Audio("food.mp3");
const moveSound=new Audio("move.mp3");
const speed = 10;
let lastPaintTime=0;
let snake = [{x:15 , y:15}];
let food = {x:10 , y:10};
let score=0;
//Functions
function main(currentTime){
window.requestAnimationFrame(main);
//console.log(currentTime);
//console.log(lastPaintTime);
if((currentTime-lastPaintTime)/1000 < 1/speed){
    return;
}
lastPaintTime = currentTime;
mainEngine();
}


function isCollapse(snake){
  for(let i=1;i<snake.length; i++){
      if(snake[0].x===snake[i].x && snake[0].y === snake[i].y){
          return true;
      }
  }
if(snake[0].x>=20 ||snake[0].x<=0 ||snake[0].y>=20 ||snake[0].y<=0 ){
    return true;
}


return false;

}


function mainEngine(){
// snake & food variable update
if(isCollapse(snake)){
    input = {x:0 , y:0};
    alert("Game Over");
    snake = [{x:15 , y:15}];
    score=0;
}
//When snake eats food
if(snake[0].x===food.x && snake[0].y===food.y){
    score+=1;
    if(score>highscoreval){
        highscoreval = score;
        localStorage.setItem("highscore",JSON.stringify(highscoreval));
    highScore.innerHTML = "HighScore : " + highscoreval;
    }
  
    score_.innerHTML = "Score : " + score;
    foodSound.play();
    snake.unshift({x: snake[0].x + input.x , y: snake[0].y + input.y});
    // generate new food
    food = {x: Math.round(1+18*Math.random()),y: Math.round(1+18*Math.random()) };
}
//Moving the snake
for (let i = snake.length-2; i>=0; i--) {
   // const element = array[i];
    snake[i+1] = {...snake[i]};
}
snake[0].x+=input.x;
snake[0].y+=input.y;


//display food

board.innerHTML = "";

   foodElement = document.createElement('div'); //create new element of div
   foodElement.style.gridRowStart = food.y; //place in that particular row in that grid
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food');
   board.appendChild(foodElement);

//display snake
snake.forEach((e, index)=>{
    SnakeElement = document.createElement('div'); //create new element of div
    SnakeElement.style.gridRowStart = e.y; //place in that particular row in that grid
    SnakeElement.style.gridColumnStart = e.x;
    
    if(index === 0){
        SnakeElement.classList.add('head')
    }else{
        SnakeElement.classList.add('snakeBody');
    }
    board.appendChild(SnakeElement);
 })


}


//Logic BEhind Game

let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    highScore.innerHTML = "HighScore : " + highscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    input = {x: 0, y: 1 }; //if any key presses game starts
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            input.x = 0;
            input.y = -1; 
            break;
        case "ArrowDOwn":
                input.x = 0;
                input.y = 1; 
                break;
        case "ArrowLeft":
                    input.x = -1;
                    input.y = 0; 
                    break;
         case "ArrowRight":
            input.x = 1;
            input.y = 0; 
            break;

        default:
            break;
    }
    //console.log(input);

});