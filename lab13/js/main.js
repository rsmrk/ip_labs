// Конструктор товару (Product)
function Product(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
}

// Конструктор замовлення (Order)
function Order() {
    this.items = [];
    this.totalAmount = 0;
}

// Метод для додавання товару до замовлення через прототип
Order.prototype.addProduct = function(product) {
    this.items.push(product);
    this.totalAmount += product.price;
    console.log(`Додано: ${product.name} за ${product.price} грн.`);
};

// Конструктор покупця (Customer)
function Customer(name) {
    this.name = name;
    this.orders = [];
}

// Метод для перегляду замовлень через прототип
Customer.prototype.viewOrders = function() {
    console.log(`Замовлення покупця ${this.name}:`);
    if (this.orders.length === 0) {
        console.log("Замовлень ще немає.");
    } else {
        this.orders.forEach((order, index) => {
            console.log(`Замовлення #${index + 1}: сума ${order.totalAmount} грн, товарів: ${order.items.length}`);
        });
    }
};

// --- Тестування програми ---

// Створення товарів
const item1 = new Product("Ноутбук", 45000, "Електроніка");
const item2 = new Product("Мишка", 1200, "Аксесуари");

// Створення покупця
const client = new Customer("Іван");

// Створення та наповнення замовлення
const newOrder = new Order();
newOrder.addProduct(item1);
newOrder.addProduct(item2);

// Додавання замовлення покупцю
client.orders.push(newOrder);

// Перегляд історії
client.viewOrders();