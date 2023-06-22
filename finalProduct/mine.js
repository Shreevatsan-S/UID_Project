document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const flagsLeft = document.querySelector('#flags-left')
  const result = document.querySelector('#result')
  let width = 10
  let bombAmount = 20
  let flags = 0
  let squares = []
  let isGameOver = false

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //create Board
  function createBoard() {
    flagsLeft.innerHTML = bombAmount
    //get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)

//    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)
    const shuffledArray = shuffleArray(gameArray); 
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      square.classList.add(shuffledArray[i])
      grid.appendChild(square)
      squares.push(square)

      //normal click
      square.addEventListener('click', function () {
        click(square)
      })

      //cntrl and left click
      square.oncontextmenu = function (e) {
        e.preventDefault()
        addFlag(square)
      }
    }
    const fsquare = document.createElement('div')
    fsquare.classList.add("fake")
    for (let i = 0; i <= 99; i += 11) {
      squares.splice(i, 0, fsquare)
    }
    for (let i = 11; i <= 119; i += 12) {
      squares.splice(i, 0, fsquare)
    }
    for (let i = 0; i < 12; i++) {
      squares.push(fsquare)
      squares.unshift(fsquare)
    }
    console.log(squares)

    for (let i = 13; i < 131; i++) {
      if (!squares[i].classList.contains("fake")) {
        squares[i].setAttribute("data-sqp", `${i}`)
      }
      if (squares[i].classList.contains('valid')) {
        let total = 0
        let check = [i - 13, i - 12, i - 11, i - 1, i + 1, i + 11, i + 12, i + 13]
        check.forEach((x) => {
          if (squares[x].classList.contains('bomb')) total++
        })
        squares[i].setAttribute('data', total)

      }
    }
  }
  createBoard()

  //add Flag with right click
  function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag')
        square.innerHTML = ' 🚩'
        flags++
        flagsLeft.innerHTML = bombAmount - flags
        checkForWin()
      } else {
        square.classList.remove('flag')
        square.innerHTML = ''
        flags--
        flagsLeft.innerHTML = bombAmount - flags
      }
    }
  }

  //click on square actions
  function click(square) {
    let currentId = square.id
    if (isGameOver) return
    if (square.classList.contains('checked') || square.classList.contains('flag')) return
    if (square.classList.contains('bomb')) {
      gameOver(square)
    } else {
      let total = square.getAttribute('data')
      if (total != 0) {
        square.classList.add('checked')
        if (total == 1) square.classList.add('one')
        if (total == 2) square.classList.add('two')
        if (total == 3) square.classList.add('three')
        if (total == 4) square.classList.add('four')
        square.innerHTML = total
        return
      }
      checkSquare(square, currentId)
    }
    square.classList.add('checked')
  }

  //check neighboring squares once square is clicked
  function checkSquare(square, currentId) {
    setTimeout(() => {
      let pid = parseInt(currentId)
      let sqp = parseInt(square.getAttribute("data-sqp"))
      let check2 = [sqp - 13, sqp - 12, sqp - 11, sqp - 1, sqp + 1, sqp + 11, sqp + 12, sqp + 13]
      console.log(check2)
      check2.forEach((x) => {
        if (!squares[x].classList.contains("bomb") && !squares[x].classList.contains("fake")) {
          const newSquare = squares[x]
          console.log(newSquare)
          click(newSquare)
        }
      })
    }, 10)
  }

  //game over
  function gameOver(square) {
    result.innerHTML = 'BOOM! Game Over!'
    isGameOver = true
    //show ALL the bombs
    squares.forEach(square => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '💣'
        square.classList.remove('bomb')
        square.classList.add('checked')
      }
    })
  }

  //check for win
  function checkForWin() {
    ///simplified win argument
    let matches = 0
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches++
      }
      if (matches === bombAmount) {
        result.innerHTML = 'YOU WIN!'
        isGameOver = true
      }
    }
  }
})