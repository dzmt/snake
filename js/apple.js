'use strict';

let Apple = function (row, column) {
  this.row = row;
  this.column = column;
};

Apple.prototype.render = function (main) {
  main.children[this.row].children[this.column].classList.add('apple');
};

Apple.prototype.clearRender = function (main) {
  main.children[this.row].children[this.column].classList.remove('apple');
}

Apple.prototype.new = function (emptyCell) {
  let loc = emptyCell[window.util.getRandomNumber(emptyCell.length)];
  return new Apple(loc[0], loc[1]);
};

