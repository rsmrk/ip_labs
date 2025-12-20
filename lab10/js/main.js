/* ЛАБОРАТОРНА РОБОТА N10
   Тема: Ініціалізації змінних. Робота з JavaScript в консолі браузера
*/

console.log("ЗАВДАННЯ 1:");

// 1. console.log(a);
// Результат: undefined
// Пояснення: Змінна var "спливає" (hoisting), але без значення.
console.log(undefined); // Емуляція результату для демонстрації, реальний код: console.log(a);
var a = 10;

// 2. console.log(b);
// Результат: Uncaught ReferenceError: Cannot access 'b' before initialization
// Пояснення: let не спливає так, як var. Вона у "мертвій зоні" (TDZ).
// (Рядок закоментовано, щоб скрипт не зупинився через помилку)
// console.log(b); 
let b = 20;

// 3. console.log(c);
// Результат: Uncaught ReferenceError
// Пояснення: const теж не доступна до оголошення.
// console.log(c);
const c = 30;


console.log("\nЗАВДАННЯ 2:");

function testScope() {
    if (true) {
        var x = 5;      // var має функціональну область видимості (ігнорує блоку if)
        let y = 10;     // let має блокову область видимості (тільки всередині {})
        const z = 15;   // const має блокову область видимості (тільки всередині {})
    }
    console.log(x); // Виведе: 5 (доступна, бо var ігнорує блок)
    
    // console.log(y); // Помилка: y is not defined (невидима за межами if)
    // console.log(z); // Помилка: z is not defined (невидима за межами if)
}
testScope();


console.log("\nЗАВДАННЯ 3:");

console.log(5 + "5");      // "55" (число перетворюється на рядок -> конкатенація)
console.log("5" - 2);      // 3 (рядок "5" стає числом 5 при відніманні)
console.log(true + false); // 1 (true -> 1, false -> 0)
console.log(null + 1);     // 1 (null -> 0)
console.log(undefined + 1);// NaN (undefined не є числом)
console.log(0 == false);   // true (false приводиться до 0)
console.log(0 === false);  // false (строге порівняння: число не дорівнює булевому типу)


console.log("\nЗАВДАННЯ 4:");

const person = {
    name: "John",
    age: 30
};

// Зміна властивостей об'єкта, оголошеного через const, ДОЗВОЛЕНА
person.age = 31;
person.city = "New York";
console.log(person); // {name: "John", age: 31, city: "New York"}

// Переприсвоєння самої змінної ЗАБОРОНЕНО
// person = { name: "Alice", age: 25 }; // TypeError: Assignment to constant variable.

// Як зробити об'єкт повністю незмінним:
const securePerson = { name: "Mike", age: 40 };
Object.freeze(securePerson); // Заморожуємо
securePerson.age = 41; // Не спрацює (проігнорується або помилка в strict mode)
console.log("Заморожений об'єкт:", securePerson);


console.log("\n\ЗАВДАННЯ 5:");

function checkType(value) {
    return typeof value;
}

console.log(checkType(10));        // "number"
console.log(checkType("Hello"));   // "string"
console.log(checkType(null));      // "object" (історичний баг JS)
console.log(checkType(undefined)); // "undefined"
console.log(checkType({}));        // "object"