const fastify = require("fastify");
const fs = require("fs");
const path = require("path");

const app = fastify();

app.get("/stream", (req, res) => {
  const stream = fs.createReadStream(path.join(__dirname, "./target.html"), {
    encoding: "utf8",
    highWaterMark: 1024,
  });

  res.header("Content-Type", "text/html; charset=utf-8");

  res.send(stream);
});

app.get("/stream_prefix", (req, res) => {
  const stream = fs.createReadStream(path.join(__dirname, "./target.html"), {
    encoding: "utf8",
    highWaterMark: 1024,
  });

  res.raw.write("prefix ");

  res.header("Content-Type", "text/html; charset=utf-8");

  res.send(stream);
});

app.get("/stream_prefix_raw", (req, res) => {
  const stream = fs.createReadStream(path.join(__dirname, "./target.html"), {
    encoding: "utf8",
    highWaterMark: 1024,
  });

  res.raw.setHeader("Content-Type", "text/html; charset=utf-8");

  res.raw.write("prefix ");

  // res.raw.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(stream);
});

app.listen(3000);
