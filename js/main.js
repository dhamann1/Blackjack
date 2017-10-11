$(function(){

var deck =  [];

var dealerHand = [];

var playerHand = [];

var playerRender = $('.pCard');

var dealerRender = $('.dCard');


//event listeners 

// restarts game, shuffles deck, gives two cards to both dealer and player
$('.hit').on('click', grabCard);
$('.stand').on('click', checkWin);
$('.deal').on('click', dealCard); 
$('.bet').on('click', betCash);


playerRender.on('click', function(evt){
    console.dir(evt);
});

function createDeck() {
    deck =  [
        {face:'dA',value: 11}, {face:'dK', value: 10},{face:'dQ', value: 10},{face:'dJ', value: 10},{face:'d10', value: 10},{face:'d09', value: 9},{face:'d08', value: 8},{face:'d07', value: 7},{face:'d06', value: 6},{face:'d05', value: 5},{face:'d04', value: 4},{face:'d03', value: 3}, {face:'d02', value: 2}, {face:'hA', value: 11}, {face:'hK', value: 10}, {face:'hQ', value: 10}, {face:'hJ', value: 10}, {face:'h10', value: 10},{face:'h09', value: 9},{face:'h08', value: 8},{face:'h07', value: 7},{face:'h06', value: 6},{face:'h05', value: 5},{face:'h04', value: 4},{face:'h03', value: 3},{face:'h02', value: 2}, {face:'sA', value: 11}, {face:'sK', value: 10}, {face:'sQ', value: 10}, {face:'sJ', value: 10}, {face:'s10', value: 10},{face:'s09', value: 9},{face:'s08', value: 8},{face:'s07', value: 7},{face:'s06', value: 6},{face:'s05', value: 5},{face:'s04', value: 4},{face:'s03', value: 3},{face:'s02', value: 2}, {face: 'cA', value: 11}, {face: 'cK', value: 10}, {face: 'cQ', value: 10}, {face:'cJ', value: 10}, {face:'c10', value: 10},{face:'c09', value: 9},{face:'c08', value: 8},{face:'c07', value: 7},{face:'c06', value: 6}, {face:'c05', value: 5},{face:'c04', value: 4},{face:'c03', value: 3},{face:'c02', value: 2}];
  };


function grabCard() {
  var randomNum = Math.floor(Math.random() * deck.length - 1);
  if (deck.length !== 0 && playerHand.length <= 4){
  var topCard = deck.splice([randomNum], 1)[0];
  }
  else {return;};
  playerHand.push(topCard);
  render(); 
};


function dealCard (){
    var randomNum1 = Math.floor(Math.random() * deck.length - 1);
    var randomNum2 = Math.floor(Math.random() * deck.length - 1);
    var randomNum3 = Math.floor(Math.random() * deck.length - 1);
    var randomNum4 = Math.floor(Math.random() * deck.length - 1);

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
    render(); 
  };


function betCash(){

}


function computeHand(hand) {
    var handSum = 0;
    var cAce = 0; 
    hand.forEach(function(dCard,edx){
        handSum += hand[edx].value;  
        if(hand[edx].value === 11){
            cAce++; 
        }   
        while (handSum > 21 && cAce){
            handSum = handSum - 10; 
        } 
    });
    return handSum;
}


function checkWin() {
    var playerSum = 0;
    var dealerSum = 0; 
    var p1= false; 

    playerSum = computeHand(playerHand);
    dealerSum = computeHand(dealerHand);

    if (playerSum > dealerSum && playerSum <= 21){
        p1 = true;
        alert("Congrats You Won!");
    } else if (dealerSum > playerSum && dealerSum <= 21){
        p1 = false;
        alert("Dealer Wins!");
    } else if (dealerSum === playerSum){
        alert("There's a tie, Don't worry you didn't lose any money")
    }
    console.log(dealerHand);
    console.log(dealerSum);
    console.log(playerHand);
    console.log(playerSum);
    init(); 
    render(); 
};


function render() {
        playerRender.each(function(idx){
            if (idx > playerHand.length - 1) {
                $(this).removeClass().addClass('card outline');
            } else {
                $(this).removeClass().addClass(`card ${playerHand[idx].face}`);
            }
        })
        dealerRender.each(function(idx){
            if (idx > dealerHand.length - 1){
                $(this).removeClass().addClass('card outline');
            } 
            
            else if (idx === 1){
                $(this).removeClass().addClass('card back');
            }
            else {
                $(this).removeClass().addClass(`card ${dealerHand[idx].face}`);
            }
        })
    }




function init() {
    playerHand = [];
    dealerHand = [];
    createDeck(); 
    render();
};


init(); 


});