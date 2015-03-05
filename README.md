# Cloning Letterpress

![Letterpress screenshot](http://www.wired.com/images_blogs/gamelife/2012/11/letterpress.png)

We're going to be building out our own riffs (initially digital, then physical) on [Letterpress](http://www.atebits.com/letterpress/)—a game I like a lot for the iPhone.  You can download and play it yourself, or check out a demo [here](https://www.youtube.com/watch?v=eCe_LdqAVTM).

In this context, we're going to be looking at an approach to organizing your code called "object oriented programming."  You can read more about the approach and technical aspects of what's entailed [in _Eloquent JavaScript_](http://eloquentjavascript.net/1st_edition/chapter3.html) and [on Mozilla's Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript).

As we build out Letterpress, you'll be hearing a lot more about it, but initially, we wanted to explore a smaller version of Letterpress's functionality to use as we begin to wrap our heads around what's going on.

Here are some initial extensions for this beginning sketch of Letterpress's functionality, arranged in order of increasing complexity.

## Possible Extensions

> **Note that if you'd like to work on the previous, lighter-weight version of Letterpress and its extensions, you can!  Just `clone` this repository and then run `git checkout v0.1`—This will rewind the repository to the version from 26 February 2015 and you can check out the `README.md` for the extensions and work on that code, if you'd like!**

### Display the score

Currently, although individual tiles are toggled depending on who currently 'owns' them, that does not update anything in the `Player` object, meaning that there's no functionality to calculate or display the score.

---

&#8618; Modify the code so that next to each player's title (in the `<h3>` within `.scoreboard`), there appears the current number of cells they own.  This should update every time a word is played.


### Add the ability to reset and re-order individual letters

Currently, the only way to modify the staged word—_i.e._ the word you're drafting, before you submit it—is to hit the reset button, which sends all the tiles back to the board.  In the Real Deal, you can not only send individual letters back to the board by tapping on them, but drag to re-order the letters.

---

&#8618; Modify the `Board` so that there's both the HTML/JS in place to let the user click on individual, played cells and send them back to the board _and_ the ability to drag the cells to re-order them.  Note that in both cases, you'll need to make sure any changes in the view (_i.e._ the HTML) are mirror in the `playedCells` attribute of `Board`; otherwise, the other functionality (_e.g._ checking the word) will break.


### Add the 'surrounded' behavior for cells

Currently, cells can be:
1. Owned by no-one
2. Owned by Player 1 (indicated by the addition of `.player1` class)
3. Owned by Player 2 (indicated by the addition of `.player2` class)

But, the primary difference between Letterpress and say, Boggle, is that there is a notion of territoriality which comes not just from owning the cells, but surrounding them.  Those cells whose direct (_i.e._ not diagonal) neighbors are owned by the same player are 'surrounded' and therefore do not change owners even when played by your opponent.

---

&#8618; Modify the `Cell` object and `Board` to both calculate when a played cell becomes surrounded and record that fact in both the view (_i.e._ changing the background color of the surrounding cell) and the model (_i.e._ the cell object).


### Add the ability to save and restore a game

Eventually, we'll want to be able to have folks play on _two different computers_, or even better, _devices and/or physical interfaces_.  To do this, we need to find some way to completely store and represent the game state.  Often, when you do this by saving it to a file, it's called [serialization](https://en.wikipedia.org/wiki/Serialization).  As a precursor to transmitting game state, we'll want to add the ability to simply save and restore game state.

---

&#8618; Add a button which lets us save the entire state of the game to a text file.  You may find [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) an interesting place to start, perhaps followed up by posts like [this](https://stackoverflow.com/questions/3608545/how-to-serialize-deserialize-javascript-objects) and/or tools like [this](https://github.com/skeeto/resurrect-js).