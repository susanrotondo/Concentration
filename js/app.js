var game = {
  player1: {
    score: 0,
    name: 'Player 1'
  },
  player2: {
    score: 0,
    name: 'Player 2'
  }
}

var currentPlayer = game.player1;

var mode = 'easy';
var colours = [];
var numbers = 9;
var cardGrid = [];

if(mode === 'easy') {
  colours = ['red', 'blue'];
}

////////////////////////////////
//Create array of Card objects
////////////////////////////////
function deal() {
  for(var i = 0; i < colours.length; i++) {
    for(var j = 1; j <= numbers; j++) {
      cardGrid.push(new Card(j, colours[i]));
      cardGrid.push(new Card(j, colours[i]));
    }
  }
  return cardGrid;
}

/////////////////////////////////////////////////
//Shuffle ordering of object array from deal()
/////////////////////////////////////////////////
function shuffle(orderedGrid) {
  var shuffledGrid = [];
  while(orderedGrid.length > 0) {
    var randomIndex = Math.floor(Math.random() * (orderedGrid.length -1));
    shuffledGrid.push(orderedGrid[randomIndex]);
    orderedGrid.splice(randomIndex, 1);
  }
  return shuffledGrid;
}

/////////////////////////
//Card object generator
////////////////////////
function Card(number, colour) {
  this.number = number;
  this.colour = colour;
  this.element = '<div class="card back"></div>';
}

/////////////////////////////
//Check for match function
////////////////////////////
//****** RETURN A BOOLEAN ********
function isMatch(clickedCardsArray) {
  return clickedCardsArray[0].innerHTML === clickedCardsArray[1].innerHTML && clickedCardsArray[0].className === clickedCardsArray[1].className;
}

/////////////////////////
//Switch turns function
/////////////////////////
function switchTurns() {
  if(currentPlayer == game.player1) {
    currentPlayer = game.player2;
  } else {
    currentPlayer = game.player1;
  }
}

/////////////////////////////////
//Current player display function
/////////////////////////////////
function displayPlayer() {
  $('#info-display').text("It's " + currentPlayer.name +"'s turn!");
}

//////////////////////////////
//jQuery event functions begin
//////////////////////////////

var $play = $('#play-button');
var $cardContainer = $('#card-container');

//Play button click event
$play.on('click',function() {
  displayPlayer();
  var grid = shuffle(deal());
  $.each(grid, function(index, value) {
    $cardContainer.append(value.element);
  });
  //div.card click event
  var numClicks = 0;
  var clickedCards = [];
  $('div.card').on('click',function() {
    clickedCards.push(this);
    var $selectedIndex = $('div.card').index(this);
    var selectedNumber = grid[$selectedIndex].number;
    var selectedColour = grid[$selectedIndex].colour;
    numClicks += 1;
    $(this).text(selectedNumber);
    $(this).toggleClass(selectedColour + ' back');
    if(numClicks === 2) {
      if(isMatch(clickedCards)) {
        console.log('match');
        currentPlayer.score += 1;
        //make cards unclickable (OR remove cards from /board)
        //** IF ONE PAIR LEFT, AUTO TURN OVER AND GIVE POINTS TO CURRENT PLAYER **
        //   ^^^ THIS WILL BE THE POINT AT WHICH WINNER IS DETERMINED ^^^
        //if no winner, current player gets another turn
      } else {
        console.log('no match');
        //turn cards back over
        // for(var i = 0; i < clickedCards.length; i++) {
        //   clickedCards[i].classList.toggle(selectedColour);
        //   clickedCards[i].classList.toggle('back');
        //   clickedCards[i].innerHTML = '';
        //   below doesn't work either -- toggles off all classes
        //   $(clickedCards[i]).toggleClass(clickedCards[i].className);
        // }
        //switch players
        switchTurns();
        displayPlayer();
      }
      clickedCards = [];
      numClicks = 0;
    }
    });
});
