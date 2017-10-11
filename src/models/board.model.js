import Cell from './cell.model';

export default class Board {
  /**
   */
  constructor(props = {}) {
    this.width = props['width'] || 720;
    this.height = 360;
    this.cellSize = 18;
    this.columns = ~~(this.width / this.cellSize);
    this.rows = ~~(this.height / this.cellSize);
    this.widthMax = props['widthMax'] ? Math.min(720, props['widthMax']) : 720;
    this.widthMin = 360;
  }

  /**
   * Automatically adjust all sizes
   */
  autoAdjust() {
    this.adjustBoardWidth();
    this.adjustGrid();
  }

  /**
   * re-evaluate board width and/or height
   * when the screen dimensions changes
   */
  adjustBoardWidth() {
    this.width = Math.max(this.widthMin, Math.min(this.width, this.widthMax));
  }

  /**
   * re-evaluate columns and rows 
   * when the board width and/or height changes
   * or the cells width and/or height changes
   */
  adjustGrid() {
    this.columns = ~~(this.width / this.cellSize);
    this.rows = ~~(this.height / this.cellSize);
  }

  /**
   * Generate a 2D array of Cell instances
   * if previousCells is truthy Cell instances are carried over
   * @param {[Cell]} previousCells 
   */
  generateCells(previousCells = []) {
    let cells = [];
    for(let i = 0; i < this.columns; i++) {
      cells[i] = [];
      for(let j = 0; j < this.rows; j++) {
        if(Array.isArray(previousCells[i])) {
          if(previousCells[i].length) {
            if(previousCells[i][j]) {
              cells[i][j] = previousCells[i][j];
            } else {
              cells[i][j] = new Cell({ colIndex: i, rowIndex: j });
            }
          }else {
            cells[i][j] = new Cell({ colIndex: i, rowIndex: j });
          }
        } else {
          cells[i][j] = new Cell({ colIndex: i, rowIndex: j });
        }
      }
    }
    return cells;
  }
}