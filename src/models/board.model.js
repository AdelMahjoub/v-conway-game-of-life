import Cell from './cell.model';

export default class Board {
  /**
   */
  constructor(props = {}) {
    this.width = props['width'] || 640;
    this.height = props['height'] || 480;
    this.cellSize = props['cellSize'] || 20;
    this.columns = ~~(this.width / this.cellSize);
    this.rows = ~~(this.height / this.cellSize);

    this.cellSizeMax = ~~(this.width / 10);
    this.cellSizeMin = ~~(this.width / 40);
    this.widthMax = props['widthMax'] || 1280;
    this.widthMin = 300;
    this.heightMax = this.widthMax;
    this.heightMin = this.widthMin;
  }

  /**
   * Automatically adjust all sizes
   */
  autoAdjust() {
    this.adjustBoardSize();
    this.adjustCellsSize();
    this.adjustGrid();
  }

  /**
   * re-evaluate board width and/or height
   * when the screen dimensions changes
   */
  adjustBoardSize() {
    this.width = Math.max(this.widthMin, Math.min(this.width, this.widthMax));
    this.height = Math.max(this.heightMin, Math.min(this.height, this.heightMax));
  }

  /**
   * re-evaluate cells sizes when the board width and/or height changes
   */
  adjustCellsSize() {
    this.cellSize = Math.max(this.cellSizeMin, Math.min(this.cellSize, this.cellSizeMax));
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