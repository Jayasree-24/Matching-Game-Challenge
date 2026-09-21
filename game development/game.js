const gameboard = document.querySelector('#gameboard');
const score = document.querySelector('#score');
const moves = document.querySelector('#moves');
const timer = document.querySelector('#timer');

const flipSound = new Audio("sounds/flip.wav");
const matchSound = new Audio("sounds/match.wav");
const wrongSound = new Audio("sounds/wrong.wav");
const winSound = new Audio("sounds/win.wav");


const cardArray = [
  {
    name: "apple",
    image: "images/apple.jpg"
  },
  {
    name: "burger",
    image: "images/burger.jpg"
  },
  {
    name: "elephant",
    image: "images/elephant.webp"
  },
  {
    name: "mango",
    image: "images/mango.png"
  },
  {
    name: "popcorn",
    image: "images/popcorn.jpg"
  },
  {
    name: "monkey",
    image: "images/monkey.jpg"
  },
  {
    name: "apple",
    image: "images/apple.jpg"
  },
  {
    name: "burger",
    image: "images/burger.jpg"
  },
  {
    name: "elephant",
    image: "images/elephant.webp"
  },
  {
    name: "mango",
    image: "images/mango.png"
  },
  {
    name: "popcorn",
    image: "images/popcorn.jpg"
  },
  {
    name: "monkey",
    image: "images/monkey.jpg"
  },
  
];

cardArray.sort(()=> 0.5-Math.random())

createcards();

function createcards(){
  for(let i=0; i<cardArray.length; i++)
  {
    const c = document.createElement('img');
    c.setAttribute('src', 'images/pink.webp');
    c.setAttribute('id',i);
    c.addEventListener('click',flipcard);
    gameboard.appendChild(c);
  }
  console.log(cardArray);
}
c_chosen = [];
c_chosen_id = [];
let movecount = 0;
timeLeft = 45;
timer.textContent = timeLeft;
timerStarted = false;;

function startTimer() {

    timerInterval = setInterval(() => {

        timeLeft--;

        timer.textContent = timeLeft;

        if (timeLeft === 0) {

            clearInterval(timerInterval);

            alert("Time's Up!");

            // Stop the game
            gameStarted = true;

        }

    }, 1000);
}

function flipcard(){
   if (!timerStarted) {
        timerStarted = true;
        startTimer();
    }

    const cardid = this.getAttribute("id");

    // Play flip sound
    flipSound.currentTime = 0;
    flipSound.play();

    this.setAttribute('src', cardArray[cardid].image);

    c_chosen_id.push(cardid);
    c_chosen.push(cardArray[cardid].name);

    if(c_chosen.length === 2){
      movecount++;
      moves.innerHTML = movecount;

        setTimeout(checkmatch,400);
    }
}


result = [];
function checkmatch(){
  const card = document.querySelectorAll('img');
  if(c_chosen[0] == c_chosen[1]){
    // Play match sound
    matchSound.currentTime = 0;
    matchSound.play();

    //alert("You have found!");
    card[c_chosen_id[0]].setAttribute('src','images/purple.png');
    card[c_chosen_id[1]].setAttribute('src','images/purple.png');
    card[c_chosen_id[0]].removeEventListener('click',flipcard);
    card[c_chosen_id[1]].removeEventListener('click',flipcard);
    result.push(c_chosen);
    score.innerHTML = result.length;
  }
  else{
    wrongSound.currentTime = 0;
    wrongSound.play();

    card[c_chosen_id[0]].setAttribute('src','images/pink.webp');
    card[c_chosen_id[1]].setAttribute('src','images/pink.webp');
  }
  c_chosen = [];
  c_chosen_id = [];

  if(result.length == cardArray.length/2){
    clearInterval(timerInterval);
    score.innerHTML = 'You won the Match 🤩';
    winSound.play();
  }

}
