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
var numbers = 6;
var cardGrid = [];

if(mode === 'easy') {
  colours = ['red', 'blue'];
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

/////////////////////////////
//Check for match function
////////////////////////////
function isMatch(clickedCardsArray) {
  // returns a boolen
  return clickedCardsArray[0].text() === clickedCardsArray[1].text() && clickedCardsArray[0].attr("class") === clickedCardsArray[1].attr("class");
}

/////////////////////////
//Switch turns function
/////////////////////////
function switchPlayers() {
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

/////////////////////////////////////////////
//Card object generator --
//contains Card instance.element click event
/////////////////////////////////////////////
var counter = 0;
// Currently not using the counter/id of card-counterNum for anything,
//but maybe it will be useful for
// shuffling the ordering of the layout???
var numClicks = 0;
var clickedCards = [];
function Card(number, colour){
  counter += 1;
	$('#card-container').append('<div id="card-' + counter + '" class="card back" data-number=' + number + ' data-colour=' + colour + ' ></div>');
	this.element = $('.card').last()
	this.element.on('click', function(){
    numClicks += 1;
    if($(this).text() != '') {
      $(this).text('');
    } else {
      $(this).text($(this).data('number'));
    }
    $(this).toggleClass('back ' + $(this).data('colour'));
    clickedCards.push($(this));
    if(numClicks == 2) {
      //after two cards have been picked
      if(isMatch(clickedCards)) {
        //if is a match
        console.log('a match!');
        currentPlayer.score += 1;
        //turn off click event for matched cards
        clickedCards.forEach(function(element, index, array) {
          element.off();
        });
        displayPlayer();
      } else {
        //if no match
        console.log('no match!');
        //use something other than toggleClass so that the second card can be seen before being flipped back over???
        //no match, so turn cards back over
        clickedCards.forEach(function(element, index, array) {
          element.text('');
          element.toggleClass('back ' + element.data('colour'));
        });
        switchPlayers();
        displayPlayer();
      }
    numClicks = 0;
    clickedCards = [];
    }
	});
}

//////////////////////////////////////////////////////
//Play button click event, calls Card object generator
//////////////////////////////////////////////////////
$('#play-button').on('click', function(){
  displayPlayer();
  for(var i = 0; i < colours.length; i++) {
    for(var j = 1; j <= numbers; j++) {
      // Currently NOT using the cardGrid for anything; how to use to shuffle now that code has changed???
      cardGrid.push(new Card(j, colours[i]));
      cardGrid.push(new Card(j, colours[i]));
    }
  }
});
