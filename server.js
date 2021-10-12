const app = require("./index");
const { PORT } = require("./config");

app.listen(PORT, function () {
    console.log(`Started on http://localhost:${PORT}`);
  });

