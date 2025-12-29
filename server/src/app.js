import express from "express"
import articleRoutes from "./route/article.route.js";

const app = express();
app.use(express.json()); 
app.use("/api/articles", articleRoutes);

export default app