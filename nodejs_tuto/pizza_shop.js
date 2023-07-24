const EventEmitter = require("node:events");

class PizzaShop extends EventEmitter {
    constructor(){
        super();
        this.orderNum = 0;
    }

    order (size, tp){
        this.orderNum++;
        this.emit("order", size, tp);
    }

    dispalyOrdNum(){
        console.log(`Order Number = ${this.orderNum}`);
    }
}

module.exports = PizzaShop;