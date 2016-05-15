var mode = 'easy';
var colours = [];
var numbers = 9;
var cardGrid = [];

if(mode === 'easy') {
  colours = ['red', 'blue'];
}

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
function shuffle() {

}

/////////////////////////
//Card object generator
////////////////////////
function Card(number, colour) {
  this.number = number;
  this.colour = colour;
}

/////////////////////////
//jQuery event functions
/////////////////////////
var $play = $('#play-button');
var $cardContainer = $('#card-container')

$play.on('click',function() {
  var grid = deal();
  $.each(grid, function(index, value) {
    $cardContainer.append('<div class="card-back"></div>');
  });
});
