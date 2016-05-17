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

/////////////////////////
//Card object generator
/////////////////////////
var counter = 0;
function Card(number, colour){
  counter += 1;
	$('#card-container').append('<div id="card-' + counter + '" class="card back" data-number=' + number + ' data-colour=' + colour + ' ></div>');
	this.element = $('.card').last()
	this.element.on('click', function(){
    if($(this).text() != '') {
      $(this).text('');
    } else {
      $(this).text($(this).data('number'));
    }
    $(this).toggleClass('back ' + $(this).data('colour'));
	});
}

//////////////////////////////////////////////////////
//Play button click event, calls Card object generator
//////////////////////////////////////////////////////
$('#play-button').on('click', function(){
  displayPlayer();
  for(var i = 0; i < colours.length; i++) {
    for(var j = 1; j <= numbers; j++) {
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
