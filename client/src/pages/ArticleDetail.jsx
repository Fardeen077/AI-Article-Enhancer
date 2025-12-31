import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useArticleStore } from "../store/useArticleStore";
import Loader from "../component/Loader";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getArticleById,
    enhanceArticleWithAI,
    currentArticle,
    isLoading,
  } = useArticleStore();

  useEffect(() => {
    if (id) {
      getArticleById(id);
    }
  }, [id, getArticleById]);

  if (isLoading || !currentArticle) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold mb-4">
        {currentArticle.title}
      </h1>

      {/* Original Content */}
      <section className="mb-6">
        <h2 className="text-lg font-medium mb-2">
          Original Article
        </h2>
        <p className="whitespace-pre-line text-gray-700">
          {currentArticle.originalContent}
        </p>
      </section>

      {/* AI Enhanced Content */}
      {currentArticle.aiContent && (
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-2">
            AI Enhanced Article
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {currentArticle.aiContent}
          </p>
        </section>
      )}

      {/* AI Button */}
      {!currentArticle.isAIUpdated && (
        <button
          onClick={() => enhanceArticleWithAI(currentArticle._id)}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Enhance with AI
        </button>
      )}
    </div>
  );
};

export default ArticleDetail;
