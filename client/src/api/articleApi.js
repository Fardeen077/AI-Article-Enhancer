import { axiosInstance } from "./axiosInstance";

const createArticleApi = async (userData) => {
    const res = await axiosInstance.post("/", userData);
    return res.data;
};

const getAllArticlesApi = async () => {
    const res = await axiosInstance.get("/");
    return res.data;
};

const getArticleByIdApi = async (id) => {
    const res = await axiosInstance.get(`/${id}`);
    return res.data;
};

const enhanceArticleWithAIApi = async (id) => {
    const res = await axiosInstance(`/${id}/enhance`);
    return res.data;
}

export {
    createArticleApi,
    getAllArticlesApi,
    getArticleByIdApi,
    enhanceArticleWithAIApi
}