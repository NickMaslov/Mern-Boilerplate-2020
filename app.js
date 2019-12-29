const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const router = require("./routes");

const app = express();

// Data parsing
app.use(express.json({ extended: true }));

//  Connect all our routes to our application
app.use("/api", router);

// DB and server connection
async function start() {
  try {
    mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    await mongoose.connection.once("open", () => {
      console.log("MongoDB connection established!");
    });

    const PORT = config.get("port") || 5000;
    app.listen(PORT, () =>
      console.log("App server has been started on port: %s.", PORT)
    );
  } catch (err) {
    console.log("Server Error:", err.message);
    process.exit(1);
  }
}
start();
