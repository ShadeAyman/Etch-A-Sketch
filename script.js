const gridcontainer = document.getElementById('gridContainer');
const cell = document.createElement("div");
cell.classList.add('cell');
const slider = document.getElementById("slider");
const sliderDisplay = document.getElementById("display");
const removecell =document.getElementsByClassName('cell');
const cellclass = document.getElementsByClassName("cell");
//functions
function gridbuilder (columns , rows) //a function that builds cells
{
    deletElements();
    gridcontainer.style.gridTemplateColumns = " repeat("+columns+", 1fr)";
    gridcontainer.style.gridTemplateRows = " repeat("+rows+", 1fr)";
    let cellcount = columns*rows;
    for (let i = 1; i <= cellcount; i++)
    {
        gridcontainer.appendChild(cell.cloneNode());
    }
}

function deletElements()//remove elments
{
    while(gridcontainer.lastElementChild)
    {
        gridcontainer.removeChild(gridcontainer.lastElementChild)
    }
}
//-------------to show the slide value and update it
sliderDisplay.innerHTML=slider.value+"x"+slider.value;
slider.oninput = function() {
    sliderDisplay.innerHTML = this.value+"x"+this.value;
};
//-------------------------------------------------------

//--------------trying to make the slider change the count-----////
//note to self:
///if this failed do buttons 16 32 64
  slider.addEventListener('input',gridbuilder (slider.value , slider.value));

