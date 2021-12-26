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
const sketchBoxBorder = document.querySelector('.sketch-box-outer');

sketchBox.appendChild(makeGrid(16));

let currentBrush = '';

let squares = document.querySelectorAll('.square');
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('mouseover', switchClasses);
}


function changeBrushTo (brush) {
    clearListeners(); 
    switch (currentBrush) {
        case 'classic': this.addEventListener('mouseover', changerClassic);
                        break;
        case 'rainbow': this.addEventListener('mouseover', bgRandomColor);
                        break;
        case 'fade': this.addEventListener('mouseover', fadeIn);
                        break;
        case 'eraser': this.addEventListener('mouseover', eraseSquare);
                       break;
        default: break;
    }
}

function clearListeners () {
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('mouseover', eraseSquare);
        squares[i].removeEventListener('mouseover', switchClasses);
        squares[i].removeEventListener('mouseover', bgRandomColor);
        squares[i].removeEventListener('mouseover', fadeIn);
        squares[i].removeEventListener('mouseover', changerClassic);
    }
}

// new grid button 
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

// classic black button
const btnClassic = document.querySelector('.button-classic-black');
btnClassic.addEventListener('click', changeClassic);
function changeClassic(e) {
    currentBrush = 'classic';
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('mouseover', eraseSquare);
        squares[i].removeEventListener('mouseover', switchClasses);
        squares[i].removeEventListener('mouseover', bgRandomColor);
        squares[i].removeEventListener('mouseover', fadeIn);
        squares[i].addEventListener('mouseover', changerClassic);
    }
}
function changerClassic(e) {
    e.target.style.backgroundColor = 'black';
    //sketchBoxBorder.style.backgroundColor = 'black';
    e.target.classList.value = 'square-changed';
    e.target.removeEventListener('click', changerClassic);
}





// random color button
const btnChangeRandom = document.querySelector('.button-change-random');
btnChangeRandom.addEventListener('click', changeBgRandom);

function changeBgRandom (e) {
    currentBrush = 'rainbow';
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('mouseover', eraseSquare);
        squares[i].removeEventListener('mouseover', switchClasses);
        squares[i].removeEventListener('mouseover', fadeIn);
        squares[i].removeEventListener('mouseover', changerClassic);
        squares[i].addEventListener('mouseover', bgRandomColor);
    }
}

function bgRandomColor (e) {
    const rgbColor = rgbRandom();
    e.target.style.backgroundColor = rgbColor;
    sketchBoxBorder.style.backgroundColor = rgbColor;


}
function rgbRandom () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// darken by 10 percent each pass button
const fadeBtn = document.querySelector('.button-change-fade');
fadeBtn.addEventListener('click', changeFadeBrush);
function changeFadeBrush (e) {
    currentBrush = 'fade';
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('mouseover', eraseSquare);
        squares[i].removeEventListener('mouseover', switchClasses);
        squares[i].removeEventListener('mouseover', bgRandomColor);
        squares[i].removeEventListener('mouseover', changerClassic);
        squares[i].addEventListener('mouseover', fadeIn );
    }
}
function fadeIn (e) {
    e.target.style.backgroundColor = 'darkgray';
    //sketchBoxBorder.style.backgroundColor = 'darkgray';
    e.target.removeEventListener('click', fadeIn);
}

// eraser button
const eraserBtn = document.querySelector('.button-eraser');
eraserBtn.addEventListener('click', turnOnEraser);
function turnOnEraser(e) {
    currentBrush = 'eraser';
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('mouseover', switchClasses);
        squares[i].removeEventListener('mouseover', bgRandomColor);
        squares[i].removeEventListener('mouseover', changerClassic);
        squares[i].removeEventListener('mouseover', fadeIn );
        squares[i].addEventListener('mouseover', eraseSquare);
    }
}
function eraseSquare(e) {
    e.target.style.backgroundColor = 'white';
    e.target.removeEventListener('mouseover', eraseSquare);
}


// generate grid
function makeSquare (size) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('square');    
    gridSquare.style.width = `${600 / size}px`;
    gridSquare.style.height = `${600 / size}px`;
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