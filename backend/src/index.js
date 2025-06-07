import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import chatRouter from "./routes/chat.js";

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Chat API" });
});

app.use("/demo", chatRouter);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
