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
const Toggle = document.getElementById("toggle");
//defualt values
let usedbursh = "Black";
let isToggle = false;
gridbuilder(slider.value, slider.value);
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
    brush(usedbursh)
}

function deletElements()//remove elments
{
    while (gridcontainer.lastElementChild) {
        gridcontainer.removeChild(gridcontainer.lastElementChild)
    }
}
//-------------to show the slide value and update it
sliderDisplay.innerHTML = slider.value + "x" + slider.value;
slider.oninput = function () {
    sliderDisplay.innerHTML = this.value + "x" + this.value;
};
//-------------------------------------------------------
function brush(brushtype) {
    if (brushtype === "Rainbow") {
        if (isToggle == true) {
            for (const x of cellclass) {
                x.addEventListener('mouseover', () => {
                    x.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
                    x.style.transition= "background-color 1.0s ease";

                })
            }
        }
        else {
            for (const x of cellclass) {
                x.addEventListener('mousedown', () => {
                    x.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
                    x.style.transition= "background-color 1.0s ease";

                })
            }
        }
    }
    if (brushtype === "Black") {
        if (isToggle == true) {
            for (const x of cellclass) {
                x.addEventListener('mouseover', () => {
                    x.style.backgroundColor = "black";
                    x.style.transition= "background-color 1.0s ease";

                })
            }
        }
        else {
            for (const x of cellclass) {
                x.addEventListener('mousedown', () => {
                    x.style.backgroundColor = "black";
                    x.style.transition= "background-color 1.0s ease";
                })
            }
        }
    }
    if (brushtype === "Lighten") {
        if (isToggle == true) {
            for (const x of cellclass) {
                x.addEventListener('mouseover', () => {
                    x.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
                })
            }
        }
        else {
            for (const x of cellclass) {
                x.addEventListener('mousedown', () => {
                    x.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
                })
            }
        }
    }
}

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}


function updateToggle()
{
    if(isToggle === false) {
        isToggle = true;
    }
    else {
        isToggle = false;
    }
    console.log(isToggle);
    brush(usedbursh);
}
//----------------------Listeners-------------//
slider.addEventListener('input', () => gridbuilder());

clearButton.addEventListener('click', //to clear the tiles and redrow them
    () => {
        deletElements();
        gridbuilder();
    }
);
Toggle.addEventListener('click', updateToggle);

Rainbow.addEventListener('click', () => {
    usedbursh = "Rainbow";
    brush(usedbursh)
}
)
Black.addEventListener('click', () => {
    usedbursh = "Black";
    brush(usedbursh)
}
)
Lighten.addEventListener('click', () => {
    usedbursh = "Lighten";
    brush(usedbursh)
}
)
