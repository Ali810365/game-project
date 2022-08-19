import platform from '../img/platform.png'
import hills from '../img/hills.png'
import background from '../img/background.png'
import platformSmallTall from '../img/platformSmallTall.png'

import spriteRunLeft from '../img/spriteRunLeft.png'
import spriteRunRight from '../img/spriteRunRight.png'
import SpriteStandLeft from '../img/SpriteStandLeft.png'
import SpriteStandRight from '../img/SpriteStandRight.png'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

const gravity = 1.5
class Player {
    constructor() {
        this.speed = 10
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 66
        this.height = 150

        this.image = createImage(SpriteStandRight)
        this.frames = 0
        this.sprites = {
            stand: {
                right: createImage(SpriteStandRight),
                left: createImage(SpriteStandLeft),
                cropWidth: 177,
                width: 66
            },
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                cropWidth: 341,
                width: 127.875
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }

    draw() {
        c.drawImage(
            this.currentSprite, 
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth ,
            400, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            )
    }

    update() {
        this.frames++
        
        if(this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left )) this.frames = 0
        else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) this.frames = 0
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y



        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }

    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }
        this.image = image
        this.width = image.width
        this.height = image.height


    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }
        this.image = image
        this.width = image.width
        this.height = image.height


    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

function createImageAsync(imageSrc) {
    return new Promise((resolve) =>{
        const image = new Image()
        image.onload = () => {
            resolve(image)
        }
        image.src = imageSrc
    })
    
}


let platformImage 
let platformSmallTallImage

let player = new Player()
let platforms = []
let sexyPlatforms =[]
let genericObjects = []
let lastKey

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

async function init() {


    platformImage = await createImageAsync(platform)
    platformSmallTallImage = await createImageAsync(platformSmallTall)

    player = new Player()
    platforms = [
        //Tall small platforms
        new Platform({
            
            x: platformImage.width * 4 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: createImage(platformSmallTall)
        }),
        new Platform({
            x: platformImage.width * 7 + 600 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: createImage(platformSmallTall)
        }),
        new Platform({
            x: platformImage.width * 8 + 700 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: createImage(platformSmallTall)
        }),
        new Platform({
            x: platformImage.width * 12 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: createImage(platformSmallTall)
        }),
        new Platform({
            x: platformImage.width * 13 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: createImage(platformSmallTall)
        }),
        new Platform({
            x: platformImage.width * 14 + 400 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 350,
            image: createImage(platformSmallTall)
        }),
        new Platform({
            x: platformImage.width * 15 + 500 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: createImage(platformSmallTall)
        }),
        new Platform({
            x: platformImage.width * 19 + 550 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 150,
            image: createImage(platformSmallTall)
        }),
        new Platform({
            x: platformImage.width * 20 + 250 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 500,
            image: createImage(platformSmallTall)
        }),
        new Platform({
            x: platformImage.width * 20 + 150 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 376,
            image: createImage(platformSmallTall)
        }),
        



        //longer/slim platform
        new Platform({
            x: -1,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width - 3,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 2 + 300,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 3 + 500,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 4 + 300 - 2,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 5 + 800 - 2,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 7 + 600 - 2,
            y: 370,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 9 + 900 - 2,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 11 + 500 - 2,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 17 + 400 ,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 18 + 400 - 2,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 18 + 400 - 2,
            y: 346,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 18 + 400 - 2,
            y: 224,
            image: platformImage
        }),

        new Platform({
            x: platformImage.width * 21 + 700 - 2,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 22 + 700 - 4,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 23 + 700 - 6,
            y: 470,
            image: platformImage
        })
        

    ]
    
    //bookmark
    let firstSmallPlatform = platforms[0];

    //document!!!!!!
    //console.log(firstSmallPlatform.position.x)
    //this occurs when init is called
    
    genericObjects = [
        new GenericObject({
            x: -1,
            y: -1,
            image: createImage(background)
        }),
        new GenericObject({
            x: -1,
            y: -1,
            image: createImage(hills)
        })


    ]
    
    scrollOffset = 0
    //console.log(platforms[0].position)
    
}


function animate() {
    requestAnimationFrame(animate)
    
    c.fillStyle = 'White'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    genericObjects.forEach((genericObjects) => {
        genericObjects.draw()
    })
    sexyPlatforms.forEach((newPlatform) =>{
        newPlatform.draw()
    })
    platforms.forEach((platform) => {
        platform.draw()
    })

    
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if (keys.left.pressed && player.position.x > 100 || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            sexyPlatforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= player.speed *.66
            })
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            sexyPlatforms.forEach((platform) => {
                platform.position.x += player.speed
            })

            genericObjects.forEach(genericObject => {
                genericObject.position.x += player.speed * .66
            })

        }
    }

    // paltform collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })

    sexyPlatforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })

    //sprite switching
    if(keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right){
        player.frames = 1
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    } else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left){
        player.currentSprite = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    } else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left){
        player.currentSprite = player.sprites.stand.left
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    } else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right){
        player.currentSprite = player.sprites.stand.right
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    // win condition
    if (platformImage && scrollOffset > platformImage.width * 5 + 300 -2) {
        
    }

    if (player.position.y > canvas.height) {
        init()

        
        
        
        
    }
}

