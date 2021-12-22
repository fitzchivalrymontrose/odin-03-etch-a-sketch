const sketchBox = document.querySelector('.sketch-box-inner');


// const gridSquare = document.createElement('div');
// gridSquare.classList.add('square');
// gridSquare.style.width = '80px';
// gridSquare.style.height = '80px';
// gridSquare.style.backgroundColor = 'orange';
// gridSquare.textContent = 'is it working?'

// let square = makeSquare(16);
sketchBox.appendChild(makeGrid(16));

function makeSquare (size) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('square');
    gridSquare.style.width = `${960 / size}px`;
    gridSquare.style.height = `${960 / size}px`;
    gridSquare.style.backgroundColor = 'orange';
    console.log(gridSquare);
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