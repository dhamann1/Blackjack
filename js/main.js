$(function(){

var deck;

var dealerHand;
var playerHand;

var playerContainer = $('.playerHand');
var dealerContainer = $('.dealerHand');

var playerSum;
var dealerSum; 

var winner = null; 

var bankRoll = 1000;
var bet = 0;

var sounds = {
    haha: "http://www.richmolnar.com/Sounds/Nelson%20-%20Ha%20ha.wav",
    woho: "http://www.richmolnar.com/Sounds/Homer%20-%20Woohoo!%20(1).wav",
    hotdigity: "http://www.richmolnar.com/Sounds/Ned%20-%20Hot%20diggity.wav",
    comeagain: "http://www.richmolnar.com/Sounds/Apu%20-%20Please%20come%20again.wav",
    shutup: "http://www.thesoundarchive.com/play-wav-files.asp?sound=simpsons/misc/casino.mp3"
}

var haha = new Audio(sounds.haha);
var woho = new Audio(sounds.woho);
var hotdigity = new Audio(sounds.hotdigity);
var comeagain = new Audio(sounds.comeagain);



$('.hit').on('click', function() {
    grabCard(playerHand);
    playerSum = computeHand(playerHand);
    if (playerSum > 21) winner = "pB";
    else if (playerSum === 21) winner = "pBL"; 
    render();
});
$('.stand').on('click', checkWin);
$('.deal').on('click', function() {
    init();
    dealCard();

}); 

$('.chip10').on('click', function(){
    betMoney(10);
});

$('.chip25').on('click', function(){
    betMoney(25);
});

$('.chip100').on('click', function(){
    betMoney(100);
});

$('.reset').on('click', function(){ 
    bankRoll += bet; 
    bet = 0; 
    $('.betPool').html(bet);
    $('.bankRoll').html(bankRoll);

});

function createDeck() {
    deck =  [
        {face:'dA',value: 11}, {face:'dK', value: 10},{face:'dQ', value: 10},{face:'dJ', value: 10},{face:'d10', value: 10},{face:'d09', value: 9},{face:'d08', value: 8},{face:'d07', value: 7},{face:'d06', value: 6},{face:'d05', value: 5},{face:'d04', value: 4},{face:'d03', value: 3}, {face:'d02', value: 2}, {face:'hA', value: 11}, {face:'hK', value: 10}, {face:'hQ', value: 10}, {face:'hJ', value: 10}, {face:'h10', value: 10},{face:'h09', value: 9},{face:'h08', value: 8},{face:'h07', value: 7},{face:'h06', value: 6},{face:'h05', value: 5},{face:'h04', value: 4},{face:'h03', value: 3},{face:'h02', value: 2}, {face:'sA', value: 11}, {face:'sK', value: 10}, {face:'sQ', value: 10}, {face:'sJ', value: 10}, {face:'s10', value: 10},{face:'s09', value: 9},{face:'s08', value: 8},{face:'s07', value: 7},{face:'s06', value: 6},{face:'s05', value: 5},{face:'s04', value: 4},{face:'s03', value: 3},{face:'s02', value: 2}, {face: 'cA', value: 11}, {face: 'cK', value: 10}, {face: 'cQ', value: 10}, {face:'cJ', value: 10}, {face:'c10', value: 10},{face:'c09', value: 9},{face:'c08', value: 8},{face:'c07', value: 7},{face:'c06', value: 6}, {face:'c05', value: 5},{face:'c04', value: 4},{face:'c03', value: 3},{face:'c02', value: 2}];
  };

function betMoney(value){
    if (bankRoll <= 0){
        return; 
    } else {
        bet += value;   
        bankRoll -= value;         
        $('.bankRoll').html(bankRoll); 
        $('.betPool').html(bet); 
    }
};

function grabCard(hand) {
  var randomNum = Math.floor(Math.random() * deck.length);
  var topCard = deck.splice([randomNum], 1)[0];
  hand.push(topCard);
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
    playerSum = computeHand(playerHand);
    dealerSum = computeHand(dealerHand);
    while (dealerSum < 17){
        grabCard(dealerHand);
        dealerSum = computeHand(dealerHand);
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

        if (winner === null && playerHand.length){
            $('.deal').hide();
        } else {
            $('.deal').show(); 
        }

        winner === null && playerHand.length ? $('.deal').hide() : $('.deal').show();

        if ($('.deal').is(":visible")){
            $('.hit').hide();
            $('.stand').hide(); 
        } else {
            $('.hit').show();
            $('.stand').show(); 
        }

        if($('.deal').is(":hidden") || bankRoll <= 0){
            $('.chip10').hide();
            $('.chip25').hide();
            $('.chip100').hide();
            $('.reset').hide(); 
        } else {
            $('.chip10').show();
            $('.chip25').show();
            $('.chip100').show();
            $('.reset').show(); 
        }

        if (winner !== null){
            $('.hit').hide();
            $('.stand').hide(); 
        }

        switch (winner){
            case "p":
                $('h3').empty().text("Player Wins!");
                woho.play();
                bet += bet;
                bankRoll += bet;
                $('.bankRoll').html(bankRoll); 
                bet = 0; 
                $('.betPool').html(bet);
                break;
            case "d":
                $('h3').empty().text("Dealer Wins!");
                haha.play(); 
                if (bankRoll < 0){
                    bankRoll = 0; 
                }
                $('.bankRoll').html(bankRoll); 
                bet = 0;                 
                $('.betPool').html(bet);
                break;
            case "pBL":
                $('h3').empty().text("Player got Blackjack!");
                hotdigity.play(); 
                bet = (bet * 1.5); 
                bankRoll += bet;
                $('.bankRoll').html(bankRoll); 
                bet = 0; 
                $('.betPool').html(bet);    
                break;
            case "dBL":
                $('h3').empty().text("Dealer got Blackjack!");
                haha.play();                                
                if (bankRoll < 0){
                    bankRoll = 0; 
                }   
                $('.bankRoll').html(bankRoll); 
                bet = 0;                 
                $('.betPool').html(bet);
                break;
            case "t":
                $('h3').empty().text("There's a Tie, Play again!");
                comeagain.play(); 
                bankRoll += bet;
                $('.bankRoll').html(bankRoll); 
                bet = 0;                 
                $('.betPool').html(bet);
                break;
            case "pB":
                $('h3').empty().text("You Busted! You lose!");
                haha.play();                
                if ((bankRoll - bet) <= 0){
                    bankRoll = 0; 
                }
                $('.bankRoll').html(bankRoll); 
                bet = 0;                 
                $('.betPool').html(bet);
                break;
            default: 
                 $('h3').empty().text("Good luck!");
            break; 
        }
    }


function init() {
    playerHand = [];
    dealerHand = [];
    playerSum = 0;
    dealerSum = 0; 
    winner = null;
    createDeck(); 
    render();
};

init(); 


});


