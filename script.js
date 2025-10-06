let w = 8
let h = 8

let detalu = [[[1, 0, 0],
[0, 0, 0],
[0, 0, 0]],

[[1, 1, 0],
[0, 0, 0],
[0, 0, 0]],

[[1, 1, 0],
[1, 0, 0],
[0, 0, 0]],

[[1, 1, 0],
[1, 1, 0],
[0, 0, 0]],

[[1, 1, 1],
[0, 0, 0],
[0, 0, 0]],

[[1, 1, 1],
[0, 1, 0],
[0, 0, 0]],

[[1, 1, 1],
[1, 0, 0],
[0, 0, 0]],]

let grid = document.querySelector('.grid')
let i = 0

class Small extends HTMLElement {
    constructor() {
    
        super();
        
        this.id = i;
        i += 1;
   

    
  }
}
customElements.define("small-papa", Small);

function onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function onDrop(event) {
    event.preventDefault();
    const piece_id = event.dataTransfer.getData('text/plain');
    const block = document.getElementById(piece_id)
    const color = block.style.backgroundColor
    let cell = event.currentTarget;

    if (cell.style.opacity < 1) {
        cell.style.backgroundColor = color
        cell.style.opacity = 1
        //block.remove()
    }
      
}

function createGrid(rows, cols) {
        

    // Apply CSS Grid to the        grid
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    // Optional: Add gap between grid items


    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let kletka = document.createElement('div');
            //Добавить клетки класс клетка
            kletka.classList.add('kletka');
            kletka.id = i+`-`+j;
            kletka.addEventListener('dragover', onDragOver);
            kletka.addEventListener('drop', onDrop);
            
            
            
            //Добавить клетку в грид
            grid.appendChild(kletka);
            }
    }
}

function create(block) {
    let html = ''
    for (let row of block) {
        for(let kletka of row) {
            if (kletka == 1) {
                html +='<small-papa class="small"></small-papa>'
            }else{
                html +='<small-papa class="lox"></small-papa>'
            }

        }
    }
    return `<div class="detal">${html}</div>`
}



// Call the function to create a 5x5 grid
createGrid(w, h);



let detallll = document.createElement('div');

detallll.innerHTML = create(detalu[6])



let stolbik = document.querySelectorAll('.stolbik')[1]

stolbik.appendChild(detallll);


detallll.draggable = true
detallll.id = last_piece
detallll.addEventListener('dragstart', onDragStart);
detallll.addEventListener('dragend', onDragEnd);

function onDragStart(event) {
        // Передаем цвет детали и id (если нужно)
        event.dataTransfer.setData('text/plain', detallll.id);
        // Запоминаем, что это перетаскивание детали
        event.dataTransfer.effectAllowed = 'move';
       
    }

function onDragEnd(event) {
        detallll.style.opacity = '1';
    }