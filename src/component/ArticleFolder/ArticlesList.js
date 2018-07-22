import React from 'react';
import { Link } from 'react-router-dom';

function ArticlesList({ articles, loggedIn }) {
  return (
    <div className="article-gallery">
      {articles.map(function(article) {
        return (
          <figure className="gallery-Item">
            <div key={article._id} className="articleThumbnail">
              <Link to={`/articles/${article._id}`}>
                {' '}
                <h2 className="title">{article.title}</h2>
              </Link>
              <p className="fadedArticle">{article.body}</p>
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
          </figure>
        );
      })}
    </div>
  );
}

export default ArticlesList;
