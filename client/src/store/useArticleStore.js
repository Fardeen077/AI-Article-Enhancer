import { create } from "zustand";
import toast from "react-hot-toast"
import {
    createArticleApi,
    getAllArticlesApi,
    getArticleByIdApi,
    enhanceArticleWithAIApi
} from "../api/articleApi";

export const useArticleStore = create((set, get) => ({
    isLoading: false,
    articles: [],
    currentArticle: null,

    createArticle: async (userData) => {
        set({ isLoading: true });
        try {
            const res = await createArticleApi(userData);
            set({ articles: [res.data, ...get().articles], isLoading: false });
            toast.success("Article created successfully");
        } catch (error) {
            set({ isLoading: false });
            toast.error(error?.response?.data?.message || "Failed to create article");
        }
    },

    getAllArticles: async () => {
        set({ isLoading: true });
        try {
            const res = await getAllArticlesApi();
            set({ articles: res.data || [], isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            console.error(error?.response?.data?.message || "Failed to fetch articles");
        }
    },

    getArticleById: async (id) => {
        set({ isLoading: true });
        try {
            const res = await getArticleByIdApi(id);
            set({ currentArticle: res.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            toast.error(error?.response?.data?.message || "Failed to fetch article");
        }
    },

    enhanceArticleWithAI: async (id) => {
        set({ isLoading: true });
        try {
            const res = await enhanceArticleWithAIApi(id);
            set({
                currentArticle: res.data,
                articles: get().articles.map((article) => article._id === id ? res.data : article),
                isLoading: false
            });
            toast.success("AI enhance article successfully");
        } catch (error) {
            set({ isLoading: false });
            toast.error(error?.response?.data?.message || "Failed to enhance article");
        }
    },

}));