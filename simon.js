buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 1
let bool = true
var ch = true
var wc = false

function startOver() {
    level = 1
    wc = false
    bool = true
    ch = true
    gamePattern = []
    userClickedPattern = []
    $("h1").text(`Press A Key To Start`)
}

document.addEventListener("keypress", function () {
    if (bool) {
        nextSequence();
    }
})

$(".btn").click(function () {
    let userChosenColour = this.getAttribute("id")
    userClickedPattern.push(userChosenColour)
    anim(userChosenColour)
    if (wc) {
        check(userClickedPattern.length - 1)
    }
    if (ch) {
        audi(userChosenColour)
    }

})

function nextSequence() {
    $("h1").text(`Level ${level}`)
    wc = true
    bool = false
    let x = Math.random()
    let randomNumber = (Math.floor(x * 4))
    gamePattern.push(buttonColors[randomNumber])
    $("#" + buttonColors[randomNumber]).fadeOut(100).fadeIn(100);
    audi(buttonColors[randomNumber])
    level++;

}

function audi(color) {
    x = new Audio("sounds/" + color + ".mp3")
    x.play()
}

function anim(color) {
    // let x = $("#" + color).toggleAttribute("class", "pressed")
    document.querySelector("#" + color).classList.toggle("pressed")
    setTimeout(function () {
        document.querySelector("#" + color).classList.toggle("pressed")
    }, 100)


}

function check(x) {

    if (userClickedPattern[userClickedPattern.length - 1] != gamePattern[x]) {
        ch = false
        let w = new Audio("sounds/wrong.mp3")
        w.play()
        document.body.classList.toggle("game-over")
        setTimeout(function () {
            document.body.classList.toggle("game-over")
        }, 200)
        startOver()
        // $("body").classList.toggle("game-over")
    }
    else if (x == gamePattern.length - 1) {
        userClickedPattern = [];
        nextSequence()
    }

}