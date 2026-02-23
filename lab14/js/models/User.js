export class User {
    constructor(name) {
        this.name = name;
    }

    getInfo() {
        return `Користувач: ${this.name}`;
    }
}