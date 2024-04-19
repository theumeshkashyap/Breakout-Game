const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300
const ballDiameter = 20;
let yDirection = 2
let xDirection = -2
let score = 0

const userStart = [230, 10]
let currentPosition = userStart;

const BallStart = [270, 40]
let BallCurrentPosition = BallStart;

let timerID;

//create block

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//all the blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(230, 210),
    new Block(120, 210),
    new Block(340, 210),
    new Block(450, 210),


]
//all the blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
};

addBlocks();

//add user

const user = document.createElement('div')
user.classList.add('user');
drawUser()
grid.appendChild(user);

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball
function drawBall() {
    ball.style.left = BallCurrentPosition[0] + 'px';
    ball.style.bottom = BallCurrentPosition[1] + 'px';
}

//move user
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUser()
            }
            break;

        default:
            break;
    }
}

document.addEventListener('keydown', moveUser);

//move ball

function moveBall() {
    BallCurrentPosition[0] += xDirection
    BallCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerID = setInterval(moveBall, 30);

//collision

function checkForCollisions() {
    //blocks collision
    for (let i = 0; i < blocks.length; i++) {
        if (
            (BallCurrentPosition[0] > blocks[i].bottomLeft[0] && BallCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((BallCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && BallCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score;

            // check for win
            if(blocks.length === 0){
                scoreDisplay.innerHTML = "you won!"
               
                clearInterval(timerID)
       
        document.removeEventListener('keydown', moveUser)
            }
        }

    }
 //wall collision
    if (BallCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        BallCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        BallCurrentPosition[0] <= 0) {
        changeDirection()
    }
    //check for game over
    if (BallCurrentPosition[1] <= 0) {
        clearInterval(timerID)
        scoreDisplay.innerHTML = 'YOU LOSE'
        document.removeEventListener('keydown', moveUser)
    }
    //user collision
if((BallCurrentPosition[0]>currentPosition[0] && BallCurrentPosition[0]< currentPosition[0] + blockWidth)&&
(BallCurrentPosition[1]>currentPosition[1]&& BallCurrentPosition[1]<currentPosition[1] + blockHeight)){
changeDirection()
}

}


//changeDirection
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
}