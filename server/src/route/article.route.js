import {
    createArticle,
    getAllArticles,
    getArticleById,
    enhanceArticleWithAI
} from "../controller/article.controller.js"
import express from "express"
const router = express.Router();

router.post("/", createArticle);
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.post("/:id/enhance", enhanceArticleWithAI);

export default router;