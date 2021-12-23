// const gridSquare = document.createElement('div');
// gridSquare.classList.add('square');
// gridSquare.style.width = '80px';
// gridSquare.style.height = '80px';
// gridSquare.style.backgroundColor = 'orange';
// gridSquare.textContent = 'is it working?'
// let square = makeSquare(16);

// Change color of square
// function fillSquare(e) {
//     e.target.id = 'square-changed';
// }
//////////////////////////////////////////////////////

const sketchBox = document.querySelector('.sketch-box-inner');

sketchBox.appendChild(makeGrid(16));

let squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('mouseover', switchClasses);
    }

const clearBtn = document.querySelector('button');
clearBtn.addEventListener('click', makeNewGrid);

function makeNewGrid () {
    const size = prompt('Size of Grid?');
    const item = sketchBox.querySelector('.grid');
    sketchBox.replaceChild(makeGrid(size), item);
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('mouseover', switchClasses);
    }
    squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('mouseover', switchClasses);
    }
}

function switchClasses (e) {
    e.target.classList.toggle('square-changed');
    e.target.removeEventListener('mouseover', switchClasses);
}




const btnChangeRandom = document.querySelector('.button-change-random');
btnChangeRandom.addEventListener('click', changeBgRandom);


function changeBgRandom (e) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('mouseover', switchClasses);
        squares[i].addEventListener('mouseover', bgRandomColor);
    }
}

function bgRandomColor (e) {
    const rgbColor = rgbRandom();
    e.target.style.backgroundColor = rgbColor;
}

function rgbRandom () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}








function makeSquare (size) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('square');    
    gridSquare.style.width = `${960 / size}px`;
    gridSquare.style.height = `${960 / size}px`;
    return gridSquare;
}

function makeColumn (size) {
    const column = document.createElement('div');
    for (let i = 0; i < size; i++) {
        column.appendChild(makeSquare(size));
    }
    return column;
}

function makeGrid(size) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    for (let i = 0; i < size; i++) {
        grid.appendChild(makeColumn(size));
    }
    return grid;
}