
let gamePattern = []
let userClickedPattern = []

const buttonColors = ["red", "blue", "green", "yellow"]

let level = 0
let started = false

$(document).keydown(function() {
    if(!started) {
        $("#level-title").text(`Level ${level}`)
        nextSequence()
        started = true
    }
})

function nextSequence() {

    userClickedPattern = []

    level++
    $("#level-title").text(`Level ${level}`)

    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
}

$(".btn").on("click", function () {
    let userChosenColor = this.id
    userClickedPattern.push(userChosenColor)

    playSound(userChosenColor)
    animatePress(userChosenColor)

    checkAnswer(userClickedPattern.length - 1)
})

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed")
    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000)
        }

    } else {
        let audio = new Audio("sounds/wrong.mp3")
        audio.play()
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}