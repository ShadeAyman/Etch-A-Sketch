const header = document.getElementById("header");
const gridContainer = document.getElementById('gridContainer');
const slider = document.getElementById("slider");
const sliderDisplay = document.getElementById("display");
const cellClass = document.getElementsByClassName("cell");
const toggleGrid = document.getElementById('toggleGrid');
const colorPicker = document.getElementById('colorpicker');
const footer = document.getElementById('footer');
const mainBrushButton = document.getElementById("mainBrush");
const rainbowBrushButton = document.getElementById("Rainbow");
const eraserBrushButton = document.getElementById("eraser");
const clearButton = document.getElementById("clear");
//-------------defualt values----------//
let mouseDown = false;//to help with the click and drag functionality
let grid = true;//to start with the grid highlited
let color = "black";
let brushType = "mainBrush";
gridBuilder(slider.value, slider.value);
sliderDisplay.innerHTML = slider.value + "x" + slider.value;
//--------------functions--------------//
//a function that builds the grid
function gridBuilder(columns = slider.value, rows = slider.value) {
    deletElements();// to delete the old grid before generating it again
    gridContainer.style.gridTemplateColumns = " repeat(" + columns + ", 1fr)";
    gridContainer.style.gridTemplateRows = " repeat(" + rows + ", 1fr)";
    for (let i = 1; i <= columns * rows; i++) {
        const cell = document.createElement("div");
        cell.classList.add('cell');
        cell.addEventListener("mousedown", brushPicker);
        cell.addEventListener("mouseover", brushPicker);
        gridContainer.appendChild(cell);
    }
    toggleGridbutton()//to check for the grid value
}
//delets the grid 
function deletElements() {
    gridContainer.innerHTML = ''
}
//brush 2.0
function brushPicker(e)//check for the used bursh and call its function
{
    switch (brushType) {
        case "mainBrush":
            mainBrush(e);
            break;
        case "rainbowBrush":
            rainbowBrush(e);
            break;
        case "eraser":
            eraserBrush(e)
            break;
    }
}
// the brushes
//////////////////////////////////////////////////////////////////////////
//////the old brush function was not as good as i would like it to be////
//////and i had to toggle between click to draw and hover to darw   ////
//////after i saw this michalosman's code i understood how simple  ////
////// it is to make a point and drag brush so i rewrote it       ////
////// michalosman's code:                                       ////
////// (https://github.com/michalosman/etch-a-sketch)           ////
///////////////////////////////////////////////////////////////////
function mainBrush(e) {
    if (e.type === 'mouseover' && !mouseDown) return; //the idea is if iam not clicking over the element it wont draw unlike the old brush
    e.target.style.backgroundColor = color;
}
function rainbowBrush(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = randomcolor();
    rainbowBrushButton.style.color = randomcolor()
    rainbowBrushButton.style.borderColor = randomcolor()
    gridContainer.style.borderColor = randomcolor();
    header.style.color = randomcolor();
}
function eraserBrush(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = "white";
}
//shows the slide value and update it
slider.oninput = function () {
    sliderDisplay.innerHTML = this.value + "x" + this.value;
};
//random number function used in the rainbow brush
function random(number) {
    return Math.floor(Math.random() * (number + 1));
}
function randomcolor() {
    return `rgb(${random(255)}, ${random(255)}, ${random(255)})`
};
//---------------------------------
//-adds\removes a predefined css class with border style
function toggleGridbutton() {
    if (grid === true) {
        for (const x of cellClass) {
            x.classList.add("bordercell")
        }
    }
    else {
        for (const x of cellClass) {
            x.classList.remove("bordercell")
        }
    }
}
//---------------Listeners-------------//
document.onmousedown = () => { mouseDown = true; };
document.onmouseup = () => { mouseDown = false; };
colorPicker.onchange = function currentcolor(e) {
    color = e.target.value;
    mainBrushButton.style.color = color;
    mainBrushButton.style.borderColor = color;
    gridContainer.style.borderColor = color;
    header.style.color = color;
    brushPicker();
};
mainBrushButton.addEventListener('click', () => {
    brushType = "mainBrush";
    brushPicker;
})
rainbowBrushButton.addEventListener('click', () => {
    brushType = "rainbowBrush";
    brushPicker;
})
eraserBrushButton.addEventListener('click', () => {
    brushType = "eraser";
    brushPicker;
})
//Redrow the grid
clearButton.addEventListener('click',
    () => {
        gridBuilder();
    }
);
//resize the grid based on the slider value
slider.addEventListener('input', () => gridBuilder());
//toggle grid on or off
toggleGrid.addEventListener('click', () => {
    if (grid === true) {
        grid = false;
    }
    else {
        grid = true;
    }
    toggleGridbutton()
})
//the rainbow colored header is taken from this stackoverflow
//https://stackoverflow.com/questions/36793529/how-to-generate-rainbow-colored-text-in-javascript
window.addEventListener("load", function () {
    generateRainbowText(footer)
});
function generateRainbowText(element) {
    var text = element.innerText;
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        let charElem = document.createElement("span");
        charElem.style.color = "hsl(" + (360 * i / text.length) + ",80%,50%)";
        charElem.innerHTML = text[i];
        element.appendChild(charElem);
    }
}