# Cloning Letterpress

![Letterpress screenshot](http://www.wired.com/images_blogs/gamelife/2012/11/letterpress.png)

We're going to be building out our own riffs (initially digital, then physical) on [Letterpress](http://www.atebits.com/letterpress/)—a game I like a lot for the iPhone.  You can download and play it yourself, or check out a demo [here](https://www.youtube.com/watch?v=eCe_LdqAVTM).

In this context, we're going to be looking at an approach to organizing your code called "object oriented programming."  You can read more about the approach and technical aspects of what's entailed [in _Eloquent JavaScript_](http://eloquentjavascript.net/1st_edition/chapter3.html) and [on Mozilla's Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript).

As we build out Letterpress, you'll be hearing a lot more about it, but initially, we wanted to explore a smaller version of Letterpress's functionality to use as we begin to wrap our heads around what's going on.

Here are some initial extensions for this beginning sketch of Letterpress's functionality, arranged in order of increasing complexity.

## Possible Extensions

> **Note that if you'd like to work on the previous, lighter-weight versions of Letterpress and its extensions, you can!  Just `clone` this repository and then run `git checkout v0.1` (the version from 26 February 2015) or `git checkout v0.2` (the version from 5 March 2015) and you can check out the `README.md` for the extensions and work on that code, if you'd like!**

### Improve the rejection of previously played words

Currently, there is only a slight indication that the word sitting in the tray has been played previously.  It's both ghosted out and you are, of course, prevented from submitting it.  This isn't great, because it's unclear why it's ghosted out.  To fix this, you might consider also ghosting out the previously played word in the scoreboards, or even better maybe having something dynamic which draws the user's attention to that word (_e.g._ a ghosting fading in and out).

---

&#8618; Add some sort of UI affordance which more clearly communicates why a previously played word in the tray can't be submitted.  You may find [this introduction to CSS animations useful](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_animations) if you'd like to animate the previously played word in some way.


### Make it possible to reset pieces individually

Currently, the only way to get pieces out of the tray is to reset the entire tray using the reset button in the upper left.  This is annoying if you accidentally put one letter in the tray you don't mean to.  There should be a way to send individual letters back, minimally by clicking, and perhaps also by dragging.

---

&#8618; Add the ability to remove individual, submitted letters from the tray by either clicking on them or dragging and dropping them back on the board.  For the clicking behavior, you may find [this, related example](https://gist.github.com/aresnick/f08279e380a06020c9b3#file-return-when-you-click-me-html) helpful.  For the drag and drop behavior, you may find [this, minimal drag & drop example](https://gist.github.com/aresnick/f08279e380a06020c9b3#file-drag-drop-html) helpful.


### Make it possible to re-order and re-shuffle individual, played tiles

Right now, if I put letters in the tray in the wrong order, I have to reset the entire tray to correct this mistake.  Instead, I should clearly be able to reorder the tiles in the tray by dragging them around.

---

&#8618; Add the ability to drag tiles around to re-order and re-shuffle them.  If you decide to use the `draggable` attribute, you may find [this, minimal example](https://gist.github.com/aresnick/f08279e380a06020c9b3#file-drag-drop-html) helpful.  Less comlpex (but less versatile) is to use the actual geometry of how the mouse moves around.  You may find [this example](https://gist.github.com/aresnick/f08279e380a06020c9b3#file-drag-to-reorder-html) of this technique useful.


### Add the ability to the serialize game state

Eventually, we'll want to be able to have folks play on _two different computers_, or even better, _devices and/or physical interfaces_.  To do this, we need to find some way to completely store and represent the game state.  Often, when you do this by saving it to a file, it's called [serialization](https://en.wikipedia.org/wiki/Serialization).  As a precursor to transmitting game state, we'll want to add the ability to simply save and restore game state.

---

&#8618; Add a button which lets us save the entire state of the game to a text file.  You may find [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) an interesting place to start, perhaps followed up by posts like [this](https://stackoverflow.com/questions/3608545/how-to-serialize-deserialize-javascript-objects) and/or tools like [this](https://github.com/skeeto/resurrect-js).