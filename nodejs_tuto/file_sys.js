const fs = require("node:fs").promises

async function readFile() {
    try {
        const data = await fs.readFile("./yas.txt", "utf-8");
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

readFile();

// fs.readFile("./yas.txt", "utf-8")
// .then(data => console.log(data))
// .catch(err => console.log(err));

// const fs = require("node:fs");

// const fileCont = fs.readFileSync("./yas.txt", "utf-8");
// console.log(fileCont);

// fs.readFile("./yas.txt", "utf-8", (err, data) => {
//     try {
//         console.log(data);
//     } catch (error) {
//         console.log(err);
//     }
// });

// fs.writeFileSync("./w_file.txt", "Hello Yasin!");

// fs.writeFile("./w_file.txt", "\nI hope U R fine", {flag: "a"}, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("File Created");
//     }
// });