var Board = function() {
    var me = this; // 'this' can point to many, different things, so we grab an easy reference to the object
    // You can read more about 'this' at:
    // MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    // at http://www.quirksmode.org/js/this.html
    // and in a more detailed tutorial: http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/

    // How many rows and columns do I have?
    this.width = 5;
    this.height = 5;

    // Make the HTML that represents me:
    var html = document.querySelector('.container');

    // Our array of players
    this.players = [new Player(1), new Player(2)];
    this.players.forEach(function(player) {
        player.board = me; // Register the board with the Players
    });
    // The board itself
    this.grid = document.querySelector('.board');

    // The word tray
    this.word = document.querySelector('.word');

    // An array to hold the cells played
    this.playedCells = [];

    // The reset button
    var reset = document.getElementById('reset');
    reset.addEventListener('click', function(event) { // When we click reset
        me.resetBoard();
    });

    // The submit button
    var submit = document.querySelector('.status-display.valid');
    submit.addEventListener('click', function(event) {
        me.submitWord();
    });

    // And save my synthesized HTML
    this.html = html;

    var _cells;
    Object.defineProperty(this, 'cells', {
        // Custom getters and setters; you can read more about this at:
        // MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
        // Yehuda Katz's tutorial: http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/
        get: function() {
            // When someone asks for board.cells, give them _cells
            return _cells;
        },
        set: function(array) {
            _cells = array; // When someone sets board.cells, save the array they give us in _cells

            // And then go through each cell
            _cells.forEach(function(cell, index) {
                // Set its row and column
                cell.row = Math.floor(index / me.width);
                cell.column = index % me.width;

                // Set its position explicitly, so the other cells don't slide around if and when its moved to the tray
                cell.html.style.left = String((index % 5) * (100 / 5)) + '%';
                cell.html.style.top = String(Math.floor(index / 5) * (100 / 5)) + '%';

                // Add an event listener for when that cell is submitted to the tray
                // We want it to dispatch an event to me
                cell.html.addEventListener('cellSubmit', me);

                // Label the cells even or odd for checkerboard styling
                cell.html.classList.add(index % 2 ? 'even' : 'odd');

                // Then actually move my HTML into the word tray
                me.html.querySelector('.board').appendChild(cell.html);
            });
        }
    });

    Object.defineProperty(this, 'currentWord', {
        // We'll want a way to look at the word currently in the tray, so
        // we'll do that by looking at the HTML of all the cells in the tray and parsing it
        get: function() {
            // When someone asks for board.curentWord

            var cellsHTML = me.html.querySelectorAll('.word > .cell') // Grab all the .cell divs

            // Convert it all to an array; you can read more about why we need to do this dumb thing at http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
            var cells = Array.prototype.slice.call(cellsHTML);

            // And then grab the innerHTML of all the cells
            // map applies a function to every element of an array; you can read more about it at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
            var letters = cells.map(function(c) {
                return c.innerHTML;
            });

            // and combine the letters into a word
            // You can read more about join at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
            var word = letters.join('');


            return word;
        }
    });

    Object.defineProperty(this, 'currentWordValid', {
        get: function() {
            return this.isWord(me.currentWord);
        }
    });

    Object.defineProperty(this, 'currentPlayer', {
        get: function() {
            // We keep track of the current player by whomever's in the 0th position
            return this.players[0];
        }
    });

    var initCells = [];
    for (var i = 0; i < 5 * 5; i++) {
        var cell = new Cell();
        cell.letter = me.randomLetter();
        initCells.push(cell);
    }; // Make an array of 5*5 = 25 new Cell objects

    me.cells = initCells; // and load the cells into the board

    return this;
};

Board.prototype.isWord = function(word) {
    if (letterpressDictionary) {
        return letterpressDictionary.indexOf(word.toLowerCase()) != -1;
    } else {
        console.log("ERROR: Letterpress dictionary isn't loaded.");
    }
};

Board.prototype.randomLetter = function() {
    // Took frequencies from https://en.wikipedia.org/wiki/Letter_frequency#Relative_frequencies_of_letters_in_the_English_language
    var frequencies = {
        'a': 8.167,
        'b': 1.492,
        'c': 2.782,
        'd': 4.253,
        'e': 12.702,
        'f': 2.228,
        'g': 2.015,
        'h': 6.094,
        'i': 6.966,
        'j': 0.153,
        'k': 0.772,
        'l': 4.025,
        'm': 2.406,
        'n': 6.749,
        'o': 7.507,
        'p': 1.929,
        'q': 0.095,
        'r': 5.987,
        's': 6.327,
        't': 9.056,
        'u': 2.758,
        'v': 0.978,
        'w': 2.360,
        'x': 0.150,
        'y': 1.974,
        'z': 0.074
    };
    var total = Object.keys(frequencies).map(function(l) {
        return frequencies[l];
    }).reduce(function(a, b) {
        return a + b;
    }); // This should add up to nearly 100%, but this way we don't have to assume that
    // This map/reduce pattern is common; you can read more about each at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce


    // Conceptually, we're setting up a line where different regions correspond to different letters; the length of the region is proportional to the frequency.  We're then going to grab a random number, look along the 'length' of our line, and find which region our random number lies in.  This means that more frequent letters occupy more of the line and are therefore more likely to be hit by our 'random number' dart.
    var random = Math.random() * total; // Choose a random number

    // And then find the region our random number corresponds to
    var sum = 0;
    for (var letter in frequencies) {
        if (random < sum) {
            return letter;
        } else {
            sum += frequencies[letter];
        }
    }
};

// We want our Board to be able to respond to events— in particular, the cellSubmit event we made
Board.prototype.handleEvent = function(event) {
    // When I receive an event
    if (event.type == 'cellSubmit') {
        // If it's a cellSubmit event

        var word = this.html.querySelector('.word'); // grab the word tray
        var incomingCell = event.detail.cell; // and the cell which has been submitted
        this.playedCells.push(incomingCell);
        word.appendChild(incomingCell.html); // and put the cell's html into the tray

        if (this.currentWordValid) {
            word.classList.add('valid');
            word.classList.remove('invalid');
        } else {
            word.classList.add('invalid');
            word.classList.remove('valid');
        }
    }
};

Board.prototype.submitWord = function() {
    // When there's a valid word, submit, award it, and then go to the next player
    var me = this;
    this.playedCells.forEach(function(cell) {
        // Toggle who 'owns' the cells; note we're storing ownership in the HTML class, not the Cell object
        cell.html.classList.remove('player' + me.currentPlayer.number === 1 ? 1 : 2);
        cell.html.classList.add('player' + me.currentPlayer.number);
    });
    this.currentPlayer.award(this.currentWord); // Award the word
    this.nextTurn(); // Switch to the next player
};

Board.prototype.resetBoard = function() {
    var me = this;
    // Grab all the played letters and convert them to an array

    var playedLetters = this.playedCells.map(function(cell) { return cell.html; });

    // And then iterate over them and put them back in the board
    playedLetters.forEach(function(letter) {
        me.grid.appendChild(letter); // because of how we styled them, appendChild does the Right Thing
    });

    this.playedCells = []; // Empty the array holding the played cells

    // Reset our validity indicator
    me.word.classList.remove('valid');
    me.word.classList.remove('invalid');
};

Board.prototype.nextTurn = function() {
    // Swap the 0th and 1st elements of our this.players array
    this.players.push(this.players.shift());
};