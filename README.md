# Cloning Letterpress

![Letterpress screenshot](http://www.wired.com/images_blogs/gamelife/2012/11/letterpress.png)

We're going to be building out our own riffs (initially digital, then physical) on [Letterpress](http://www.atebits.com/letterpress/)—a game I like a lot for the iPhone.  You can download and play it yourself, or check out a demo [here](https://www.youtube.com/watch?v=eCe_LdqAVTM).

In this context, we're going to be looking at an approach to organizing your code called "object oriented programming."  You can read more about the approach and technical aspects of what's entailed [in _Eloquent JavaScript_](http://eloquentjavascript.net/1st_edition/chapter3.html) and [on Mozilla's Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript).

As we build out Letterpress, you'll be hearing a lot more about it, but initially, we wanted to explore a smaller version of Letterpress's functionality to use as we begin to wrap our heads around what's going on.

Here are some initial extensions for this beginning sketch of Letterpress's functionality, arranged in order of increasing complexity.

## Initial Extensions

### Initializing the board with random letters

Currently, the board is initialized with all `L`'s.  Letterpress initializes the board with semi-random letters.  They're not actually random, because that compromises the gameplay—so certain letters which are more likely to be helpful in creating words (_e.g._ vowels) are more likely to appear.

Before we get to implementing that nuance, we'll want a way to simply put random letters into the tiles.

---

&#8618; Try writing a snippet of code in your console which gives you a random letter every time you run it.  If you have a chance, try wrapping that up as [a function](http://eloquentjavascript.net/1st_edition/chapter3.html) and using it to [change how we currently initialize all the cells to `L`](https://github.com/dgmde15/Letterpress/blob/gh-pages/script.js#L7).

### Checking whether the tray currently contains a valid word

At some point, we'll need to have the logic to check whether the word that is in the word tray is, in fact, a word.

#### A couple notes on tooling 

Fortunately, the creator of Letterpress, Loren Brichter, has [made available](https://github.com/atebits/Words.git) the dictionary of allowed words.

Depending on how you approach this, you may want to have installed [node]() (basically, a version of JavaScript you can run in your terminal, without using your browser).  To do this, run `brew install node` in your terminal.  After that completes, you should be able to execute `node` in your terminal and see something like this:

![node screenshot](http://dgmde15slush.s3.amazonaws.com/node-screenshot.png)

---

&#8618; Try writing a function which, given a word, tells you whether that word is in Loren's dictionary or not.

### Fixing the `nth-child` CSS behavior for alternating tiles

You should notice a problem with the CSS styling of the board as you move tiles into the word tray—it changes and flickers…

![nth-child CSS bug](http://dgmde15slush.s3.amazonaws.com/nth-child_bug.gif)

This is because [we use](https://github.com/dgmde15/Letterpress/blob/gh-pages/style.css#L67-L82) a pseudoselector in CSS called [`nth-child`](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child).  `nth-child` lets you apply styling rules depending on what number child a given element is of its parent.  In our case, we use `:nth-child(even)` and `(odd)` to apply styling rules depending on whether a `.cell` is an even- or odd-numbered child of its parent (`.board`).  But because of [how we handle our `cellSubmit` event](https://github.com/dgmde15/Letterpress/blob/gh-pages/board.js#L97), we actually _move_ the node from `.board` to our word tray (`.word`), which screws with the ordering of our `cells` and who is even or odd.

---

&#8618; Try modifying the project so that the checkerboard styling is preserved, even as we put words into the word tray.


### Resetting words from the word tray

You'll notice that [in the upper left-hand of the Letterpress screen](#cloning-letterpress) there is a "Clear" button which puts all the letters in the tray back on the board.

In our implementation, doing this requires that the letters know where they lived to begin with.  Currently, for a Cell object, this is stored in two attributes, [`row` and `column`](https://github.com/dgmde15/Letterpress/blob/gh-pages/cell.js#L9-L10), which are set [by the Board when the cell is added](https://github.com/dgmde15/Letterpress/blob/gh-pages/board.js#L43-L46).

---

&#8618; Try adding a button somewhere on the page which, when clicked, moves the tiles back to their original positions within `.board`.