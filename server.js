const app = require("./index");
const { API } = require("./config");
// const { PORT } = require("./config");

// app.listen(PORT, function () {
//     console.log(`Started on http://localhost:${PORT}`);
//   });

app.listen(API);