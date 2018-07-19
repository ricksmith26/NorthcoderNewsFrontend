import React from 'react';
import { Link } from 'react-router-dom';

function ArticlesList({ articles, loggedIn }) {
  return (
    <div>
      {articles.map(function(article) {
        return (
          <div key={article._id} className="articleList">
            <Link to={`/articles/${article._id}`}>
              {' '}
              <h2>{article.title}</h2>
            </Link>
            <p>{article.body}</p>
            <p>Topic: {article.belongs_to}</p>
            <Link to={`/users/${article.username}`}>
              {' '}
              <p>Author: {article.username}</p>
            </Link>
            <Link to={`/articles/${article._id}/comments`}>
              {' '}
              <p>Comments: {article.comments}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ArticlesList;
