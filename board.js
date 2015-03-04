var Board = function(cells) {
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

    // The board itself
    var grid = document.querySelector('.board');

    // The word tray
    var word = document.querySelector('.word');

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
            	cell.html.style.left = String((index % 5) * (100/5)) + '%';
            	cell.html.style.top = String(Math.floor(index / 5) * (100/5)) + '%';
                
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
    		var letters = cells.map(function(c) { return c.innerHTML; });

            // and combine the letters into a word
            // You can read more about join at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
            var word = letters.join('');


    		return word;
    	}
    });

    return this;
};

// We want our Board to be able to respond to events— in particular, the cellSubmit event we made
Board.prototype.handleEvent = function(event) {
    // When I receive an event
    if (event.type == 'cellSubmit') {
        // If it's a cellSubmit event

        var word = this.html.querySelector('.word'); // grab the word tray
        var incomingCell = event.detail.cell; // and the cell which has been submitted
        word.appendChild(incomingCell.html); // and put the cell's html into the tray

        // And then print the board's currentWord out to the console
        console.log("The current word is: ", "'", this.currentWord, "'");
    }
};