
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
let score = document.querySelector('.score');

const btnStart = document.querySelector('.start');

let lastHole = null;
let isPlaying = false;
let counter = 0;

const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const randomHole = () =>{
    let id = Math.floor(Math.random() * holes.length);
    const hole = holes[id];

    if(hole === lastHole) 
    {
        return randomHole(holes);
    }

    lastHole = hole;
    return hole;
};

const showMole = () => {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);

    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
            if(isPlaying) showMole();
    }, time);
};

btnStart.addEventListener('click', () => {
    if(!isPlaying) {
        counter = 0;
        score.innerText = counter;
        isPlaying = !isPlaying;
        showMole();

        setTimeout(()=>{
            isPlaying = !isPlaying;
        },10000)
    }
});

function bonk(e) {
    if(!e.isTrusted) return;

    counter++;
    this.parentNode.classList.remove('up');
    
    score.innerText = counter;
};

moles.forEach((mole)=>{
    mole.addEventListener('click', bonk);
});

