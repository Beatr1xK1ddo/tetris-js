
//   Create class for cells
const main = document.getElementById("main")
let time = 300

// MATRIX
const playField = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// GAME PLAY

function startGame() {
    MoveTetrinDown(playField)
    Draw()
    setTimeout(startGame, time)
};

// RANDOM GENERATOR
function tetrinsEx() {
    let items = [{
        x: 0,
        arr: [
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
        ]
    },
    {
        x: 1,
        arr: [
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
        ]
    },
    {
        x: 2,
        arr: [
            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0]
        ]
    },
    {
        x: 3,
        arr: [
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0]
        ]
    },
    {
        x: 4,
        arr: [
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0]
        ]
    }]
    let random = Math.floor(Math.random() * Math.floor(4));
    items.forEach((item) => {
        if (item.x === random) {
            for (let i = 0; i < item.arr.length; i++) {
                playField[i] = item.arr[i]
            }
        }
    })
    Draw()
};

function checkFullLines() {
    for (let x = 0; x < playField.length; x++) {
        let canRemove = true
        for (let y = 0; y < playField[x].length; y++) {
            if (playField[x][y] != 2) {
                canRemove = false
            }
        }
        if (canRemove) {
            playField.splice(x, 1)
            playField.splice(0,0,[0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
    }
};

function fixeTetrin() {
    for (let i = playField.length - 1; i >= 0; i--) {
        for (let y = 0; y < playField[i].length; y++) {
            (playField[i][y] === 1) ? playField[i][y] = 2 : false
        }
    }

    checkFullLines()
    tetrinsEx()
};


function Draw() { // May Be Change Name in process
    main.innerHTML = ""
    let count = 1
    for (let i = 0; i < playField.length; i++) {
        playField[i].forEach(item => {
            const elem = document.createElement("DIV")
            const child = document.createElement("DIV")
            child.style.width = 100 + "%"
            child.style.height = 100 + "%"
            if (item === 1) {
                child.style.backgroundColor = "blue"
                child.style.opacity = .65

            } else if (item === 2) {
                elem.style.backgroundColor = "#28ed74"
            }
            else {
                child.style.backgroundColor = "#fffbf0"
            }

            elem.append(child)
            elem.setAttribute('class', 'tetrin')
            main.append(elem)
        })
    }
};

// MOVE DOWN
function canTetroMoveDown() {
    for (let i = 0; i < playField.length; i++) {
        for (let y = 0; y < playField[i].length; y++) {
            if (playField[i][y] === 1) {
                if (i === playField.length - 1 || playField[i + 1][y] === 2) {
                    return false
                }
            }
        }
    }
    return true
};

function MoveTetrinDown(arr) {
    if (canTetroMoveDown()) {
        for (let i = arr.length - 1; i >= 0; i--) {
            for (let y = 0; y < arr[i].length; y++) {
                if (arr[i][y] === 1) {
                    arr[i][y] = 0
                    arr[i + 1][y] = 1
                }
            }
        }
    } else {
        fixeTetrin()
    }
};

// MOVE LEFT 
function canTetroMoveLeft() {
    for (let i = 0; i < playField.length; i++) {
        for (let y = 0; y < playField[i].length; y++) {
            if (playField[i][y] === 1) {
                if (y <= 0 || playField[i][y - 1] === 2) {
                    return false
                }
            }
        }
    }
    return true
};
function tetrinMoveLeft() {
    if (canTetroMoveLeft()) {
        for (let i = 0; i < playField.length; i++) {
            playField[i].forEach((item, index) => {
                if (item === 1) {
                    playField[i][index] = 0
                    playField[i][index - 1] = 1
                }
            })
        }
        Draw()
    }
};

// MOVE RIGHT 
function canTetroMoveRight() {
    for (let i = 0; i < playField.length; i++) {
        for (let y = 0; y < playField[i].length; y++) {
            if (playField[i][y] === 1) {
                if (y >= playField[i].length - 1 || playField[i][y + 1] === 2) {
                    return false
                }
            }
        }
    }
    return true
};

function tetrinMoveRight() {
    if (canTetroMoveRight()) {
        for (let i = 0; i < playField.length; i++) {
            for (let y = playField[i].length - 1; y >= 0; y--) {
                if (playField[i][y] === 1) {
                    playField[i][y] = 0
                    playField[i][y + 1] = 1
                }
            }
        }
        Draw()
    }
};

// EVENT LISTENERS
document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        tetrinMoveLeft()
        Draw()
    }
});
document.addEventListener('keydown', event => {
    if (event.keyCode === 39) {
        tetrinMoveRight()
        Draw()
    }
});
document.addEventListener("DOMContentLoaded", startGame)