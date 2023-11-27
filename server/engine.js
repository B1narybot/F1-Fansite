import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("hello World")
});

app.get("../")

app.listen( 3000,() => {
    console.log("server running port http://localhost:3000/")
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Determine the file path based on the requested URL.
  const filePath = path.join(__dirname, 'public', req.filePath);

  // Check if the requested file exists.
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // The file does not exist; respond with a 404 error.
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    // Extract the file extension.
    const extname = path.extname(filePath);

    // Define the content type based on the file extension.
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
    };

    // Set the appropriate content type.
    const contentTypeHeader = { 'Content-Type': contentType[extname] || 'text/plain' };

    // Read and serve the requested file.
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // An error occurred while reading the file; respond with a 500 error.
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, contentTypeHeader);
        res.end(data, 'utf-8');
      }
    });
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});


