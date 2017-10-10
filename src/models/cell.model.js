export default class Cell {
  /**
   * Instances properties
   * @param {{colIndex: number, rowIndex: number, isActive: boolean, wasActive: boolean}} props 
   */
  constructor(props = {}) {
    this.colIndex = props['colIndex'] || 0;
    this.rowIndex = props['rowIndex'] || 0;
    this.isActive = props['isActive'] || false;
    this.wasActive = props['wasActive'] || false;
  }
}