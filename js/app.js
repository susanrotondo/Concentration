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
  $('div.card').on('click',function() {
    var selectedIndex = $('div.card').index(this);
    var selectedNumber = grid[selectedIndex].number;
    $(this).text(selectedNumber);
    $(this).toggleClass('red back');
    });
});
