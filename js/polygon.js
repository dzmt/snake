'use strict';

let Polygon = function (rows, columns) {
  let field = window.util.create2dArray(rows, columns);
  this.field = field;

  let emptyCell = [];

  window.util.pass2dArray(field, (a, i, j) => {
    if (a[i][j] === 0) {
      emptyCell.push([i, j]);
    }
  });

  this.emptyCell = emptyCell;
};

Polygon.prototype.clear = function () {
  window.util.pass2dArray(this.field, (a, i, j) => {
    a[i][j] = 0
  });
};

Polygon.prototype.fill = function (items) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    this.field[item.row][item.column] = 1;
  }
  this.emptyCell = [];
  window.util.pass2dArray(this.field, (a, i, j) => {
    if (a[i][j] === 0) {
      this.emptyCell.push([i, j]);
    }
  });
};

