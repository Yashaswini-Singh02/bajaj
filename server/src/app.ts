import express, { Request, Response } from "express";
import bfhlRoute from "./routes/bfhl.routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/bfhl", bfhlRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running.");
});

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    is_success: false,
    message: "Not Found",
  });
});

app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json({
    is_success: true,
    message: "Server is running.",
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
