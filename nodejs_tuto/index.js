const pizza = require("./pizza_shop");
const drink = require("./drink_machine");

const odr = new pizza();
const drk = new drink();

odr.on("order", (size, tp) => {
    console.log(`Order recived! make ${size} pizza withe ${tp}`);
    drk.drinkMachine(size);
})

odr.order("large", "chickin");
odr.dispalyOrdNum();
// const EventEmitter = require("node:events");

// const emitt = new EventEmitter();

// emitt.on("Order-pizza", (size, tp) => {
//     console.log(`Order recived! make ${size} pizza withe ${tp}`);
// });

// emitt.on("Order-pizza", (size) => {
//     if(size === "larg"){
//         console.log("Serving drink");
//     }
// });

// emitt.emit("Order-pizza", "small", "chickin");