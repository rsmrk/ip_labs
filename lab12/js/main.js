console.log("--- Варіант 2 ---");

// --- ЗАВДАННЯ 1 ---
// Реалізація функцію findMax(a, b), яка знаходить максимальне з двох чисел.
function findMax(a, b) {
    return a > b ? a : b;
}

console.log("Завдання 1: findMax(10, 25) =", findMax(10, 25));


// --- ЗАВДАННЯ 2 ---
// Реалізація функціонального виразу subtract(a, b), який віднімає b від a.
const subtract = function(a, b) {
    return a - b;
};

console.log("Завдання 2: subtract(10, 4) =", subtract(10, 4));


// --- ЗАВДАННЯ 3 ---
// Реалізація стрілкової функції sqrt(n), яка обчислює квадратний корінь з n.
const sqrt = (n) => Math.sqrt(n);

console.log("Завдання 3: sqrt(16) =", sqrt(16));


// --- ЗАВДАННЯ 4 ---
// Реалізувати рекурсивну функцію geometricProgression(n, a, r), 
// яка обчислює суму перших n членів геометричної прогресії.
// Формула суми: S = a * (1 - r^n) / (1 - r). 
// Але завдання вимагає *рекурсивну функцію*, тому ми додаємо n-й член до суми (n-1) членів.

function geometricProgression(n, a, r) {
    // Базовий випадок: якщо n = 1, повертаємо перший член (a)
    if (n === 1) {
        return a;
    }
    // Рекурсивний крок: поточний член (a * r^(n-1)) + сума попередніх
    return (a * Math.pow(r, n - 1)) + geometricProgression(n - 1, a, r);
}

// Перевірка: n=3, a=2, r=2. Ряд: 2, 4, 8. Сума = 14.
console.log("Завдання 4: geometricProgression(3, 2, 2) =", geometricProgression(3, 2, 2));


// --- ЗАВДАННЯ 5 ---
// Реалізуйте функцію-замикання createDivider(divisor), яка створює дільник для переданого числа.
function createDivider(divisor) {
    return function(number) {
        return number / divisor;
    };
}

const divideByTwo = createDivider(2);
const divideByFive = createDivider(5);

console.log("Завдання 5: divideByTwo(10) =", divideByTwo(10)); // 5
console.log("Завдання 5: divideByFive(50) =", divideByFive(50)); // 10


// --- ЗАВДАННЯ 6* ---
// Реалізувати функцію processSet(set, callback), яка застосовує колбек до всіх елементів множини Set.
function processSet(set, callback) {
    // Використовуємо for...of для перебору Set
    for (let item of set) {
        callback(item);
    }
}

// Тестуємо: створюємо Set і виводимо кожен елемент у консоль
const mySet = new Set([10, 20, 30, 40]);

console.log("Завдання 6*: Елементи Set:");
processSet(mySet, (value) => {
    console.log(" -> Значення:", value);
});