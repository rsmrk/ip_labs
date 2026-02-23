export class Order {
    constructor() {
        this.products = [];
        this.totalAmount = 0;
    }

    addProduct(product) {
        this.products.push(product);
        this.totalAmount += product.price;
    }
}