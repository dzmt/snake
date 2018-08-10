'use strict';

let main = document.querySelector('main');

let KEY_CODE = {
  37: DIRECTION.LEFT,
  38: DIRECTION.UP,
  39: DIRECTION.RIGHT,
  40: DIRECTION.DOWN
}

let Stage = function () {
  this.polygon = new Polygon(20, 20);
  this.snake = new Snake(this.polygon.field);

  this.polygon.fill(this.snake.chains);

  this.apple = Apple.prototype.new(this.polygon.emptyCell);
  this.timeoutId = null;
};

Stage.prototype.checkAppleEaten = function () {
  let head = this.snake.chains[0];
  return head.row === this.apple.row && head.column === this.apple.column ? true : false;
};

Stage.prototype.render = function () {
  this.snake.render(main);
  this.apple.render(main);
}

Stage.prototype.play = function (that) {
  let snake = that.snake;
  let polygon = that.polygon;
  let apple = that.apple;
  
  try {
    snake.step();
  } catch (e) {
    document.querySelector('.modal').classList.remove('hidden');
    return;
  }
  
  if (that.checkAppleEaten()) {
    snake.eat();
    polygon.clear();
    polygon.fill(snake.chains);
    apple.clearRender(main);
    that.apple = Apple.prototype.new(polygon.emptyCell);
  }
  snake.clearRender(main);
  that.render();

  that.timeoutId = setTimeout(that.play, 500, that);
}

Stage.prototype.init = function (stage) {
  let that = stage;
  document.addEventListener('keydown', function (evt) {
    if (37 <= evt.keyCode && evt.keyCode <= 40) {
      let direction = KEY_CODE[evt.keyCode]
      let sum = that.snake.direction + direction;
      if ( !DIRECTION.isOpposed(sum) &&  that.snake.direction !== direction) {
        that.snake.setDirection(direction);
        clearTimeout(that.timeoutId);
        
        that.play(that);  
      }
    }
  });

  that.render();
  that.play(that);
}





let stage = new Stage();
stage.init(stage);
console.log(stage);


