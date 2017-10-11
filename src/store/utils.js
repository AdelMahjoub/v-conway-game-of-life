import Cell from '../models/cell.model';

/**
 * 
 * @param {number} posX 
 * @param {number} posY 
 * @param {[[Cell]]} matrix 
 */
export function getNeighbours(posX, posY, matrix) {
  let neighbours = [];
  for(let x = posX - 1; x <= (posX + 1); x++) {
    for(let y = posY - 1; y <= (posY + 1); y++) {
      if((x >= 0 && y >= 0) && (x !== posX || y !== posY) && (x < matrix.length && y < matrix[0].length)) {
        neighbours.push(Number(matrix[x][y].isActive));
      }
    }
  }
  return neighbours.reduce((a, b) => a + b, 0);
}

/**
 * 
 * @param {[[Cell]]} cells 
 */
export function cloneCells(cells) {
  let clone = [];
  for(let x = 0; x < cells.length; x++) {
    clone[x] = [];
    for(let y = 0; y < cells[0].length; y++) {
      clone[x][y] = new Cell(cells[x][y]);
    }
  }
  return clone;
}

/**
 * 
 * @param {[[Cell]]} currentCycle 
 */
export function nextCycle(currentCycle) {
  let nextMatrix = cloneCells(currentCycle);
  for(let x = 0; x < currentCycle.length; x++) {
    for(let y = 0; y < currentCycle[0].length; y++) {
      let currentCell = Number(currentCycle[x][y].isActive);
      let cellFate = getNeighbours(x, y, currentCycle)
      switch(currentCell) {
        case 1:
          if(cellFate < 2 || cellFate > 3) {
            nextMatrix[x][y].isActive = false;
            nextMatrix[x][y].wasActive = true;
          }
          break;
        case 0:
          if(cellFate === 3) {
            nextMatrix[x][y].isActive = true;
          }
          nextMatrix[x][y].wasActive = false;
          break;
        default:
      }
    }
  }
  return nextMatrix;
}

/**
 * 
 * @param {[[Cell]]} currentCycle 
 * @param {[[Cell]]} nextCycle 
 */
export function nextCycleIsDifferent(currentCycle, nextCycle) {
  let changes = 0;
  for(let x = 0; x < currentCycle.length; x++) {
    for(let y = 0; y < currentCycle[0].length; y++) {
      if(nextCycle[x][y].isActive !== currentCycle[x][y].isActive) {
        changes++;
        break;
      }
    }
    if(changes) {
      break;
    }
  }
  return changes > 0;
}