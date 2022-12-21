const gridcontainer = document.getElementById('gridContainer');
const cell = document.createElement("div");
cell.classList.add('cell');
const slider = document.getElementById("slider");
const sliderDisplay = document.getElementById("display");
const cellclass = document.getElementsByClassName("cell");
const clearButton = document.getElementById("clear");
const toggleGrid = document.getElementById('toggleGrid')
const colorpicker = document.getElementById('colorpicker')
const footer = document.getElementById('footer')
let mousedown=false;

//defualt values
let isToggle = false;
let grid = true;
let color = "black"
let brushType= "rainbowBrush";
gridbuilder(slider.value, slider.value);
sliderDisplay.innerHTML = slider.value + "x" + slider.value;
//--------------functions--------------//
//a function that builds the grid
function gridbuilder(columns = slider.value, rows = slider.value) {
    deletElements();// to delete the grid before adding it again
    gridcontainer.style.gridTemplateColumns = " repeat(" + columns + ", 1fr)";
    gridcontainer.style.gridTemplateRows = " repeat(" + rows + ", 1fr)";
    let cellcount = columns * rows;
    for (let i = 1; i <= cellcount; i++) {
        const cell = document.createElement("div");
        cell.classList.add('cell');
        cell.addEventListener("mousedown",brushPicker);
        cell.addEventListener("mouseover",brushPicker);
        gridcontainer.appendChild(cell);
    }
    toggleGridbutton()//to hilight the cells
}
//delets the grid 
function deletElements() {
    gridcontainer.innerHTML = ''
}
//brush 2.0
function brushPicker(e)
{
    if(brushType == "mainBrush")
    {
        mainBrush(e);
    }

    if(brushType == "rainbowBrush")
    {
        rainbowBrush(e);
    }
    if (brushType=="eracer") 
    {
        eracerBrush(e)
    }
}
const mainBrushButton =document.getElementById("mainBrush");
const rainbowBrushButton =document.getElementById("Rainbow");
const eraserBrushButton = document.getElementById("eraser");

mainBrushButton.addEventListener('click',()=>
{
    brushType = "mainBrush" ;
    brushPicker;
} )

rainbowBrushButton.addEventListener('click',()=>
{
    brushType = "rainbowBrush" ;
    brushPicker;
} )

eraserBrushButton.addEventListener('click',()=>
{
    brushType = "eracer" ;
    brushPicker;
} )

function mainBrush(e) {
    if (e.type === 'mouseover' && !mousedown) return;
    e.target.style.backgroundColor = color;
}
function rainbowBrush(e) {
    if (e.type === 'mouseover' && !mousedown) return;
    e.target.style.backgroundColor = randomcolor();
    rainbowBrushButton.style.color=randomcolor()
    rainbowBrushButton.style.borderColor=randomcolor()
}
function eracerBrush(e)
{
    if (e.type === 'mouseover' && !mousedown) return;
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

//---------------Listeners-------------//
document.onmousedown= ()=> {mousedown=true;};
document.onmouseup= ()=> {mousedown=false;};
colorpicker.onchange=function currentcolor(e) {
    color = e.target.value;
    mainBrushButton.style.color=color;
    mainBrushButton.style.borderColor=color;
};
//Redrow the grid
clearButton.addEventListener('click', 
    () => {
        gridbuilder();
    }
);
//resize the grid based on the slider value
slider.addEventListener('input', () => gridbuilder());
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
//to toggle (hover to drow/click to draw)


//the rainbow colored header is taken from this stackoverflow
//https://stackoverflow.com/questions/36793529/how-to-generate-rainbow-colored-text-in-javascript
window.addEventListener("load", function () {
    generateRainbowText(header);
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