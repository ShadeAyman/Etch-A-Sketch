const gridcontainer = document.getElementById('gridContainer');
const cell = document.createElement("div");
cell.classList.add('cell');
const slider = document.getElementById("slider");
const sliderDisplay = document.getElementById("display");
const cellclass = document.getElementsByClassName("cell");
const Rainbow = document.getElementById("Rainbow");
const brush = document.getElementById("brush");
const Lighten = document.getElementById("lighten");
const clearButton = document.getElementById("clear");
const brushToggle = document.getElementById("toggle");
const eraser = document.getElementById('eraser');
const toggleGrid = document.getElementById('toggleGrid')
const colorpicker = document.getElementById('colorpicker')
const footer = document.getElementById('footer')
//defualt values
let isToggle = false;
let grid = true;
let usedbrush = "black";
let color = '#000000';
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
        gridcontainer.appendChild(cell.cloneNode());
    }
    toggleGridbutton()//to hilight the cells
    usedBrushFunction();//to use the last brush
}
//delets the grid 
function deletElements()
{
    while (gridcontainer.lastElementChild) {
        gridcontainer.removeChild(gridcontainer.lastElementChild)
    }
}
//shows the slide value and update it
slider.oninput = function () {
    sliderDisplay.innerHTML = this.value + "x" + this.value;
};
///to check for brushes and update it
function usedBrushFunction() 
{
    if (usedbrush == "black") {
        Mainbrush();
    }
    else if (usedbrush == "rainbow") {
        rainbowBrush();
    }
    else if (usedbrush == "eraser") {
        eraserbrush();
    }
}
//----the brushes---//
function Mainbrush() {
    if (isToggle == true) {
        for (const x of cellclass) {
            x.addEventListener('mouseover', () => {
                x.style.backgroundColor = color;
                x.style.transition = "background-color 0.7s ease";

                Rainbow.style.color = randomcolor();
                Rainbow.style.borderColor = randomcolor();
                Rainbow.style.transition = "color 0.7s ease";
                Rainbow.style.transition = "border-color 0.7s ease";
            })
        }
    }
    else {
        for (const x of cellclass) {
            x.addEventListener('mousedown', () => {
                x.style.backgroundColor = color;
                x.style.transition = "background-color 0.7s ease";

                Rainbow.style.color = randomcolor();
                Rainbow.style.borderColor = randomcolor();
                Rainbow.style.transition = "color 0.7s ease";
                Rainbow.style.transition = "border-color 0.7s ease";
            })
        }
    }
}
function rainbowBrush() {
    if (isToggle === true) {
        for (const x of cellclass) {
            x.addEventListener('mouseover', () => {
                x.style.backgroundColor = randomcolor();
                x.style.transition = "background-color 0.7s ease";

                Rainbow.style.color = randomcolor();
                Rainbow.style.borderColor = randomcolor();
                Rainbow.style.transition = "color 0.7s ease";
                Rainbow.style.transition = "border-color 0.7s ease";
            })
        }
    }
    else {
        for (const x of cellclass) {
            x.addEventListener('mousedown', () => {
                x.style.backgroundColor = randomcolor();
                x.style.transition = "background-color 0.7s ease";

                Rainbow.style.color = randomcolor();
                Rainbow.style.borderColor = randomcolor();
                Rainbow.style.transition = "color 0.7s ease";
                Rainbow.style.transition = "border-color 0.7s ease";
            })
        }
    }
}
function eraserbrush() {
    if (isToggle == true) {
        for (const x of cellclass) {
            x.addEventListener('mouseover', () => {
                x.style.backgroundColor = "white";
                x.style.transition = "background-color 0.7s ease";
            })
        }
    }
    else {
        for (const x of cellclass) {
            x.addEventListener('mousedown', () => {
                x.style.backgroundColor = "white";
                x.style.transition = "background-color 0.7s ease";
            })
        }
    }
}
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
colorpicker.addEventListener('change', e => {
    color = e.target.value;
    brush.style.color = color;
    brush.style.borderColor = color;
}
);
brush.addEventListener('click', () => {
    usedbrush = "black"
    usedBrushFunction();
})
Rainbow.addEventListener('click', () => {
    usedbrush = "rainbow"
    usedBrushFunction()
},)
eraser.addEventListener('click', () => {
    usedbrush = "eraser"
    usedBrushFunction()
})
//Redrow the grid
clearButton.addEventListener('click', 
    () => {
        gridbuilder();
        usedBrushFunction();
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
brushToggle.addEventListener('click', () => {
    if (isToggle === false) {
        isToggle = true;
    }
    else {
        isToggle = false;
    }
    gridbuilder()//remake the grid so i woldnt have to remove the EventListener
    //this way is so clunky and bad and shold be rewriten when i understand the events listners more//
});

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