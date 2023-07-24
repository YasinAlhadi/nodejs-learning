const fs = require("node:fs")

const readableStream = fs.createReadStream("./file.txt", {
    encoding: "utf-8",
    highWaterMark: 50,
});

const writableStream = fs.createWriteStream("./file2.txt");

readableStream.pipe(writableStream);

// readableStream.on("data", (chunk) => {
//     console.log(chunk);
//     writableStream.write(chunk);
// });