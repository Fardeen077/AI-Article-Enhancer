import express from "express"
import cors from "cors";
import articleRoutes from "./route/article.route.js";

const app = express();

app.use(cors({
  origin:process.env.CLIENT_SERVER_URL,
  credentials: true,
}));
app.use(express.json());
app.use("/api/articles", articleRoutes);

export default app