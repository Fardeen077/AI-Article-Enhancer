import { Article } from "../model/article.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { generateWithAI } from "../services/gemini.service.js";

const createArticle = async (req, res) => {
    try {
        const { title, sourceUrl, originalContent } = req.body;
        if (!title || !sourceUrl || !originalContent) {
            throw new ApiError(400, "All fields are required");
        }

        const newArticle = await Article.create({ title, sourceUrl, originalContent });
        return res.status(201).json(new ApiResponse(201,
            newArticle,
            "Article created successfully"
        ));

    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(500,
            null,
            error.message || "Failed to create article"
        ));
    }
};

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        return res.status(200).json(new ApiResponse(200,
            articles,
            "All article fetched successfully"
        ));

    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(500,
            null,
            error.message || "Failed to fetch articles"
        ));
    }
};

const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new ApiError(400, "Article ID is required")
        }

        const article = await Article.findById(id);
        if (!article) {
            throw new ApiError(404, "Article not found");
        }
        return res.status(200).json(new ApiResponse(200,
            article,
            "Article fetched successfully"
        ));

    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(500,
            null,
            error.message || "Internal server error"
        ));
    }
};

// ok main work is start here 
const enhanceArticleWithAI = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new ApiError(400, "Article ID is required");
        }
        const article = await Article.findById(id);
        if (!article) {
            throw new ApiError(404, "Article not found");
        }
        if (article.isAIUpdated) {
            return res.status(200).json(new ApiResponse(200,
                article,
                "Article already enhanced"
            ));
        }
        if (!article.originalContent?.trim()) {
            throw new ApiError(400, "Original content is empty");
        }
        const prompt = `
Rewrite the following article in clear, professional English.

Rules:
- Return ONLY the rewritten article
- Do NOT include options, explanations, headings, or quotes
- Do NOT use markdown
- Keep it as a single paragraph
- Expand the content slightly for better readability
- Use professional journalistic tone
- Preserve original meaning but add depth where appropriate

Article::${article.originalContent}`;

        const aiContent = await generateWithAI(prompt);
        if (!aiContent) {
            throw new ApiError(500, "AI did not return content");
        }
        article.aiContent = aiContent;
        article.isAIUpdated = true;
        await article.save();
        return res.status(200).json(
            new ApiResponse(200, article, "Article enhanced successfully")
        );
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                null,
                error.message || "AI enhancement failed"
            )
        );
    }
};

export {
    createArticle,
    getAllArticles,
    getArticleById,
    enhanceArticleWithAI
};