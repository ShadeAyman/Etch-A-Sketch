const gridcontainer = document.getElementById('gridContainer');
const cell = document.createElement("div");
cell.classList.add('cell');
const slider = document.getElementById("slider");
const sliderDisplay = document.getElementById("display");
const cellclass = document.getElementsByClassName("cell");
const Rainbow = document.getElementById("Rainbow");
const Black = document.getElementById("black");
const Lighten = document.getElementById("lighten");
const clearButton = document.getElementById("clear");
const brushToggle = document.getElementById("toggle");
const eraser = document.getElementById('eraser');
//defualt 
let isToggle = false;
let grid = true;
let usedbrush="black";
const toggleGrid = document.getElementById('toggleGrid')
gridbuilder(slider.value, slider.value);
sliderDisplay.innerHTML = slider.value + "x" + slider.value;
//--------------functions--------------//
//a function that builds cells
function gridbuilder(columns = slider.value, rows = slider.value) {
    deletElements();
    gridcontainer.style.gridTemplateColumns = " repeat(" + columns + ", 1fr)";
    gridcontainer.style.gridTemplateRows = " repeat(" + rows + ", 1fr)";
    let cellcount = columns * rows;
    for (let i = 1; i <= cellcount; i++) {
        gridcontainer.appendChild(cell.cloneNode());
    }
    toggleGridbutton()
    usedBrushFunction();
}
function deletElements()//remove elments
{
    while (gridcontainer.lastElementChild) {
        gridcontainer.removeChild(gridcontainer.lastElementChild)
    }
}
function toggleGridbutton()
{
    if (grid === true) {
        for (const x of cellclass) {
            x.classList.add("bordercell")
        }
    }
    else {
        for (const x of cellclass) {
            x.classList.remove("bordercell")
        }
    }
}
//-------------to show the slide value and update it
sliderDisplay.innerHTML = slider.value + "x" + slider.value;
slider.oninput = function () {
    sliderDisplay.innerHTML = this.value + "x" + this.value;
};
//-------------------------------------------------------
////////////////////////////////////
function blackbrush() {

    if (isToggle == true) {
        for (const x of cellclass) {
            x.addEventListener('mouseover', () => {
                x.style.backgroundColor = "black";
                x.style.transition = "background-color 1.0s ease";
            })
        }
    }
    else {
        for (const x of cellclass) {
            x.addEventListener('mousedown', () => {
                x.style.backgroundColor = "black";
                x.style.transition = "background-color 1.0s ease";
            })
        }
    }
}
function rainbowBrush() {
    if (isToggle === true) {
        for (const x of cellclass) {
            x.addEventListener('mouseover', () => {
                x.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
                x.style.transition = "background-color 1.0s ease";
            })
        }
    }
    else {
        for (const x of cellclass) {
            x.addEventListener('mousedown', () => {
                x.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
                x.style.transition = "background-color 1.0s ease";

            })
        }
    }
}
function eraserbrush(){
    if (isToggle == true) {
        for (const x of cellclass) {
            x.addEventListener('mouseover', () => {
                x.style.backgroundColor = "white";
                x.style.transition = "background-color 1.0s ease";
            })
        }
    }
    else {
        for (const x of cellclass) {
            x.addEventListener('mousedown', () => {
                x.style.backgroundColor = "white";
                x.style.transition = "background-color 1.0s ease";
            })
        }
    }
}
function usedBrushFunction()
{
    if (usedbrush == "black")
    {
        blackbrush();
    }
    else if (usedbrush == "rainbow")
    {
        rainbowBrush();
    }
    else if (usedbrush == "eraser")
    {
        eraserbrush();
    }
}
function random(number) {
    return Math.floor(Math.random() * (number + 1));
}
//----------------------Listeners-------------//
slider.addEventListener('input', () => gridbuilder());
clearButton.addEventListener('click', //to clear the tiles and redrow them
    () => {
        deletElements();
        gridbuilder();
    }
);
Black.addEventListener('click', () => {
    usedbrush="black"
    blackbrush();
})
Rainbow.addEventListener('click', () => {
    usedbrush="rainbow"
    rainbowBrush()
})
eraser.addEventListener('click', () => {
    usedbrush="eraser"
    eraserbrush()
})
brushToggle.addEventListener('click', ()=>{
    if (isToggle === false) {
        isToggle = true;
    }
    else {
        isToggle = false;
    }
    gridbuilder()
});
toggleGrid.addEventListener('click', ()=>{
    if (grid === true) {

            grid = false;
        }
    else {
            grid = true;
        }
        toggleGridbutton()
})