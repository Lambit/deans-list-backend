const app = require("./index");
const { BASE_URL } = require("./config");
// const { PORT } = require("./config");

// app.listen(PORT, function () {
//     console.log(`Started on http://localhost:${PORT}`);
//   });

app.listen(BASE_URL, function () {
  console.log(`Started server ${BASE_URL}`);
});