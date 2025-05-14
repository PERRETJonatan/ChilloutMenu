const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

app.use(
  "/flag-icons",
  express.static(path.join(__dirname, "node_modules/flag-icons"))
);

app.get("/api/menu", (req, res) => {
  const menuFilePath = path.join(publicDir, "menu.json");
  fs.readFile(menuFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading menu file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
