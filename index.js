const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////////////////////////////////
// files

// sync blocking code
// const txtInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(txtInput);

// const textOut = `this is what we know about avocado: ${txtInput} \n ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File has been written");

// async non-blocking code
// const txtInputAsync = fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
//   console.log(data);
//   console.log(err);
// });
// console.log("reding file async");

// fs.readFile("./txt/starfdaasdft.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR🐱‍👓");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         "./txt/summaryFile.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Your file has been written 🐱‍👓");
//         }
//       );
//     });
//   });
// });
// console.log("will read file");

////////////////////////////////////////////////
// server
const server = http.createServer((request, response) => {
  console.log(request.url);
  const pathName = request.url;

  if (pathName === "/" || pathName === "/overview") {
    response.end("this is an overview");
  } else if (pathName === "/product") {
    response.end("this is the product");
  } else {
    response.writeHead(404, { "Content-type": "text/html" });
    response.end("Page not found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
