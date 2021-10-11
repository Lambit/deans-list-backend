const app = require("./index");
const { PORT } = require("./app/config");

app.listen(PORT, function () {
    console.log(`Started on http://localhost:${PORT}`);
  });