var board;
window.addEventListener('load', function() { // When everything is loaded
    board = new Board([]); // Create an empty board

    var cells = [];
    for (var i = 0; i < 5*5; i++) {
        var cell = new Cell();
        cell.letter = 'L';
        cells.push(cell);
    }; // Make an array of 5*5 = 25 new Cell objects

    board.cells = cells; // and load the cells into the board

    document.body.appendChild(board.html); // Then actually put the Board's HTML into the document
});