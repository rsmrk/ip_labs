// --- ЗАВДАННЯ 1: Матриця 1 та 0 ---
// Розробити скрипт, який будує матрицю розміром n*n.
console.log("--- Завдання 1: Матриця ---");

let n = parseInt(prompt("Завдання 1. Введіть розмір матриці n (наприклад, 5):"));

if (!isNaN(n) && n > 0) {
    for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j < n; j++) {
            // Логіка для "шахового" порядку:
            // Якщо сума індексів парна -> 1, якщо непарна -> 0
            if ((i + j) % 2 === 0) {
                row += "1";
            } else {
                row += "0";
            }
        }
        console.log(row); // Виведення рядка матриці в консоль
    }
} else {
    console.log("Некоректне введення для матриці.");
}


// --- ЗАВДАННЯ 2: Числовий ряд та сума ---
// S = a + a*r + a*r^2 + ... + a*r^(n-1)
console.log("\n--- Завдання 2: Сума ряду ---");

let a = parseFloat(prompt("Завдання 2. Введіть перший елемент (a):"));
let r = parseFloat(prompt("Завдання 2. Введіть співвідношення (r):"));
let count = parseInt(prompt("Завдання 2. Введіть кількість членів (n):"));

if (!isNaN(a) && !isNaN(r) && !isNaN(count)) {
    let sum = 0;
    let seriesStr = "";

    for (let i = 0; i < count; i++) {
        // Формула члена прогресії: term = a * r^i
        let term = a * Math.pow(r, i);
        sum += term;
        
        // Формування рядка для виводу (для краси)
        seriesStr += term;
        if (i < count - 1) {
            seriesStr += " + ";
        }
    }

    console.log("Ряд: " + seriesStr);
    console.log("Сума ряду S = " + sum);
    alert(`Сума ряду: ${sum}`); // Дублюємо результат користувачу
} else {
    console.log("Некоректні дані для ряду.");
}


// --- ЗАВДАННЯ 3: Калькулятор (while + switch) ---
// Працює в нескінченному циклі, поки не введено "end"
console.log("\n--- Завдання 3: Калькулятор ---");

while (true) {
    let op = prompt("Завдання 3. Введіть операцію (+, -, *, /, %) або 'end' для виходу:");

    if (op === "end" || op === null) {
        console.log("Роботу калькулятора завершено.");
        break; // Вихід з циклу
    }

    let num1 = parseFloat(prompt("Введіть перше число:"));
    let num2 = parseFloat(prompt("Введіть друге число:"));

    if (isNaN(num1) || isNaN(num2)) {
        alert("Помилка: введіть коректні числа.");
        continue; // Перехід до наступної ітерації циклу
    }

    let result;
    switch (op) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                result = "Помилка (ділення на 0)";
            } else {
                result = num1 / num2;
            }
            break;
        case "%":
            result = num1 % num2;
            break;
        default:
            result = "Невідома операція";
    }

    let message = `${num1} ${op} ${num2} = ${result}`;
    console.log(message);
    alert(message);
}