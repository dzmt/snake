'use strict';

(function () {
  window.util = {
    getRandomNumber: function (to) {
      return Math.floor(Math.random() * to);
    },

    create2dArray: function (rows, columns) {
      let array = [];
    
      for (let i = 0; i < rows; i++) {
        let inner = [];
        for (let j = 0; j < columns; j++) {
          inner[j] = 0;
        }
        array.push(inner)
      }
    
      return array;
    },

    pass2dArray: function (array, cb) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          cb(array, i, j);
        }
      }
    }
  }
})();