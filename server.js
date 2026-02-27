
const express = require("express");

const userRoutes = require("./routes/userRoutes.js");
const walletRoutes = require("./routes/walletRout");

const app = express();

app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/wallets", walletRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
// app.use((err, req, res, next) => {
//   res.status(500).json({ message: "Internal Server Error" });
// });

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});






















































// const express = require("express");
// const bodyparse = require("body-parser"); //middleware


// const app = express();

// app.use(bodyparse.json());

// //route test
// //req=hiya objet li katrsl kolxi mn 3nad client l3and server
// //res = hiya objet li hna knrslo biha l3and l client
// app.get("/", (req, res) => {

//     res.json({ message: "khadam" });
//     res.header("200","application/json") 
//     // res.end("termin");
//     // res.write("hello")
// });

// app.listen(3000, () => {

//   console.log("server khdam f http://localhost:3000");
// });
