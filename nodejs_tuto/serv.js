const http = require("node:http")
const fs = require("node:fs")

const info = {
    "FirstName": "Yasin",
    "LastName" : "Alhadi"
}

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("Home Page");
    } else if (req.url === "/about"){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("About Page");
    } else if (req.url === "api") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(info));
    }
    // res.writeHead(200, {"Content-Type": "text/html"});
    // fs.createReadStream("./index.html").pipe(res);
    // const html = fs.readFileSync("./index.html", "utf-8");
    // res.end(html);
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});