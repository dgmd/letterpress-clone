var Player = function(number) {
	this.number = number; // Our player number (1 or 2)
	this.wordsPlayed = []; // An array to hold all the words we played

	this.board = null; // A connection to the board we're playing
};

Object.defineProperty(Player.prototype, 'scoreboard', {
	get: function() {
		var selector = '.scoreboard' + '#player' + this.number;
		return this.board.html.querySelector(selector); }
});

Player.prototype.addToScoreboard = function(word) {
    // When we want to award a player a word
    var holder = document.createElement('li');
    holder.innerHTML = word;

    // Note that this.scoreboard is accessed through a custom getter; it doesn't exist in the constructor
    this.scoreboard.querySelector('.played-words').appendChild(holder);
    this.board.resetBoard(); // Once we award a word, reset the board
};