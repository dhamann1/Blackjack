// $(function(){

var deck =  [];

var dealerHand = [];

var playerHand = [];

var playerContainer = $('.playerHand');

var dealerContainer = $('.dealerHand');

var winner = null; 

var bankroll = 500;
var bet = 0;


// d - dealer wins
//p - player wins

// t - tie 
//dBL - dealer blackjack
//pBL - player blackjack

//pB - player busts


$('.hit').on('click', function() {
    grabCard(playerHand);
    var playerSum = computeHand(playerHand);
    if (playerSum > 21) winner = "pB";
    render();
});
$('.stand').on('click', checkWin);
$('.deal').on('click', function() {
    init();
    dealCard();
}); 

$('.bet').on('click', betMoney);



function createDeck() {
    deck =  [
        {face:'dA',value: 11}, {face:'dK', value: 10},{face:'dQ', value: 10},{face:'dJ', value: 10},{face:'d10', value: 10},{face:'d09', value: 9},{face:'d08', value: 8},{face:'d07', value: 7},{face:'d06', value: 6},{face:'d05', value: 5},{face:'d04', value: 4},{face:'d03', value: 3}, {face:'d02', value: 2}, {face:'hA', value: 11}, {face:'hK', value: 10}, {face:'hQ', value: 10}, {face:'hJ', value: 10}, {face:'h10', value: 10},{face:'h09', value: 9},{face:'h08', value: 8},{face:'h07', value: 7},{face:'h06', value: 6},{face:'h05', value: 5},{face:'h04', value: 4},{face:'h03', value: 3},{face:'h02', value: 2}, {face:'sA', value: 11}, {face:'sK', value: 10}, {face:'sQ', value: 10}, {face:'sJ', value: 10}, {face:'s10', value: 10},{face:'s09', value: 9},{face:'s08', value: 8},{face:'s07', value: 7},{face:'s06', value: 6},{face:'s05', value: 5},{face:'s04', value: 4},{face:'s03', value: 3},{face:'s02', value: 2}, {face: 'cA', value: 11}, {face: 'cK', value: 10}, {face: 'cQ', value: 10}, {face:'cJ', value: 10}, {face:'c10', value: 10},{face:'c09', value: 9},{face:'c08', value: 8},{face:'c07', value: 7},{face:'c06', value: 6}, {face:'c05', value: 5},{face:'c04', value: 4},{face:'c03', value: 3},{face:'c02', value: 2}];
  };


function grabCard(hand) {
  var randomNum = Math.floor(Math.random() * deck.length);
  var topCard = deck.splice([randomNum], 1)[0];
  hand.push(topCard);
};



function betMoney(){
    value = parseInt($("input[type='number']").val()); 
    bet += value;
};





function dealCard (){
    var randomNum1 = Math.floor(Math.random() * deck.length - 1);
    var randomNum2 = Math.floor(Math.random() * deck.length - 1);
    var randomNum3 = Math.floor(Math.random() * deck.length - 1);
    var randomNum4 = Math.floor(Math.random() * deck.length - 1);
    p1 = null;

    if (deck.length !== 0){
    var topCard = deck.splice([randomNum1], 1)[0];
    var secondCard = deck.splice([randomNum2], 1)[0];
    var thirdCard = deck.splice([randomNum3], 1)[0];
    var fourthCard = deck.splice([randomNum4], 1)[0];
    }
    else {return;};
    playerHand.push(topCard);
    playerHand.push(secondCard);
    dealerHand.push(thirdCard);
    dealerHand.push(fourthCard);
    if(computeHand(playerHand) === 21) {
        winner = "pBL"; 
    } else if (computeHand(dealerHand) === 21){
        winner = "dBL"; 
    }
    render(); 
  };

function computeHand(hand) {
    var handSum = 0;
    var cAce = 0; 
    hand.forEach(function(card){
        handSum += card.value;  
        if(card.value === 11) cAce++; 
    });
    while (handSum > 21 && cAce){
        handSum = handSum - 10;
        cAce--;
    } 
    return handSum;
}


function checkWin() {
    var playerSum = computeHand(playerHand);
    var dealerSum = computeHand(dealerHand);
    while (dealerSum < 17){
        grabCard(dealerHand);
        dealerSum = computeHand(dealerHand);
        checkWin();
    } 
    if (playerSum > dealerSum && playerSum < 21 || dealerSum > 21){
        winner = "p";
    } else if (playerSum === 21){
        winner = "pBL"; 
    }
    if (dealerSum > playerSum && dealerSum < 21){
        winner = "d";
    } else if (dealerSum === 21){
        winner = "dBL"; 
    }
    if (dealerSum === playerSum){
        winner = "t";
    }
    render();
    console.log(playerSum);
    console.log(dealerSum);

};


function render() {
        var className, cardEl;
        playerContainer.html('');
        playerHand.forEach(function(card, idx){
            className = playerHand[idx].face;
            cardEl = $(`<article class="card ${className}">`);
            playerContainer.append(cardEl);     
        });

        dealerContainer.html('');
        dealerHand.forEach(function(card, idx) {
            var className = (idx === 0 && !winner) ? 'card back' : dealerHand[idx].face;
            var cardEl = $(`<article class="card ${className}">`);
            dealerContainer.append(cardEl);
        });

        winner === null && playerHand.length ? $('.deal').hide() : $('.deal').show();
        

        switch (winner){
            case "p":
                $('h3').empty().text("Player Wins!");
                break;
            case "d":
                $('h3').empty().text("Dealer Wins!");
                break;
            case "pBL":
                $('h3').empty().text("Player got Blackjack!");
                break;
            case "dBL":
                $('h3').empty().text("Dealer got Blackjack!");
                break;
            case "t":
                $('h3').empty().text("There's a Tie, Play again!");
                break;
            case "pB":
                $('h3').empty().text("You Busted! You lose!");
                break;
            default: 
                 $('h3').empty().text("Wecome to Blackjack. Good luck!");
            break; 
        }
    }




function init() {
    playerHand = [];
    dealerHand = [];
    winner = null;
    createDeck(); 
    render();
};


init(); 


// });