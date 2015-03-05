var Player = function(number) {
	this.number = number;
	this.wordsPlayed = [];

	this.board = null;
};

Player.prototype.award = function(word) {
	var holder = document.createElement('li');
	holder.innerHTML = word.toUpperCase();
	this.scoreboard.querySelector('.played-words').appendChild(holder);
	this.board.resetBoard();
};

Object.defineProperty(Player.prototype, 'scoreboard', {
	get: function() {
		var selector = '.scoreboard' + '#player' + this.number;
		return this.board.html.querySelector(selector); }
});