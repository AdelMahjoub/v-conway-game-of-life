import Cell from './cell.model';

export default class Board {
  constructor(props = {}) {
    this.width = props['width'] || 600;
    this.height = 400;
    this.cellSize = 20;
    this.columns = ~~(this.width / this.cellSize);
    this.rows = ~~(this.height / this.cellSize);
    this.widthMax = props['widthMax'] ? Math.min(600, props['widthMax']) : 600;
    this.widthMin = 320;
  }

  autoAdjust() {
    this.adjustBoardWidth();
    this.adjustGrid();
  }

  adjustBoardWidth() {
    this.width = Math.max(this.widthMin, Math.min(this.width, this.widthMax));
  }

  adjustGrid() {
    this.columns = ~~(this.width / this.cellSize);
    this.rows = ~~(this.height / this.cellSize);
  }

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