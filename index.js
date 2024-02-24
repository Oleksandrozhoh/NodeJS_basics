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
// functions
const replateTemplate = function (template, product) {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = product.organic
    ? output.replace(/{%NOT_ORGANIC%}/g, "")
    : output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
// server
// read all HTML templates
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// creating server
const server = http.createServer((request, response) => {
  const { query, pathname } = url.parse(request.url, true);
  console.log(query);
  console.log(pathname);

  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    response.writeHead(200, { "Content-type": "text/html" });
    const cardsHTML = dataObj
      .map((element) => replateTemplate(tempCard, element))
      .join("");
    const overviewHTML = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);
    response.end(overviewHTML);
    // PRODUCT PAGE
  } else if (pathname === "/product") {
    response.writeHead(200, { "Content-type": "text/html" });
    const productData = dataObj[query.id];
    const productHTML = replateTemplate(tempProduct, productData);
    response.end(productHTML);

    // API
  } else if (pathname === "/api") {
    response.writeHead(200, { "Content-type": "application/json" });
    response.end(data);
  } else {
    response.writeHead(404, { "Content-type": "text/html" });
    response.end("Page not found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
