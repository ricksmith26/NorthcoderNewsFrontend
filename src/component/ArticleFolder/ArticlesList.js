import React from 'react';

function ArticlesList({ articles }) {
  return (
    <div>
      {articles.map(function(article) {
        return (
          <div key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <p>{article.belongs_to}</p>
            <p>{article.username}</p>
            <p>Comments: {article.comments}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ArticlesList;
