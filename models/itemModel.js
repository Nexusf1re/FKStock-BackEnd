import DbService from '../services/dbService.js';

class ItemModel {
    constructor() {
        this.dbService = new DbService();
    }

    async save(item) {
        return await this.dbService.createItem(item);
    }

    async findById(id) {
        return await this.dbService.getItemById(id);
    }

    async update(id, item) {
        return await this.dbService.updateItem(id, item);
    }

    async delete(id) {
        return await this.dbService.deleteItem(id);
    }
}

export default ItemModel;