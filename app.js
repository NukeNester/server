const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://echen9870:Eriktion12.@cluster0.1cx87ca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// Routes
const orderRouter = require("./routes/orderRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
app.use("/orders", orderRouter);
app.use("/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
