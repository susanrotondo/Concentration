var mode = 'easy';
var numColors = 0;
var cardGrid = [];

if(mode === 'easy') {
  numColors = 2;
}

function deal() {
  for(var i = 1; i <= 9; i++) {
    cardGrid.push(new Card(i));
    cardGrid.push(new Card(i));
  }
  return cardGrid;
}

function Card(value) {
  this.innerText = value;
}

var $play = $('#play-button');
var $cardContainer = $('#card-container')

$play.on('click',function() {
  var grid = deal();
  $.each(grid, function(index, value) {
    $cardContainer.append('<div class="card">' + value.innerText + '</div>');
  });
});



///////////////////////////
//     UNIT TESTING
///////////////////////////
// console.log(deal());
