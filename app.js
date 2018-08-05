var scores, roundScore, activePlayer, gamePlaying;
var dice1DOM, dice2DOM, current0DOM, current1DOM, player0panelDOM, player1panelDOM;

initDOMVariables();
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if(!gamePlaying)
        return;

    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;


    dice1DOM.style.display = 'block';
    dice2DOM.style.display = 'block';

    dice1DOM.src = 'dice-' + dice1 + '.png';
    dice2DOM.src = 'dice-' + dice2 + '.png';

    if(dice1 !== 1 && dice2 !== 1){
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(!gamePlaying)
        return;

    scores[activePlayer] += roundScore;

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore

    if(input){
        winningScore = input;
    }else{
        winningScore = 100;
    }

    if(scores[activePlayer] > winningScore){
        hideDice();
        gamePlaying = false;
        document.querySelector('#name-' + activePlayer).textContent = 'Winner'
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    }else{
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    current0DOM.textContent = '0';
    current1DOM.textContent = '0';

    player0panelDOM.classList.toggle('active');
    player1panelDOM.classList.toggle('active');

    hideDice();
}

function hideDice(){
    dice1DOM.style.display = 'none';
    dice2DOM.style.display = 'none';
}

function updatePlayerScore(player , score){
    scores[player] = score;
    document.querySelector('#score-' + player).textContent = '0';
}

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    hideDice();
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    current0DOM.textContent = '0';
    current1DOM.textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    player0panelDOM.classList.remove('winner');
    player1panelDOM.classList.remove('winner');
    player0panelDOM.classList.remove('active');
    player1panelDOM.classList.remove('active');
    player0panelDOM.classList.add('active');
}

function initDOMVariables(){
    dice1DOM = document.querySelector('#dice-1');
    dice2DOM = document.querySelector('#dice-2');

    current0DOM = document.getElementById('current-0');
    current1DOM = document.getElementById('current-1');

    player0panelDOM = document.querySelector('.player-0-panel');
    player1panelDOM = document.querySelector('.player-1-panel');
}
