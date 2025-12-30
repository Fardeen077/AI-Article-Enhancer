import mongoose from "mongoose"

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    originalContent: {
        // Original scraped article text
        type: String,
        required: true,
    },
    aiContent: {
        // AI-enhanced article text     
        type: String,
        default: "",
    },
    isAIUpdated: {
        //check Ai generate article or not 
        type: Boolean,
        default: false,
    },
    sourceUrl: {
        // User-provided article URL
        type: String,
        required: true,
    },
    references: {
        type: [String],
        default: [],
    },

}, { timestamps: true });

export const Article = mongoose.model("Article", articleSchema);