export class Store {
    #items = [];
  
    constructor(initialItems = []) {
      initialItems.forEach(item => this.add(item));
    }
  
    add(item) {
      if (!item.name || typeof item.price !== 'number' || item.price <= 0 || typeof item.qty !== 'number' || item.qty < 0) {
        throw new Error("Invalid item format");
      }
      this.#items.push({ ...item });
    }
  
    remove(name) {
      this.#items = this.#items.filter(item => item.name !== name);
    }
  
    updateQty(name, newQty) {
      const item = this.#items.find(i => i.name === name);
      if (item && newQty >= 0) {
        item.qty = newQty;
      }
    }
  
    getItems() {
      return this.#items.map(item => ({ ...item }));
    }
  
    get total() {
      return this.#items.reduce((sum, item) => sum + item.price * item.qty, 0);
    }
  }