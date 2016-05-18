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
// Once option to choose difficulty mode functional, move into game object initialized to mode: ''
// Update based on player mode selection?????
var mode = 'easy';
var colours = [];
var numbers = 6;

if(mode === 'easy') {
  colours = ['red', 'blue'];
}


/////////////////////////////////////////////////////////////////////////
//Shuffle ordering of Cards in DOM
//found at: https://css-tricks.com/snippets/jquery/shuffle-dom-elements/
/////////////////////////////////////////////////////////////////////////
(function($){
    $.fn.shuffle = function() {
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
        return $(shuffled);
    };
})(jQuery);
///////////////////////////////////////////////////////////////////////

/////////////////////////////
//Check for match function
////////////////////////////
function isMatch(clickedCardsArray) {
  // returns a boolen
  return clickedCardsArray[0].text() === clickedCardsArray[1].text() && clickedCardsArray[0].attr("class") === clickedCardsArray[1].attr("class");
}
/////////////////////////////

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
///////////////////////////

/////////////////////////////////
//Current player display function
/////////////////////////////////
function displayPlayer() {
  $('#info-display').text("It's " + currentPlayer.name +"'s turn!");
}
////////////////////////////////

/////////////////////////////////
//Update score display function
/////////////////////////////////
function scoreDisplay(player) {
  if(player.name == 'Player 1') {
    $('#player-one').text(player.score);
  } else {
    $('#player-two').text(player.score);
  }
}
//////////////////////////////////

//////////////////////////
//Update heads-up display
//////////////////////////
function headsUp(match) {
  if(!match) {
    $('#no-match').show().delay(2000).fadeOut();
  } else {
    $('#yes-match').show().delay(2000).fadeOut();
  }
}
//////////////////////////

/////////////////////////////////////////////
//Card object generator --
//contains Card instance.element click event
/////////////////////////////////////////////

// Currently not using the counter/id of card-counterNum for anything
var counter = 0;

var numClicks = 0;
var clickedCards = [];

function Card(number, colour){
  //counter currently not being used for anything
  counter += 1;
	$('#card-container').append('<div id="card-' + counter + '" class="card back" data-number=' + number + ' data-colour=' + colour + ' ></div>');
  //add jQuery object as element property to last-created div with .card class
	this.element = $('.card').last()
  //add click event to jQuery object
	this.element.on('click', function(){
    numClicks += 1;
    if($(this).text() != '') {
      $(this).text('');
    } else {
      $(this).text($(this).data('number'));
    }
    $(this).toggleClass('back ' + $(this).data('colour'));
    clickedCards.push($(this));
    //after two cards have been picked
    if(numClicks == 2) {
      //if is a match
      if(isMatch(clickedCards)) {
        // ------------------------------------------------------> placeholder for match condition
        console.log('a match!');
        headsUp(true);
        currentPlayer.score += 1;
        scoreDisplay(currentPlayer);
        //turn off click event for matched cards
        clickedCards.forEach(function(element, index, array) {
          element.off();
        });
        numClicks = 0;
        clickedCards = [];
        displayPlayer();
        //if no match
      } else {
        setTimeout(function(){
          // --------------------------------------------------> placeholder for no match condition
          console.log('no match!');
          clickedCards.forEach(function(element, index, array) {
            element.text('');
            element.toggleClass('back ' + element.data('colour'));
          });
          numClicks = 0;
          clickedCards = [];
          switchPlayers();
          displayPlayer();
        }, 800);
        headsUp(false);
      }
    }
	});
}
/////////////////////////////////////////////

//////////////////////////////////////////////////////
//Play button click event, calls Card object generator
//////////////////////////////////////////////////////
$('#play-button').on('click', function(){
  $('#player-one').text(game.player1.score);
  $('#player-two').text(game.player2.score);
  displayPlayer();
  for(var i = 0; i < colours.length; i++) {
    for(var j = 1; j <= numbers; j++) {
      new Card(j, colours[i]);
      new Card(j, colours[i]);
    }
  }
  //shuffle Cards ordering in DOM
  $('.card').shuffle();
});
///////////////////////////////////////////////////////
