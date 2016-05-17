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
  // return a boolen
  return clickedCardsArray[0].text() === clickedCardsArray[1].text() && clickedCardsArray[0].attr("class") === clickedCardsArray[1].attr("class");
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

/////////////////////////
//Card object generator
/////////////////////////
var counter = 0;
// Currently not using the counter/id of card-counterNum for anything, but maybe it will be useful for
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
      if(isMatch(clickedCards)) {
        console.log('a match!');
        currentPlayer.score += 1;
        displayPlayer();
      } else {
        console.log('no match!');
      }
    numClicks = 0;
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

// $play.on('click',function() {
//   displayPlayer();
//   var grid = shuffle(deal());
//   $.each(grid, function(index, value) {
//     $cardContainer.append(value.element);
//   });
  //div.card click event
  // var numClicks = 0;
  // var clickedCards = [];
  // $('div.card').on('click',function() {
  //   clickedCards.push(this);
  //   var $selectedIndex = $('div.card').index(this);
  //   var selectedNumber = grid[$selectedIndex].number;
  //   var selectedColour = grid[$selectedIndex].colour;
  //   numClicks += 1;
  //   $(this).text(selectedNumber);
  //   $(this).toggleClass(selectedColour + ' back');
  //   if(numClicks === 2) {
  //     if(isMatch(clickedCards)) {
  //       console.log('match');
  //       currentPlayer.score += 1;
  //     } else {
  //       console.log('no match');
  //       switchTurns();
  //       displayPlayer();
  //     }
  //     clickedCards = [];
  //     numClicks = 0;
  //   }
  //   });
// });
