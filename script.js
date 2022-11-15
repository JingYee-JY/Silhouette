const start = document.querySelector(".start");
const startButton = document.querySelector(".startButton");
const easyButton = document.querySelector(".easyButton");
const normalButton = document.querySelector(".normalButton");
const hardButton = document.querySelector(".hardButton");
const game = document.querySelector(".game");
const number = document.querySelector(".number");
const selection = document.querySelector(".selection");
const questionImage = document.querySelector(".questionImage")
const popUp = document.querySelector(".popUp")
const background = document.querySelector(".background")
const image = document.querySelector(".image")
const text = document.querySelector(".text")
const name = document.querySelector(".name")
const final = document.querySelector(".final")
const againButton = document.querySelector(".againButton");
const homeButton = document.querySelector(".homeButton");

const clickSound = document.getElementById("click")
const completed = document.getElementById("completed")
const correct = document.getElementById("correct")
const wrong = document.getElementById("wrong")

let total;
let current;
let difficulty;

let answerName;
let answer;
let other;

let tempoArray = [];

let questions = [
    {name:"Coffee", type:"Drink"},
    {name:"GoldFish", type:"Fish"},
    {name:"Hamester", type:"Animal"},
    {name:"Lizard", type:"Animal"},
    {name:"Mosquito", type:"Insect"},
    {name:"MRT", type:"Transport"},
    {name:"Orchid",  type:"Flower",},
    {name:"Panda Cake", type:"Food"},
    {name:"Rabbit", type:"Animal"}
]

startButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        start.classList.add("hide")
        selection.classList.remove("hide")
    }, 200);
})

easyButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = "easy";
        ready()
    }, 200);
})

normalButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = "normal";
        ready()
    }, 200);
})

hardButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = "hard";
        ready()
    }, 200);
})

againButton.addEventListener("click", () =>{
    playClickSound()
    let daley = setTimeout(() =>{
        final.classList.add("hide")
        start.classList.remove("hide")
    }, 200)
})

homeButton.addEventListener("click", ()=>{
    playClickSound()
    let daley = setTimeout(() =>{
        location.assign('https://gimme.sg/activations/dementia/');
    }, 200)
})

function ready(){
    selection.classList.add("hide")
    game.classList.remove("hide")
    
    tempoArray = []
    total = 5;
    current = 0;
    Question()
}

function Question(){
    current += 1;

    if(current > total){
        completed.currentTime = 0
        completed.play()
        game.classList.add("hide")
        final.classList.remove("hide")
        return
    }

    if(tempoArray.length == 0){
        tempoArray = []
        for(let i = 0; i < questions.length; i++){
            tempoArray.push(questions[i])
        }
    }

    console.log(tempoArray)

    number.innerHTML = `${current} / ${total}`
    let randomQuestion = Math.floor(Math.random() * tempoArray.length)

    console.log(randomQuestion)

    let picture = tempoArray[randomQuestion].name
    questionImage.src = "./img/" + picture + "S.png"
    answerName = tempoArray[randomQuestion].name
    answer = answerName
    if(difficulty == "normal"){
        answer = tempoArray[randomQuestion].type
    }

    tempoArray.splice(randomQuestion, 1)

    let random = [1, 2]
    for(let c = 1; c < 3; c++){
        let btnClass = "btn" + c
        let btn = document.querySelector(`.${btnClass}`)

        let randomNumber = Math.floor((Math.random() * random.length))
        let randomChoice = random[randomNumber] > 1 ? "current" : "other"

        let data;

        if(randomChoice == "current"){
            data = answer
            if(difficulty =="easy"){
                btn.innerHTML =`
                <img class="object" src="./img/${answer}.png">`
            }
            if(difficulty =="normal"){
                btn.innerHTML =`
                <p class="object">${answer}</p>`
            }
            if(difficulty == "hard"){
                btn.innerHTML =`
                <p class="object">${answer}</p>`
            }
        }

        if(randomChoice == "other"){
            otherIndex = Math.floor(Math.random() * tempoArray.length)
            if(difficulty == "easy"){
                data = tempoArray[otherIndex].name
                other = data;
                btn.innerHTML =`
                <img class="object" src="./img/${data}.png">`
            }
            if(difficulty == "normal"){
                function again(){
                    data = tempoArray[otherIndex].type
                    other = tempoArray[otherIndex].name;
                    btn.innerHTML =`
                    <p class="object">${data}</p>`
                }
                for(let i = 0; i< 30; i++){
                    again();
                    console.log(i)
                    if(data == answer){
                        return;
                    }
                }
            }
            if(difficulty == "hard"){
                data = tempoArray[otherIndex].name
                other = data;
                btn.innerHTML =`
                <p class="object">${data}</p>`
            }
        }

        btn.setAttribute("data", data)

        random.splice(randomNumber, 1)
    }
}

for(let b = 1; b < 3; b++){
    let btnClass = "btn" + b

    let btn = document.querySelector(`.${btnClass}`)

    btn.addEventListener("click", ()=>{
        let btnImage = document.querySelector(`.${btnClass} .object`)
        console.log(btnImage)
        let data = btn.getAttribute("data")
        console.log(answer)
        popUp.classList.remove("hide")
        if(data == answer){
            correct.currentTime = 0
            correct.play()
            background.style.backgroundColor = "#28AD4D"
            name.innerHTML = answerName
            image.src = "./img/" + answerName + ".png"
            text.innerHTML="That's right!"
            let delay = setTimeout(()=>{
                popUp.classList.add("hide")
                Question()
            },1500)
        }
        if(data != answer){
            wrong.currentTime = 0
            wrong.play()
            background.style.backgroundColor = "#DE4949"
            name.innerHTML = other
            text.innerHTML="Try again!"
            if(difficulty == "normal"){
                name.innerHTML = data
                text.innerHTML="Try again! Example:"
            }
            image.src = "./img/" + other + ".png"
            let delay = setTimeout(()=>{
                popUp.classList.add("hide")
            },1500)
        }
    })
    
}

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });