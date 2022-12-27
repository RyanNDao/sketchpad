let sketchpad = document.querySelector('.sketchpad');

function resetBoard(){
    do {
        numOfTiles = Number(prompt('Number of tiles per row/column (max: 100)?'));
        if (numOfTiles > 100){
            console.log('Number greater than 100');
            numOfTiles = NaN;
        }
    } while (Object.is(numOfTiles,NaN))
    createTiles(numOfTiles);
}

function createTiles(numOfTiles){
    sketchpad.innerHTML = '';
    for (let i=0;i<numOfTiles;i++){
        let divColumn = document.createElement('div');
        divColumn.style.display = 'flex';
        for (let j=0;j<numOfTiles;j++){
            let tile = document.createElement('div');
            tile.style.height = `${100/numOfTiles}vh`;
            tile.style.width = `${100/numOfTiles}vh`;
            tile.className = 'tile'
            divColumn.appendChild(tile);
        }
        sketchpad.appendChild(divColumn);
    }
    addEventListenersToTiles();
}

function addEventListenersToTiles (){
    let tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.addEventListener('mouseover', () => {
            (tile.style.backgroundColor === '') ? tile.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0") : tile.style.backgroundColor = darkenColor(tile.style.backgroundColor)
        })
    })
}


function darkenColor(rgbString){
    let splitString = rgbString.split(',');
    let rgbList = [];
    for (rgbValue of splitString){
        rgbValue = Number(rgbValue.replace(/[^0-9]/g,''));
        rgbValue = Math.floor(rgbValue - (rgbValue/2))
        rgbList.push(rgbValue);
    }
    return `rgb(${rgbList[0]}, ${rgbList[1]}, ${rgbList[2]})`

}

createTiles(4);
resetButton = document.querySelector('.reset')
resetButton.addEventListener('click',resetBoard);