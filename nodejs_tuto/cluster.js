const cluster = require("node:cluster");
const OS = require("node:os");

console.log(OS.cpus().length);

if (cluster.isMaster) {
    console.log(`Master wit process id: ${process.pid}`);
} else {
    console.log(`Worker ${process.pid} is start`);
}