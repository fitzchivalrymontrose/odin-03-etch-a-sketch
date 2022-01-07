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

let isDrawing = false;
let currentBrush = '';

sketchBox.addEventListener('click', toggleIsDrawing);
function toggleIsDrawing () {
    if (isDrawing === true) {
        isDrawing = false;
    }
    else isDrawing = true;
}

let squares = document.querySelectorAll('.square');
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('mouseover', changerClassic);
}

//
/// new grid button 
const clearBtn = document.querySelector('button');
clearBtn.addEventListener('click', makeNewGrid);
function makeNewGrid () {
    const size = prompt('Size of Grid? Enter a number 1-100.');
    console.log(size);
    if (size <= 100 && size > 0) {
        const item = sketchBox.querySelector('.grid');
        sketchBox.replaceChild(makeGrid(size), item);
        squares = document.querySelectorAll('.square');
        for (let i = 0; i < squares.length; i++) {
        //squares[i].addEventListener('mouseover', switchClasses);

            if (currentBrush === 'classic') {
                squares[i].addEventListener('mouseover', changerClassic);
            }
            else if (currentBrush === 'rainbow') {
                squares[i].addEventListener('mouseover', bgRandomColor);
            }
            else if (currentBrush === 'fade') {
                squares[i].addEventListener('mouseover', fadeIn);
            }
            else if (currentBrush === 'eraser') {
                squares[i].addEventListener('mouseover', eraseSquare);
            }
        }
    }
    else if (size === null) {
        return;
    }
    else makeNewGrid();
}    
//
/// deprecated
/// function switchClasses (e) {
//     e.target.classList.toggle('square-changed');
//     e.target.removeEventListener('mouseover', switchClasses);
// }
//
// classic black button
const btnClassic = document.querySelector('.button-classic-black');
btnClassic.addEventListener('click', changeClassic);
function changeClassic(e) {
    currentBrush = 'classic';
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('mouseover', eraseSquare);
        //squares[i].removeEventListener('mouseover', switchClasses);
        squares[i].removeEventListener('mouseover', bgRandomColor);
        squares[i].removeEventListener('mouseover', fadeIn);
        squares[i].addEventListener('mouseover', changerClassic);
    }
}
function changerClassic(e) {
    if (isDrawing) {
        e.target.style.backgroundColor = 'black';
        //sketchBoxBorder.style.backgroundColor = 'black';
        //e.target.classList.value = 'square-changed';
        e.target.removeEventListener('click', changerClassic);
    }
}
//
/// random color button
const btnChangeRandom = document.querySelector('.button-change-random');
btnChangeRandom.addEventListener('click', changeBgRandom);
function changeBgRandom (e) {
    currentBrush = 'rainbow';
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('mouseover', eraseSquare);
        //squares[i].removeEventListener('mouseover', switchClasses);
        squares[i].removeEventListener('mouseover', fadeIn);
        squares[i].removeEventListener('mouseover', changerClassic);
        squares[i].addEventListener('mouseover', bgRandomColor);
    }
}
function bgRandomColor (e) {
    if (isDrawing) {
        // change square to random rgb color
        const rgbColor = rgbRandom();
        e.target.style.backgroundColor = rgbColor;
        // change border box along with square
        //sketchBoxBorder.style.backgroundColor = rgbColor;
    }
}
function rgbRandom () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
//
/// darken each pass button
const fadeBtn = document.querySelector('.button-change-fade');
fadeBtn.addEventListener('click', changeFadeBrush);
function changeFadeBrush (e) {
    currentBrush = 'fade';
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('mouseover', eraseSquare);
        //squares[i].removeEventListener('mouseover', switchClasses);
        squares[i].removeEventListener('mouseover', bgRandomColor);
        squares[i].removeEventListener('mouseover', changerClassic);
        squares[i].addEventListener('mouseover', fadeIn );
    }
}


let fadeLevel = 0.0;
function fadeIn (e) {
    
    let colorValue = `rgba(0, 0, 0, ${fadeLevel})`;
    if (isDrawing) {
        if (e.target.style.backgroundColor === '') {
            e.target.style.backgroundColor = colorValue;
        }
        else if (fadeLevel <= 1) {
            fadeLevel += .05;
            e.target.style.backgroundColor = colorValue;
        }
        else {
            e.target.style.backgroundColor = colorValue;
        }
        
        //sketchBoxBorder.style.backgroundColor = 'darkgray';
        // e.target.removeEventListener('click', fadeIn);
    }
    console.log(e.target.style.backgroundColor);
}
//
/// eraser button
const eraserBtn = document.querySelector('.button-eraser');
eraserBtn.addEventListener('click', turnOnEraser);
function turnOnEraser(e) {
    currentBrush = 'eraser';
    for (let i = 0; i < squares.length; i++) {
        //squares[i].removeEventListener('mouseover', switchClasses);
        squares[i].removeEventListener('mouseover', bgRandomColor);
        squares[i].removeEventListener('mouseover', changerClassic);
        squares[i].removeEventListener('mouseover', fadeIn );
        squares[i].addEventListener('mouseover', eraseSquare);
    }
}
function eraseSquare(e) {
    if (isDrawing) {
        e.target.style.backgroundColor = 'white';
        e.target.removeEventListener('mouseover', eraseSquare);
    }
}
//
/// generate inital grid
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