const ArticleCard = ({ article, onView }) => {
    return (
        <div className="p-4 bg-white shadow-xl rounded-lg">
            <h2 className="font-semibold">{article.title}</h2>
            <h4 className="text-sm">{article.originalContent.slice(0, 150) + "..."}</h4>

            <button
                onClick={() => onView(article._id)}
                className="text-blue-600 underline mt-2"
            >
                View
            </button>
        </div>
    );
};

export default ArticleCard;
