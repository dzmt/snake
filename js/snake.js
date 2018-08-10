'use strict';

let Chain = function (row, column) {
  this.row = row;
  this.column = column;
};

Chain.prototype.isEqual = function (chain) {
  return chain.row === this.row && chain.column === this.column ? true : false;
}

let DIRECTION = {
  UP: 1,
  RIGHT: 100,
  DOWN: 10,
  LEFT: 1000,

  HORIZONTAL: 1100,
  VERTICAL: 11,

  isOpposed: function (sum) {
    if (sum === this.HORIZONTAL) {
      return true;
    } else if (sum === this.VERTICAL) {
      return true;
    }
    return false;
  }
};

let VALUE_DIRECTION = {
  1: [-1, 0],
  100: [0, 1],
  10: [1, 0],
  1000: [0, -1] 
}
  
let Snake = function (field, chainQuantity = 3, ) {
  let chains = [];
  let row = Math.floor(field.length / 2);
  let column = Math.floor(field[0].length / 2);

  chains.push(new Chain(row, column));

  for (let i = 1; i < chainQuantity; i++) {
    let prevChain = chains[i - 1];
    chains.push(new Chain(prevChain.row, prevChain.column + 1));
  }

  this.chains = chains;
  this.prevTail = null;

  this.direction = DIRECTION.LEFT;
  this.row = field.length - 1;
  this.column = field[0].length - 1;
};

Snake.prototype.setDirection = function (direction) {
  this.direction = direction; 
};

Snake.prototype.isIntersect = function (head) {
  for (let i = 3; i < this.chains.length; i++) {
    let chain = this.chains[i];
    if (chain.row === head[0] && chain.column === head[1]) {
      return true;
    }
  }

  return false;
};

Snake.prototype.isAbroad = function (headLocation) {
  let head = new Chain(...headLocation);
  if (head.row < 0 || head.row  > this.row || head.column < 0 || head.column  > this.column) {
    return true;
  }

  return false;
};

Snake.prototype.step = function () {
  let head = [];
  head.push(this.chains[0].row + VALUE_DIRECTION[this.direction][0]);
  head.push(this.chains[0].column + VALUE_DIRECTION[this.direction][1])

  if (this.isAbroad(head)) {
    throw new Error();
  }

  let tail = this.chains[this.chains.length - 1];
  this.prevTail = [tail.row, tail.column];


  for(let i = this.chains.length - 1; i >= 1; i--) {
    this.chains[i].row = this.chains[i-1].row;
    this.chains[i].column = this.chains[i-1].column;
  }


  if (this.isIntersect(head)) {
    throw new Error();
  }

  this.chains[0] = new Chain(...head);
};

Snake.prototype.render = function (main) {
  main.children[this.chains[0].row].children[this.chains[0].column].classList.add('head');
  for (let i = 1; i < this.chains.length; i++) {
    let chain = this.chains[i];
    main.children[chain.row].children[chain.column].classList.add('body');
    
  }
};

Snake.prototype.clearRender = function (main) {
  main.children[this.chains[1].row].children[this.chains[1].column].classList.remove('head');
  main.children[this.prevTail[0]].children[this.prevTail[1]].classList.remove('body');
};

Snake.prototype.eat = function () {
  this.chains.push(new Chain(this.prevTail[0], this.prevTail[1]));
};


