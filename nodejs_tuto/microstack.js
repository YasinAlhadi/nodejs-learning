Promise.resolve().then(()=> console.log("Promise 1"))
process.nextTick(() => console.log("nextTick"));
// console.log("Yasin");
// process.nextTick(() => console.log("nextTick"));
// console.log("Alhadi");