import { Product } from "./models/Product.js";
import { Order } from "./models/Order.js";
import { Customer } from "./models/Customer.js";

// Створюємо товари (використовуємо твої улюблені девайси)
const phone = new Product("Google Pixel 6 Pro", 25000, "Smartphones");
const audio = new Product("JBL Tune 720BT", 2800, "Audio");

// Створюємо покупця
const buyer = new Customer("Олександр");
console.log(buyer.getInfo());

// Створюємо замовлення
const myOrder = new Order();
myOrder.addProduct(phone);
myOrder.addProduct(audio);

// Додаємо замовлення покупцю та переглядаємо
buyer.addOrder(myOrder);
buyer.viewOrders();