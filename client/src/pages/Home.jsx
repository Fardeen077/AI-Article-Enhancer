import { useEffect, useState } from "react";
import { useArticleStore } from "../store/useArticleStore";
import Loader from "../component/Loader";
import ArticleCard from "../component/ArticleCart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
    const [sourceUrl, setSourceUrl] = useState("");
    const [title, setTitle] = useState("");
    const [originalContent, setOriginalContent] = useState("");
    const navigate = useNavigate();
    const { articles, createArticle, isLoading, getAllArticles } = useArticleStore();

    useEffect(() => {
        getAllArticles();
    }, [getAllArticles]);

    const handleCreateArticle = async () => {
        if (!title || !originalContent) {
            toast.error("Please fill all fields");
            return
        }
        await createArticle({
            title,
            sourceUrl,
            originalContent,
        });

        setTitle("");
        setSourceUrl("");
        setOriginalContent("");
    };

    const handleViewArticle = (id) => {
        navigate(`/article/${id}`);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white shadow-xl rounded-lg p-6 space-y-4">

                <h2 className="text-xl font-semibold">
                    Create Article
                </h2>

                <input
                    type="text"
                    placeholder="Article Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Source URL (optional)"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />

                <textarea
                    placeholder="Paste original article content here..."
                    rows={6}
                    value={originalContent}
                    onChange={(e) => setOriginalContent(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />

                <button
                    onClick={handleCreateArticle}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                >
                    {isLoading ? "Submitting..." : "Create Article"}
                </button>
                {isLoading && <Loader />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-10">
                {articles.map((article) => (
                    <ArticleCard
                        key={article._id}
                        article={article}
                        onView={handleViewArticle}
                    />
                ))}
            </div>
        </div>

    )
}

export default Home