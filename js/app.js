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
function isMatch(arrayOfVals) {
  return arrayOfVals[0][0] === arrayOfVals[1][0] && arrayOfVals[0][1] === arrayOfVals[1][1];
}

//////////////////////////////
//jQuery event functions begin
//////////////////////////////

var $play = $('#play-button');
var $cardContainer = $('#card-container');

//Play button click event
$play.on('click',function() {
  var grid = shuffle(deal());
  $.each(grid, function(index, value) {
    $cardContainer.append(value.element);
  });
  //div.card click event
  var numClicks = 0;
  var clickedVals = [[], []];
  $('div.card').on('click',function() {
    var $selectedIndex = $('div.card').index(this);
    var selectedNumber = grid[$selectedIndex].number;
    var selectedColour = grid[$selectedIndex].colour;
    clickedVals[numClicks].push(selectedNumber);
    clickedVals[numClicks].push(selectedColour);
    numClicks += 1;
    $(this).text(selectedNumber);
    $(this).toggleClass(selectedColour + ' back');
    if(numClicks === 2) {
      if(isMatch(clickedVals)) {
        //if a match
        //increment player score
        //remove cards from play/board (function)
        //check for winner (function)
        //if no winner, player gets another turn
        console.log('match');
      } else {
        //if NO match
        //turn cards back over
        //switch players
        console.log('no match');
      }
      numClicks = 0;
    }
    });
});
