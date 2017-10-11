export default class Cell {
  constructor(props = {}) {
    this.isActive = props['isActive'] || false;
    this.wasActive = props['wasActive'] || false;
    this.isNewBorn = props['isNewBorn'] || false;
  }
}