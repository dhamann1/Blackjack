$(function(){

//variables

var deck = [];

var suits = ['diamonds', 'hearts', 'spades', 'clubs']; 

var values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

var dealerHand = [];

var playerHand = [];



//event listeners 
    // add button to push another card into array
    
    // add button to stand which ends game and check for win

//function 

// make suits and values same as CSS 


function createDeck(){
    suits.forEach(function(suits){
        values.forEach(function(values){
            deck.push({Suits: suits, Values: values})
        });
    });
};


function grabCard(person){
    var randomNum = Math.floor(Math.random() * deck.length-1);    
    var topCard = deck.splice([randomNum],1);
    person.push(topCard);
};





function checkWin(

){};

function render(){};

function init(){
    deck = []; 
    createDeck(); 
};

createDeck();
console.log(deck.length);
grabCard(playerHand);
console.log(deck.length);
grabCard(dealerHand); 
console.log(deck.length);
grabCard(playerHand);
console.log(deck.length);
grabCard(dealerHand);
console.log(dealerHand);
console.log(playerHand);
console.log(dealerHand[1]);
console.log(playerHand[1]);
console.log(playerHand[0].Suits);







});

