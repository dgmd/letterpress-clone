var board;
window.addEventListener('load', function() { // When everything is loaded
    board = new Board([]); // Create an empty board

    document.body.appendChild(board.html); // Then actually put the Board's HTML into the document
});