init()

animate()

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65: //left
            keys.left.pressed = true
            lastKey = 'left'
            break

        case 83:
            console.log('down')
            break
        case 68: //right
            keys.right.pressed = true
            lastKey = 'right';
            break

        case 87:
            console.log('up')
            player.velocity.y -= 30
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break

        case 83:
            console.log('down')
            break
        case 68: //right
            keys.right.pressed = false
            break

        case 87:
            console.log('up')
            break
    }
})

//bookmark
/*****TO DO LIST
 * need to shuffle order of answers / try shuffling the array that holds answer values
 * need scoreboard, counter, timer
 * css and styling 
 * prompt the player to lose when wrong answer is chosen //reset
 * need to include substraction, multiplication, division promotes
 *  */ 
let questionNumbers = document.querySelectorAll('.input') // question numbers field (blue fields)
let resultButtons = document.querySelectorAll('.resultBtn'); // 4 empty buttons
let scoreContainer = document.querySelector('#score');
let timer = document.querySelector('#timer')

let score = 0
let time
function mathFunction(){ //main function, temporary just sample
    
    let promptArray = [] //empty array to hold generated math question value
    let answerArray = [] //empty array to hold data for response button 
    

    let promptNumberOne //first value of our generated math question 
    let promptNumberTwo 
    
    
    let randomNumberOne //3 generated incorrect numbers
    let randomNumberTwo 
    let randomNumberThree
    let correctNumber //holds value to answer of the math question 

    promptNumberOne = Math.ceil(Math.random() * 10) //random number generated for our math question
            promptNumberTwo = Math.ceil(Math.random() * 10)
            promptArray.splice(0, 2) //remove array data from our prevous math questions value
            promptArray.push(promptNumberOne, promptNumberTwo) //push new math questions
    
            correctNumber = promptArray[0] + promptArray[1] //getting values of correct number
            function test(correctNumber) {
                let numberOne = Math.ceil(Math.random() * 10)
                while( numberOne == correctNumber){
                    numberOne = Math.ceil(Math.random() * 10)
                    console.log(numberOne)
                }
                
                return numberOne
            }
            
            
            
            
            
            randomNumberOne = test(correctNumber)
            randomNumberTwo = test(correctNumber)
            randomNumberThree = test(correctNumber)
            answerArray.splice(0, 4) //remove array data from our previous set of answers
            answerArray.push(correctNumber, randomNumberOne, randomNumberTwo, randomNumberThree) //push new answer values
    
            let shuffleArray = array => {
                for(let i = array.length -1; i > 0; i--){
                    let j = Math.floor(Math.random() * (i + 1))
                    let temp = array[i]
                    array[i] = array[j];
                    array[j] = temp
                }
                return array
            }
            shuffleArray(answerArray)
            
            for(let i = 0; i < answerArray.length; i++){ //display the questions in html document, pulling from questions array
                resultButtons[i].innerHTML = answerArray[i]
    
                
            }
    
    
            for(let i = 0; i < promptArray.length; i++){ //display the answers in html document, pulling from answers array
                questionNumbers[i].innerHTML = promptArray[i]
            }
    /*
            resultButtons.forEach((button) => { //style the button when correct answer is chosen
                if(parseInt(button.innerHTML) ==  (promptNumberOne + promptNumberTwo)){
                    button.addEventListener('click', () =>{
                        button.style.backgroundColor = 'green'
                        
                        console.log(score)
                        
                    })
                } else{
                    button.addEventListener('click', () =>{
                        button.style.backgroundColor = 'red'
                    })
                }
            })
        */
            for(let i = 0; i < resultButtons.length; i++){
                if(parseInt(resultButtons[i].innerHTML) ==  (promptNumberOne + promptNumberTwo)){
                    resultButtons[i].addEventListener('click', () => {
                        resultButtons[i].style.backgroundColor = 'green'
                    })
                    
                } else{
                    resultButtons[i].addEventListener('click', () => {
                        resultButtons[i].style.backgroundColor = 'red'
                    })
                }
                
            }
    
            resultButtons.forEach((button) => { //my horrible attempt at trying to revert the buttons back to normal
                button.style.backgroundColor = 'white'
            })
            

            
    
    
}

function count() {
    
    time = 4
    let myCountDown = setInterval(() => {
        time -= 1;
        if(time < 0){
            time = 0
            
        }
        
        timer.innerHTML = time;
    }, 1000)
}
count()
function resetTime(){
    time = 4
}
scoreContainer.innerHTML = score
function addScore(){
    
    score += 100
    scoreContainer.innerHTML = score
}



resultButtons.forEach((button) => {
    button.addEventListener('click', mathFunction)
    button.addEventListener('click', resetTime)
    button.addEventListener('click', addScore)
    

    
})




/* SAMPLE CODE
resultButtons.forEach((button) => {
    console.log(button.value)
})

resultButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(parseInt(inputOne.innerHTML) + parseInt(inputTwo.innerHTML) !== parseInt(button.innerHTML)){
            init()
        }
    })
})

*/

mathFunction();