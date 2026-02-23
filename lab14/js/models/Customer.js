import { User } from "./User.js";

export class Customer extends User {
    constructor(name) {
        super(name); // Виклик конструктора батьківського класу 
        this.orders = [];
    }

    addOrder(order) {
        this.orders.push(order);
        console.log(`Замовлення додано для ${this.name}.`);
    }

    viewOrders() {
        console.log(`--- Історія замовлень клієнта ${this.name} ---`);
        this.orders.forEach((order, index) => {
            console.log(`Замовлення #${index + 1}: сума ${order.totalAmount} грн.`);
        });
    }
}