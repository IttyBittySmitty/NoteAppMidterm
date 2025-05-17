import dotenv from "dotenv";
dotenv.config();
import { connect } from "./connect.js";
console.log("connect.js loaded");

// Import models
import "./models/userModel.js";
import "./models/Note.js";

// Connect to MongoDB
try {
  await connect(process.env.DB_CONN);
  console.log("Connected to MongoDB");

  const { app } = await import("./app.js");
  console.log("app.js loaded");

  // Start app
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
} catch (error) {
  console.error("⚠️ Error:", error);
}
