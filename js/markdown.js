'use strict';

(function () {
  let createElements = function (tagName, className, rows, columns) {
    let df = document.createDocumentFragment();
    
    for (let i = 0; i < rows; i++) {
      let element = document.createElement(tagName);
      element.classList.add(className);

      for (let j = 0; j < columns; j++) {
        let inner = document.createElement(tagName);
        element.appendChild(inner);
      }
      element.id = i;
      df.appendChild(element);
    }

    return df;
  }

  let grid = createElements('div', 'row', 20, 20);
  let stage = document.querySelector('.stage');
  stage.appendChild(grid);
})();