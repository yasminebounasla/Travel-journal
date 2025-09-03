import express from "express";
import dotenv from "dotenv";
import prisma from "./utils/db.js";
import routes from "./routes/cards.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());


// Routes example
app.get("/", (req, res) => {
  res.json("Server is working");
});

app.use("/api/cards", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
